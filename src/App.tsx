import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Settings, Bell, LayoutGrid, Mic, Trophy, 
  Heart, Box, User, Search, Sun, Moon, ChevronLeft, ChevronRight, 
  Play, Image as ImageIcon, Volume2, Plus, X, AlignCenter, AlignLeft, MessageSquare,
  MessageCircle, Smartphone, ArrowUp, Edit2, Check, GripVertical,
  Download, Upload, Copy, Filter, SortAsc, SortDesc, Image
} from 'lucide-react';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<'alert' | 'widget'>('alert');
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

        {/* Floating Action Buttons (Bottom Right) */}
        <FloatingActionButtons />
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

        {/* Collapse Toggle Button & Divider */}
        {layoutMode === 'collapse' && (
          <div className="relative w-0 z-20">
            {/* Vertical Divider Line */}
            <div className="absolute top-0 bottom-0 w-px bg-gray-200"></div>
            
            {/* Sticky Toggle Button */}
            <div className="sticky top-[50vh] -translate-y-1/2 -ml-3.5">
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-7 h-20 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-300 transition-colors"></div>
                  {isCollapsed ? <ChevronLeft size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
                  <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-300 transition-colors"></div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Preview Area (Right or Floating) */}
        <div className={`transition-all duration-300 ease-in-out flex justify-end ${
          layoutMode === 'pip' 
            ? 'fixed bottom-8 right-28 w-[400px] z-40 shadow-2xl bg-white rounded-xl border border-gray-200 overflow-hidden' 
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

            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={16} fill="currentColor" />
                  채팅 테스트
                </button>
              </div>
              
              {layoutMode !== 'pip' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2 font-medium">위젯 URL</p>
                  <div className="flex gap-2">
                    <input type="text" value="https://toon.at/widget/chatbox/dfad69355aa4c..." readOnly className="flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-500" />
                    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded text-xs font-medium text-gray-700">복사</button>
                  </div>
                </div>
              )}
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

  // --- Preset Group State ---
  const [presetGroups, setPresetGroups] = useState([
    {
      id: 'g1',
      name: '기본 방송 (Default)',
      presets: [
        { id: 'p1', condition: '후원금액 1,000 cash 이상', active: true },
        { id: 'p2', condition: '후원금액 10,000 cash 이상', active: true },
      ]
    },
    {
      id: 'g2',
      name: '공포 게임용',
      presets: [
        { id: 'p3', condition: '후원금액 1,000 cash 이상', active: true },
        { id: 'p4', condition: '후원금액 5,000 cash 이상', active: true },
      ]
    }
  ]);
  const [activeGroupId, setActiveGroupId] = useState('g1');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [draggedGroupId, setDraggedGroupId] = useState<string | null>(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tempSelectedGroupId, setTempSelectedGroupId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('custom');
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isAutoMapModalOpen, setIsAutoMapModalOpen] = useState(false);

  const activeGroup = presetGroups.find(g => g.id === activeGroupId) || presetGroups[0];

  // Filter and Sort Presets
  const filteredAndSortedPresets = activeGroup.presets
    .filter(p => p.condition.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'custom') return 0;
      
      // Extract numbers from condition for sorting (e.g., "1,000" -> 1000)
      const getAmount = (condition: string) => {
        const match = condition.replace(/,/g, '').match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };
      
      const amountA = getAmount(a.condition);
      const amountB = getAmount(b.condition);
      
      if (sortOrder === 'amount_asc') return amountA - amountB;
      if (sortOrder === 'amount_desc') return amountB - amountA;
      return 0;
    });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedGroupId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedGroupId || draggedGroupId === targetId) return;

    const draggedIndex = presetGroups.findIndex(g => g.id === draggedGroupId);
    const targetIndex = presetGroups.findIndex(g => g.id === targetId);

    const newGroups = [...presetGroups];
    const [draggedItem] = newGroups.splice(draggedIndex, 1);
    newGroups.splice(targetIndex, 0, draggedItem);

    setPresetGroups(newGroups);
    setDraggedGroupId(null);
  };

  const handleDragEnd = () => {
    setDraggedGroupId(null);
  };

  const handleAddGroupClick = () => {
    setIsAddingGroup(true);
    setNewGroupName('');
  };

  const confirmAddGroup = () => {
    if (!newGroupName.trim()) {
      setIsAddingGroup(false);
      return;
    }
    const newId = 'g' + Date.now();
    setPresetGroups([...presetGroups, { 
      id: newId, 
      name: newGroupName.trim(), 
      presets: [
        { id: 'p' + Date.now() + '1', condition: '후원금액 1,000 cash 이상', active: true },
        { id: 'p' + Date.now() + '2', condition: '후원금액 10,000 cash 이상', active: true }
      ] 
    }]);
    setActiveGroupId(newId);
    setIsAddingGroup(false);
    setNewGroupName('');
  };

  const cancelAddGroup = () => {
    setIsAddingGroup(false);
    setNewGroupName('');
  };

  const handleDeleteGroup = () => {
    if (presetGroups.length <= 1) {
      setShowDeleteError(true);
      setTimeout(() => setShowDeleteError(false), 2000);
      return;
    }
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
      return;
    }
    const newGroups = presetGroups.filter(g => g.id !== activeGroupId);
    setPresetGroups(newGroups);
    setActiveGroupId(newGroups[0].id);
    setShowDeleteConfirm(false);
  };

  const startEditingGroup = () => {
    setEditingGroupId(activeGroupId);
    setEditingGroupName(activeGroup.name);
  };

  const saveEditingGroup = () => {
    if (!editingGroupName.trim()) return;
    setPresetGroups(presetGroups.map(g => g.id === activeGroupId ? { ...g, name: editingGroupName } : g));
    setEditingGroupId(null);
  };

  const handleAddGroupFromModal = () => {
    const newId = 'g' + Date.now();
    const newName = '새 프리셋 그룹';
    setPresetGroups([...presetGroups, { 
      id: newId, 
      name: newName, 
      presets: [
        { id: 'p' + Date.now() + '1', condition: '후원금액 1,000 cash 이상', active: true },
        { id: 'p' + Date.now() + '2', condition: '후원금액 10,000 cash 이상', active: true }
      ] 
    }]);
    setEditingGroupId(newId);
    setEditingGroupName(newName);
  };

  const handleDeleteGroupFromModal = (id: string) => {
    if (presetGroups.length <= 1) return;
    
    if (deletingGroupId !== id) {
      setDeletingGroupId(id);
      setTimeout(() => setDeletingGroupId(null), 3000);
      return;
    }
    
    const newGroups = presetGroups.filter(g => g.id !== id);
    setPresetGroups(newGroups);
    if (activeGroupId === id) {
      setActiveGroupId(newGroups[0].id);
    }
    setDeletingGroupId(null);
  };

  const startEditingGroupFromModal = (id: string, name: string) => {
    setEditingGroupId(id);
    setEditingGroupName(name);
  };

  const saveEditingGroupFromModal = () => {
    if (!editingGroupName.trim() || !editingGroupId) return;
    setPresetGroups(presetGroups.map(g => g.id === editingGroupId ? { ...g, name: editingGroupName } : g));
    setEditingGroupId(null);
  };

  const handleAddPreset = () => {
    const newPreset = {
      id: 'p' + Date.now(),
      condition: '',
      active: true
    };
    setPresetGroups(presetGroups.map(g => g.id === activeGroupId ? { ...g, presets: [...g.presets, newPreset] } : g));
  };

  const handleDeletePreset = (presetId: string) => {
    setPresetGroups(presetGroups.map(g => g.id === activeGroupId ? { ...g, presets: g.presets.filter(p => p.id !== presetId) } : g));
  };

  const handlePresetConditionChange = (presetId: string, newCondition: string) => {
    setPresetGroups(presetGroups.map(g => g.id === activeGroupId ? {
      ...g,
      presets: g.presets.map(p => p.id === presetId ? { ...p, condition: newCondition } : p)
    } : g));
  };

  const handleTestPlay = () => {
    setShowPreviewAnim(false);
    setTimeout(() => setShowPreviewAnim(true), 100);
  };

  const handleDropdownSelect = () => {
    if (tempSelectedGroupId) {
      setActiveGroupId(tempSelectedGroupId);
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      setTempSelectedGroupId(activeGroupId);
    }
    setIsDropdownOpen(!isDropdownOpen);
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
            <Section title="프리셋 그룹 설정" subtitle="방송 주제별로 프리셋을 그룹화하여 다르게 적용할 수 있습니다.">
              {/* Group Selection Row (Compact) */}
              <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-2 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    현재 그룹
                  </span>
                  
                  {/* Custom Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm font-medium outline-none focus:border-blue-500 bg-white w-64 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <span className="truncate">{activeGroup.name}</span>
                      <ChevronRight size={14} className={`transform transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setIsDropdownOpen(false)}
                        ></div>
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden flex flex-col">
                          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                            {presetGroups.map(g => (
                              <label 
                                key={g.id} 
                                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${tempSelectedGroupId === g.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'}`}
                              >
                                <input 
                                  type="radio" 
                                  name="presetGroup" 
                                  value={g.id}
                                  checked={tempSelectedGroupId === g.id}
                                  onChange={() => setTempSelectedGroupId(g.id)}
                                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-sm font-medium truncate">{g.name}</span>
                              </label>
                            ))}
                          </div>
                          <div className="p-2 border-t border-gray-100 bg-gray-50">
                            <button
                              onClick={handleDropdownSelect}
                              className="w-full py-2 bg-blue-500 text-white rounded-md text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm"
                            >
                              선택
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setIsGroupModalOpen(true)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-colors shrink-0"
                >
                  <Settings size={14} /> 그룹 관리
                </button>
              </div>

              {/* Presets in Active Group */}
              <div className="space-y-3">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between px-1 gap-3">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-blue-600">[{activeGroup.name}]</span> 그룹 내 프리셋 목록
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1 shadow-sm transition-colors">
                        <Download size={14} /> 내보내기
                      </button>
                      <button className="px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1 shadow-sm transition-colors">
                        <Upload size={14} /> 가져오기
                      </button>
                      <button onClick={handleAddPreset} className="px-3 py-1.5 text-xs font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 flex items-center gap-1 shadow-sm transition-colors ml-1">
                        <Plus size={14} strokeWidth={3} /> 프리셋 추가
                      </button>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto flex-1">
                      <div className="relative w-full sm:max-w-xs">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="프리셋 조건 검색..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
                        />
                      </div>
                      <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full sm:w-auto py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white shadow-sm cursor-pointer"
                      >
                        <option value="custom">사용자 지정 순서</option>
                        <option value="amount_asc">금액 낮은순</option>
                        <option value="amount_desc">금액 높은순</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                      <button 
                        onClick={() => setIsAutoMapModalOpen(true)}
                        className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Image size={14} className="text-gray-500" /> 이미지 자동 매핑
                      </button>
                      <button 
                        onClick={() => setIsBatchModalOpen(true)}
                        className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Copy size={14} className="text-blue-500" /> 설정 일괄 적용
                      </button>
                    </div>
                  </div>
                </div>
                
                {filteredAndSortedPresets.length === 0 ? (
                  <div className="text-center py-12 text-sm text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex flex-col items-center gap-2">
                    <Search size={24} className="text-gray-400" />
                    {searchQuery ? '검색 결과가 없습니다.' : '등록된 프리셋이 없습니다. 새 프리셋을 추가해보세요.'}
                  </div>
                ) : (
                  filteredAndSortedPresets.map((preset, index) => (
                    <div key={preset.id} className="flex items-center gap-3 w-full p-3 border border-gray-200 rounded-lg bg-white hover:border-blue-400 hover:shadow-sm transition-all group">
                      <div className="w-20 shrink-0 font-bold text-sm text-gray-700">{index + 1}번 프리셋</div>
                      <input 
                        type="text" 
                        value={preset.condition} 
                        onChange={(e) => handlePresetConditionChange(preset.id, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-600 focus:bg-white focus:border-blue-500 outline-none transition-colors" 
                        placeholder="조건을 입력하세요 (예: 후원금액 1,000 cash 이상)"
                      />
                      <Toggle active={preset.active} />
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">설정 ▼</button>
                      {index >= 2 ? (
                        <button onClick={() => handleDeletePreset(preset.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100" title="프리셋 삭제">
                          <X size={16} />
                        </button>
                      ) : (
                        <div className="w-8"></div>
                      )}
                    </div>
                  ))
                )}
              </div>
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

        {/* Collapse Toggle Button & Divider */}
        {layoutMode === 'collapse' && (
          <div className="relative w-0 z-20">
            {/* Vertical Divider Line */}
            <div className="absolute top-0 bottom-0 w-px bg-gray-200"></div>
            
            {/* Sticky Toggle Button */}
            <div className="sticky top-[50vh] -translate-y-1/2 -ml-3.5">
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-7 h-20 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-300 transition-colors"></div>
                  {isCollapsed ? <ChevronLeft size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
                  <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-300 transition-colors"></div>
                </div>
              </button>
            </div>
          </div>
        )}

        <div className={`transition-all duration-300 ease-in-out flex justify-end ${
          layoutMode === 'pip' 
            ? 'fixed bottom-8 right-28 w-[400px] z-40 shadow-2xl bg-white rounded-xl border border-gray-200 overflow-hidden' 
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

      {/* Group Management Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">프리셋 그룹 관리</h2>
              <button onClick={() => setIsGroupModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-2">
              {presetGroups.map(g => (
                <div
                  key={g.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, g.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, g.id)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 p-3 rounded-lg border bg-white transition-all ${draggedGroupId === g.id ? 'opacity-40 scale-[0.98]' : 'hover:border-blue-300'}`}
                >
                  <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600" title="드래그하여 순서 변경">
                    <GripVertical size={16} />
                  </div>

                  {editingGroupId === g.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editingGroupName}
                        onChange={(e) => setEditingGroupName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEditingGroupFromModal();
                          if (e.key === 'Escape') setEditingGroupId(null);
                        }}
                        className="flex-1 border border-blue-500 rounded px-2 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-200"
                        autoFocus
                      />
                      <button onClick={saveEditingGroupFromModal} className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"><Check size={14}/></button>
                      <button onClick={() => setEditingGroupId(null)} className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"><X size={14}/></button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 text-sm font-medium text-gray-700">{g.name}</span>
                      <button onClick={() => startEditingGroupFromModal(g.id, g.name)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors" title="이름 수정">
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteGroupFromModal(g.id)}
                        disabled={presetGroups.length <= 1}
                        className={`p-1.5 rounded transition-colors ${
                          presetGroups.length <= 1 ? 'text-gray-300 cursor-not-allowed' :
                          deletingGroupId === g.id ? 'bg-red-500 text-white hover:bg-red-600' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={presetGroups.length <= 1 ? "최소 1개의 그룹이 필요합니다" : "그룹 삭제"}
                      >
                        {deletingGroupId === g.id ? <span className="text-xs font-bold px-1">삭제?</span> : <X size={14} />}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleAddGroupFromModal}
                className="w-full py-2.5 bg-white border border-dashed border-gray-300 text-gray-600 rounded-lg text-sm font-bold hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> 새 그룹 추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Apply Modal */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Copy size={18} className="text-blue-500" /> 설정 일괄 적용
              </h2>
              <button onClick={() => setIsBatchModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8">
              <p className="text-sm text-gray-600 font-medium">현재 그룹의 모든 프리셋에 아래 설정을 일괄 적용합니다.</p>
              
              {/* 알림 효과 설정 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                  <h3 className="text-sm font-bold text-gray-800">알림 효과 설정</h3>
                </div>
                
                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600">알림 효과</span>
                  <div className="flex gap-3 w-full max-w-2xl">
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white">
                      <option>Fade In</option>
                    </select>
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white">
                      <option>Fade Out</option>
                    </select>
                    <div className="flex-1 border border-gray-100 rounded-md bg-gray-50 flex items-center justify-center text-gray-300">
                      <ImageIcon size={20} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600">텍스트 애니메이션</span>
                  <div className="flex gap-3 w-full max-w-2xl">
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white">
                      <option>Pulse</option>
                    </select>
                    <button className="flex-[2] border border-gray-100 rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors">
                      텍스트 효과 미리보기
                    </button>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 알림 메시지 설정 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                  <h3 className="text-sm font-bold text-gray-800">알림 메시지 설정</h3>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">알림 메시지 <div className="w-4 h-4 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] font-bold">?</div></span>
                  <input type="text" defaultValue="{닉네임}님이 {시그니처}를 신청하셨어요!" className="w-full max-w-2xl border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">재생 딜레이(초) <div className="w-4 h-4 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] font-bold">?</div></span>
                  <div className="relative w-full max-w-2xl">
                    <input type="number" defaultValue="0" className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-700">초</span>
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">알림 노출 시간(초) <div className="w-4 h-4 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] font-bold">?</div></span>
                  <div className="relative w-full max-w-2xl">
                    <input type="number" defaultValue="3" className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-700">초</span>
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600">폰트 설정</span>
                  <div className="flex gap-3 w-full max-w-2xl">
                    <select className="flex-[2] border border-gray-300 rounded-md px-3 py-2.5 text-sm font-bold outline-none focus:border-blue-500 bg-white">
                      <option>제주 고딕</option>
                    </select>
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white">
                      <option>36px</option>
                    </select>
                    <div className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-gray-50 flex items-center justify-between">
                      <span className="text-gray-600">#FFFFFF</span>
                      <div className="w-5 h-5 rounded-full bg-white border border-gray-200 shadow-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600">닉네임, 금액 컬러</span>
                  <div className="w-full max-w-[200px] border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-600">#519CFF</span>
                    <div className="w-5 h-5 rounded-full bg-[#519CFF] border border-gray-200 shadow-sm"></div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 후원 메시지 설정 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                  <h3 className="text-sm font-bold text-gray-800">후원 메시지 설정</h3>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600">폰트 설정</span>
                  <div className="flex gap-3 w-full max-w-2xl">
                    <select className="flex-[2] border border-gray-300 rounded-md px-3 py-2.5 text-sm font-bold outline-none focus:border-blue-500 bg-white">
                      <option>제주 고딕</option>
                    </select>
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white">
                      <option>40px</option>
                    </select>
                    <div className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-gray-50 flex items-center justify-between">
                      <span className="text-gray-600">#FFFFFF</span>
                      <div className="w-5 h-5 rounded-full bg-white border border-gray-200 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 shrink-0">
              <button onClick={() => setIsBatchModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">취소</button>
              <button onClick={() => setIsBatchModalOpen(false)} className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">일괄 적용하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Auto Map Modal */}
      {isAutoMapModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Image size={18} className="text-blue-500" /> 이미지 자동 매핑
              </h2>
              <button onClick={() => setIsAutoMapModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-4">
                <p className="font-bold mb-1">파일명 규칙 안내</p>
                <p>업로드하는 파일명에 금액이 포함되어 있으면 해당 금액의 프리셋에 자동으로 매핑됩니다.</p>
                <p className="mt-2 text-xs opacity-80">예시: <code className="bg-blue-100 px-1 py-0.5 rounded">text_donation_1000.png</code> ➔ 1,000 cash 프리셋에 적용</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-3">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-gray-700 mb-1">클릭하거나 파일을 드래그하여 업로드</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF (최대 10MB)</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button onClick={() => setIsAutoMapModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">닫기</button>
            </div>
          </div>
        </div>
      )}
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

// ---------------------------------------------------------
// Floating Action Buttons Component
// ---------------------------------------------------------
function FloatingActionButtons() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-center">
      {/* Discord Button */}
      <button className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#5865F2] hover:bg-gray-50 transition-colors">
        <MessageCircle size={24} fill="currentColor" />
      </button>

      {/* Remote Control Button with Tooltip */}
      <div className="relative flex items-center justify-center">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 flex gap-3 animate-fade-in">
            <div className="w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">방송을 할 때 리모컨을 사용하세요!</h4>
              <p className="text-xs text-gray-500 mb-3">중요한 후원 기능들을 컨트롤 할 수 있습니다.</p>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 px-3 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">웹 리모컨</button>
                <button className="flex-1 py-1.5 px-3 bg-blue-500 text-white rounded-md text-xs font-medium hover:bg-blue-600">설치형 리모컨</button>
              </div>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 bg-white border-r border-t border-gray-100 transform rotate-45"></div>
            {/* Close Tooltip */}
            <button onClick={() => setShowTooltip(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Remote Button */}
        <button className="w-14 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 flex flex-col items-center justify-center text-white hover:bg-blue-700 transition-colors gap-1">
          <Smartphone size={20} />
          <span className="text-[10px] font-bold">리모컨<br/>실행</span>
        </button>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}