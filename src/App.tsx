import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Settings, Bell, LayoutGrid, Mic, Trophy, 
  Heart, Box, User, Search, Sun, Moon, ChevronLeft, ChevronRight, 
  Play, Image as ImageIcon, Volume2, Plus, X, AlignCenter, AlignLeft
} from 'lucide-react';

export default function App() {
  const [layoutMode, setLayoutMode] = useState<'split' | 'collapse' | 'pip'>('split');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPreviewAnim, setShowPreviewAnim] = useState(true);

  // 테스트 재생 애니메이션 트리거
  const handleTestPlay = () => {
    setShowPreviewAnim(false);
    setTimeout(() => setShowPreviewAnim(true), 100);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] font-sans flex">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r border-gray-200 fixed h-full left-0 top-0 z-20 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <span className="text-lg leading-none">t</span>
            </div>
            toonation
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="대시보드" />
          <NavItem icon={<Settings size={18} />} label="간편설정" />
          <NavItem icon={<Bell size={18} />} label="통합 알림창" active />
          <NavItem icon={<LayoutGrid size={18} />} label="위젯" />
          <NavItem icon={<Mic size={18} />} label="모두의 보이스" />
          <NavItem icon={<Trophy size={18} />} label="랭킹" />
          <NavItem icon={<Heart size={18} />} label="후원관리" hasSub />
          <NavItem icon={<Box size={18} />} label="인벤토리" />
          <NavItem icon={<User size={18} />} label="계정설정" />
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Layout Mode Switcher (For Testing) */}
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <ModeButton 
                active={layoutMode === 'split'} 
                onClick={() => { setLayoutMode('split'); setIsCollapsed(false); }}
              >
                좌우 분할
              </ModeButton>
              <ModeButton 
                active={layoutMode === 'collapse'} 
                onClick={() => setLayoutMode('collapse')}
              >
                접이식 패널
              </ModeButton>
              <ModeButton 
                active={layoutMode === 'pip'} 
                onClick={() => { setLayoutMode('pip'); setIsCollapsed(false); }}
              >
                플로팅 PiP
              </ModeButton>
            </div>
          </div>
          <div className="flex items-center gap-5 text-gray-500">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="검색" className="pl-9 pr-4 py-1.5 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none w-48 transition-all" />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <button className="p-1 bg-white rounded-full shadow-sm text-gray-800"><Sun size={14} /></button>
              <button className="p-1 text-gray-400 hover:text-gray-600"><Moon size={14} /></button>
            </div>
            <Bell size={20} className="cursor-pointer hover:text-gray-800" />
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">C</div>
              <span className="text-sm font-medium text-gray-700">크리에이터</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">통합알림창</h1>
            
            {/* Top Tabs */}
            <div className="flex gap-2 mb-8 border-b border-gray-200 pb-px">
              <Tab active>후원 알림 설정</Tab>
              <Tab>트위치 알림 설정</Tab>
              <Tab>유튜브 알림 설정</Tab>
            </div>

            {/* Dynamic Layout Container */}
            <div className={`flex items-start relative transition-all duration-300 ${layoutMode === 'pip' ? 'block' : 'gap-8'}`}>
              
              {/* Settings Area (Left) */}
              <div className={`transition-all duration-300 ${
                layoutMode === 'pip' ? 'w-full max-w-4xl' : 
                (layoutMode === 'collapse' && isCollapsed) ? 'w-full' : 'flex-1 min-w-0'
              }`}>
                
                {/* Sub Menu */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-semibold text-sm flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-500 text-white rounded flex items-center justify-center text-[10px]">T</span>
                    텍스트 후원 알림
                  </div>
                </div>

                {/* Settings Form Blocks */}
                <div className="space-y-6">
                  {/* Preset Section */}
                  <Section title="프리셋 설정" subtitle="알림 조건을 미리 설정하여 쉽게 추가하고 삭제 할 수 있는 기능입니다.">
                    <FormRow label="1번 프리셋">
                      <div className="flex items-center gap-3 w-full">
                        <input type="text" value="후원금액 1000 cash 이상" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" readOnly />
                        <Toggle active={true} />
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">설정 ▼</button>
                      </div>
                    </FormRow>
                  </Section>

                  {/* Basic Settings Section */}
                  <Section title="기본 설정">
                    <FormRow label="알림 표시">
                      <Toggle active={true} />
                    </FormRow>
                    
                    <FormRow label="알림 레이아웃">
                      <div className="flex gap-3">
                        <button className="flex flex-col items-center justify-center w-20 h-20 border-2 border-blue-500 rounded-lg bg-blue-50 text-blue-600 gap-1">
                          <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center"><ImageIcon size={16} /></div>
                          <span className="text-xs font-bold">TEXT</span>
                        </button>
                        <button className="flex flex-col items-center justify-center w-20 h-20 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 gap-1">
                          <span className="text-sm font-bold">TEXT</span>
                        </button>
                        <button className="flex items-center justify-center w-24 h-20 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"><ImageIcon size={12} /></div>
                          <span className="text-xs font-bold">TEXT</span>
                        </button>
                      </div>
                    </FormRow>

                    <FormRow label="알림 효과">
                      <div className="flex gap-3 w-full">
                        <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                          <option>Fade In</option>
                        </select>
                        <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                          <option>Fade Out</option>
                        </select>
                      </div>
                    </FormRow>

                    <FormRow label="텍스트 애니메이션">
                      <div className="flex gap-3 w-full">
                        <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                          <option>Pulse</option>
                        </select>
                        <button className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-50">텍스트 효과 미리보기</button>
                      </div>
                    </FormRow>

                    <FormRow label="알림 이미지">
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <img src="https://cdn-icons-png.flaticon.com/512/4780/4780939.png" alt="cat" className="w-12 h-12" />
                          <button className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900"><X size={12} /></button>
                        </div>
                        <button className="w-20 h-20 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                          <Plus size={24} />
                        </button>
                      </div>
                    </FormRow>

                    <FormRow label="알림 효과음">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 flex-1">
                          <span className="text-gray-600 truncate">sound_effect_01.mp3</span>
                          <button className="ml-auto text-gray-400 hover:text-gray-600"><X size={14} /></button>
                        </div>
                        <button className="p-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700"><Play size={16} fill="currentColor" /></button>
                        <button className="p-2.5 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"><Plus size={16} /></button>
                      </div>
                    </FormRow>

                    <FormRow label="알림 효과음 볼륨">
                      <div className="flex items-center gap-4 w-full">
                        <span className="text-xs text-gray-500 w-8">0%</span>
                        <input type="range" className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" defaultValue="50" />
                        <span className="text-xs text-gray-500 w-10 text-right">100%</span>
                      </div>
                    </FormRow>
                  </Section>

                  {/* Message Settings Section (To force scrolling) */}
                  <Section title="알림 메시지 설정">
                    <FormRow label="메시지 템플릿">
                      <input type="text" defaultValue="{닉네임}님이 {금액}원을 후원해 주셨어요!" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                    </FormRow>
                    <FormRow label="알림 노출 시간(초)">
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue="5" className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                        <span className="text-sm text-gray-600">초</span>
                      </div>
                    </FormRow>
                    <FormRow label="폰트 설정">
                      <div className="flex gap-3 w-full">
                        <select className="flex-[2] border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                          <option>제주 고딕</option>
                        </select>
                        <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                          <option>36 px</option>
                        </select>
                        <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
                          <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
                          <span className="text-sm text-gray-600">#FFFFFF</span>
                        </div>
                      </div>
                    </FormRow>
                    <FormRow label="닉네임, 금액 컬러">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-48">
                        <div className="w-4 h-4 rounded-full bg-[#18C9FF]"></div>
                        <span className="text-sm text-gray-600">#18C9FF</span>
                      </div>
                    </FormRow>
                  </Section>
                  
                  {/* Extra sections to make page long */}
                  <Section title="TTS (음성 읽어주기) 설정">
                    <FormRow label="사용하기">
                      <Toggle active={true} />
                    </FormRow>
                    <FormRow label="보이스 선택">
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                        <option>투네이션 기본 보이스 (여성)</option>
                        <option>투네이션 기본 보이스 (남성)</option>
                      </select>
                    </FormRow>
                  </Section>
                  
                  <div className="h-32"></div> {/* Bottom padding */}
                </div>
              </div>

              {/* Collapse Toggle Button (Only visible in collapse mode) */}
              {layoutMode === 'collapse' && (
                <div className="relative flex items-center justify-center w-0 z-10">
                  <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute top-32 -ml-3 w-6 h-12 bg-white border border-gray-300 rounded-r-md shadow-sm flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
              )}

              {/* Preview Area (Right or Floating) */}
              <div className={`transition-all duration-300 ${
                layoutMode === 'pip' 
                  ? 'fixed bottom-8 right-8 w-[400px] z-50 shadow-2xl bg-white rounded-xl border border-gray-200 overflow-hidden' 
                  : (layoutMode === 'collapse' && isCollapsed)
                    ? 'w-0 opacity-0 overflow-hidden'
                    : 'w-[360px] shrink-0 sticky top-24'
              }`}>
                
                <div className={`${layoutMode === 'pip' ? '' : 'bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'}`}>
                  {/* Top Bar of Preview */}
                  <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      미리보기
                    </span>
                    {layoutMode === 'pip' && (
                      <button onClick={() => setLayoutMode('split')} className="text-gray-400 hover:text-white">
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* The actual preview screen */}
                  <div className="aspect-video bg-[#111] relative flex items-center justify-center overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                    
                    {/* Animated Alert Content */}
                    <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${showPreviewAnim ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                      <img src="https://cdn-icons-png.flaticon.com/512/4780/4780939.png" alt="alert" className="w-24 h-24 drop-shadow-lg mb-4 animate-bounce" style={{ animationDuration: '2s' }} />
                      <div className="bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 shadow-xl">
                        <p className="text-white font-bold text-lg">
                          <span className="text-[#18C9FF]">투네이션</span>님이 <span className="text-[#18C9FF]">1,000원</span>을 후원하셨습니다!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Controls below preview */}
                  <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex gap-2">
                      <button 
                        onClick={handleTestPlay}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Play size={16} fill="currentColor" />
                        후원 테스트
                      </button>
                    </div>
                    
                    {layoutMode !== 'pip' && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2 font-medium">알림창 URL</p>
                        <div className="flex gap-2">
                          <input type="text" value="https://toon.at/widget/alertbox/..." readOnly className="flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-500" />
                          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded text-xs font-medium text-gray-700">복사</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable UI Components
function NavItem({ icon, label, active, hasSub }: { icon: React.ReactNode, label: string, active?: boolean, hasSub?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {hasSub && <ChevronRight size={14} className="opacity-50" />}
    </div>
  );
}

function ModeButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${active ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
    >
      {children}
    </button>
  );
}

function Tab({ children, active }: { children: React.ReactNode, active?: boolean }) {
  return (
    <button className={`px-5 py-2.5 text-sm font-bold rounded-t-lg border-b-2 transition-colors ${active ? 'border-gray-800 text-gray-900 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
      {children}
    </button>
  );
}

function Section({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}

function FormRow({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
      <label className="w-40 shrink-0 text-sm font-medium text-gray-700">{label}</label>
      <div className="flex-1 flex items-center">
        {children}
      </div>
    </div>
  );
}

function Toggle({ active }: { active: boolean }) {
  return (
    <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-blue-500' : 'bg-gray-300'}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  );
}
