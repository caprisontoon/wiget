import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Settings, Bell, LayoutGrid, Mic, Trophy, 
  Heart, Box, User, Search, Sun, Moon, ChevronLeft, ChevronRight, 
  Play, Image as ImageIcon, Volume2, Plus, X, AlignCenter, AlignLeft, MessageSquare
} from 'lucide-react';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<'alert' | 'widget'>('widget');
  const [layoutMode, setLayoutMode] = useState<'split' | 'collapse' | 'pip'>('split');
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <NavItem 
            icon={<Bell size={18} />} 
            label="통합 알림창" 
            active={activeMenu === 'alert'} 
            onClick={() => setActiveMenu('alert')} 
          />
          <NavItem 
            icon={<LayoutGrid size={18} />} 
            label="위젯" 
            active={activeMenu === 'widget'} 
            onClick={() => setActiveMenu('widget')} 
          />
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
          {activeMenu === 'alert' ? (
            <AlertSettings 
              layoutMode={layoutMode} 
              isCollapsed={isCollapsed} 
              setIsCollapsed={setIsCollapsed} 
              setLayoutMode={setLayoutMode}
            />
          ) : (
            <WidgetSettings 
              layoutMode={layoutMode} 
              isCollapsed={isCollapsed} 
              setIsCollapsed={setIsCollapsed} 
              setLayoutMode={setLayoutMode}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Widget Settings Component (채팅창 위젯)
// ---------------------------------------------------------
function WidgetSettings({ layoutMode, isCollapsed, setIsCollapsed, setLayoutMode }: any) {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">위젯</h1>
      
      {/* Dynamic Layout Container */}
      <div className={`flex items-start relative transition-all duration-300 ease-in-out ${layoutMode === 'pip' ? 'block' : ''}`}>
        
        {/* Settings Area (Left) */}
        <div className={`transition-all duration-300 ease-in-out ${
          layoutMode === 'pip' ? 'w-full max-w-4xl' : 
          (layoutMode === 'collapse' && isCollapsed) ? 'w-full' : 'flex-1 min-w-0'
        }`}>
          
          {/* Sub Menu / Title */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-semibold text-sm flex items-center gap-2 border border-blue-100">
              <MessageSquare size={16} />
              채팅창 위젯 설정 ▼
            </div>
          </div>

          {/* URL Copy Area */}
          <div className="flex items-center gap-2 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-sm font-bold text-gray-700 w-32">통합 채팅 URL</span>
            <input type="text" value="https://toon.at/widget/chatbox/dfad69355aa4c..." readOnly className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-500 outline-none" />
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">URL 복사</button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">열기</button>
          </div>

          {/* Settings Form Blocks */}
          <div className="space-y-6">
            <Section title="기본 설정">
              <FormRow label="위젯 스타일">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  <StyleCard title="한 줄 테두리 없음" active />
                  <StyleCard title="한 줄 상자 테두리" />
                  <StyleCard title="한 줄 테두리 없음 (정렬)" />
                  <StyleCard title="한 줄 상자 테두리 (정렬)" />
                  <StyleCard title="한 줄 심플" />
                  <StyleCard title="한 줄 심플 (정렬)" />
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

              <FormRow label="폰트 설정">
                <div className="flex gap-3 w-full">
                  <select className="flex-[2] border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                    <option>제주 고딕</option>
                  </select>
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500">
                    <option>24 px</option>
                  </select>
                  <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
                    <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
                    <span className="text-sm text-gray-600">#FFFFFF</span>
                  </div>
                </div>
              </FormRow>

              <FormRow label="닉네임 컬러 사용하기">
                <Toggle active={false} />
              </FormRow>

              <FormRow label="닉네임 배경(화이트)">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="bg" className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">항상 사용하기</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="bg" defaultChecked className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">어두운 닉네임 사용시</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="bg" className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">사용하지 않기</span>
                  </label>
                </div>
              </FormRow>

              <FormRow label="채팅 최대 표시 줄">
                <div className="flex items-center gap-2 w-full max-w-xs">
                  <input type="number" defaultValue="8" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                  <span className="text-sm text-gray-600">줄</span>
                </div>
              </FormRow>

              <FormRow label="자동으로 감추기 사용">
                <div className="flex items-center gap-6 w-full">
                  <Toggle active={false} />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">감추기 시간(초)</span>
                    <input type="number" defaultValue="15" className="w-20 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                    <span className="text-sm text-gray-600">초</span>
                  </div>
                </div>
              </FormRow>

              <FormRow label="플랫폼 아이콘 감추기">
                <Toggle active={false} />
              </FormRow>

              <FormRow label="숨길 닉네임 추가하기">
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex gap-2">
                    <input type="text" placeholder="숨길 닉네임" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                    <button className="px-6 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600">추가</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="Nightbot" />
                    <Tag label="MooBot" />
                    <Tag label="StreamElements" />
                  </div>
                </div>
              </FormRow>
            </Section>
            
            <div className="h-32"></div> {/* Bottom padding */}
          </div>
        </div>

        {/* Collapse Toggle Button */}
        {layoutMode === 'collapse' && (
          <div className="relative flex items-center justify-center w-0 z-10">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute top-32 left-0 w-6 h-12 bg-white border border-gray-300 rounded-r-md shadow-sm flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
            >
              {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}

        {/* Preview Area (Right or Floating) */}
        <div className={`transition-all duration-300 ease-in-out flex justify-end ${
          layoutMode === 'pip' 
            ? 'fixed bottom-8 right-8 w-[400px] z-50 shadow-2xl bg-white rounded-xl border border-gray-200 overflow-hidden' 
            : `shrink-0 sticky top-24 overflow-hidden ${
                (layoutMode === 'collapse' && isCollapsed)
                  ? 'w-0 opacity-0 ml-0'
                  : 'w-[360px] ml-8 opacity-100'
              }`
        }`}>
          
          <div className={`${layoutMode === 'pip' ? 'w-full' : 'w-[360px] shrink-0'} bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden`}>
            <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                채팅창 미리보기
              </span>
              {layoutMode === 'pip' && (
                <button onClick={() => setLayoutMode('split')} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Chat Preview Screen */}
            <div className="aspect-video bg-[#111] relative p-4 overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              
              <div className="relative z-10 space-y-2 w-full">
                <ChatMessage platform="T" name="글레이시아" message="언팔빨추구독" color="#a855f7" />
                <ChatMessage platform="T" name="사무새" message="사이렌 합시다 사이렌" color="#3b82f6" />
                <ChatMessage platform="Y" name="Dong Myong Son" message="시청해주시는 여러분 모두 감사합니다" color="#ef4444" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Alert Settings Component (통합 알림창 - 기존 코드)
// ---------------------------------------------------------
function AlertSettings({ layoutMode, isCollapsed, setIsCollapsed, setLayoutMode }: any) {
  const [showPreviewAnim, setShowPreviewAnim] = useState(true);

  const handleTestPlay = () => {
    setShowPreviewAnim(false);
    setTimeout(() => setShowPreviewAnim(true), 100);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">통합알림창</h1>
      
      <div className="flex gap-2 mb-8 border-b border-gray-200 pb-px">
        <Tab active>후원 알림 설정</Tab>
        <Tab>트위치 알림 설정</Tab>
        <Tab>유튜브 알림 설정</Tab>
      </div>

      <div className={`flex items-start relative transition-all duration-300 ease-in-out ${layoutMode === 'pip' ? 'block' : ''}`}>
        
        <div className={`transition-all duration-300 ease-in-out ${
          layoutMode === 'pip' ? 'w-full max-w-4xl' : 
          (layoutMode === 'collapse' && isCollapsed) ? 'w-full' : 'flex-1 min-w-0'
        }`}>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-semibold text-sm flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-500 text-white rounded flex items-center justify-center text-[10px]">T</span>
              텍스트 후원 알림
            </div>
          </div>

          <div className="space-y-6">
            <Section title="프리셋 설정" subtitle="알림 조건을 미리 설정하여 쉽게 추가하고 삭제 할 수 있는 기능입니다.">
              <FormRow label="1번 프리셋">
                <div className="flex items-center gap-3 w-full">
                  <input type="text" value="후원금액 1000 cash 이상" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" readOnly />
                  <Toggle active={true} />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">설정 ▼</button>
                </div>
              </FormRow>
            </Section>

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
            </Section>
            
            <div className="h-32"></div>
          </div>
        </div>

        {layoutMode === 'collapse' && (
          <div className="relative flex items-center justify-center w-0 z-10">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute top-32 left-0 w-6 h-12 bg-white border border-gray-300 rounded-r-md shadow-sm flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
            >
              {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}

        <div className={`transition-all duration-300 ease-in-out flex justify-end ${
          layoutMode === 'pip' 
            ? 'fixed bottom-8 right-8 w-[400px] z-50 shadow-2xl bg-white rounded-xl border border-gray-200 overflow-hidden' 
            : `shrink-0 sticky top-24 overflow-hidden ${
                (layoutMode === 'collapse' && isCollapsed)
                  ? 'w-0 opacity-0 ml-0'
                  : 'w-[360px] ml-8 opacity-100'
              }`
        }`}>
          
          <div className={`${layoutMode === 'pip' ? 'w-full' : 'w-[360px] shrink-0'} bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden`}>
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

            <div className="aspect-video bg-[#111] relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              
              <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${showPreviewAnim ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                <img src="https://cdn-icons-png.flaticon.com/512/4780/4780939.png" alt="alert" className="w-24 h-24 drop-shadow-lg mb-4 animate-bounce" style={{ animationDuration: '2s' }} />
                <div className="bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 shadow-xl">
                  <p className="text-white font-bold text-lg">
                    <span className="text-[#18C9FF]">투네이션</span>님이 <span className="text-[#18C9FF]">1,000원</span>을 후원하셨습니다!
                  </p>
                </div>
              </div>
            </div>

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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Reusable UI Components
// ---------------------------------------------------------
function NavItem({ icon, label, active, hasSub, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {hasSub && <ChevronRight size={14} className="opacity-50" />}
    </div>
  );
}

function ModeButton({ children, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${active ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
    >
      {children}
    </button>
  );
}

function Tab({ children, active }: any) {
  return (
    <button className={`px-5 py-2.5 text-sm font-bold rounded-t-lg border-b-2 transition-colors ${active ? 'border-gray-800 text-gray-900 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
      {children}
    </button>
  );
}

function Section({ title, subtitle, children }: any) {
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

function FormRow({ label, children }: any) {
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

function Tag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600">
      {label}
      <button className="hover:text-gray-900"><X size={12} /></button>
    </div>
  );
}

function StyleCard({ title, active }: { title: string, active?: boolean }) {
  return (
    <div className={`border rounded-lg p-3 cursor-pointer transition-all ${active ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
      <div className="h-16 bg-gray-800 rounded mb-2 flex flex-col justify-center px-2 gap-1 overflow-hidden">
        <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
        <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
      </div>
      <p className={`text-xs text-center font-medium ${active ? 'text-blue-700' : 'text-gray-600'}`}>{title}</p>
    </div>
  );
}

function ChatMessage({ platform, name, message, color }: any) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="w-4 h-4 rounded bg-gray-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{platform}</span>
      <span className="font-bold shrink-0" style={{ color }}>{name}</span>
      <span className="text-white break-all">{message}</span>
    </div>
  );
}