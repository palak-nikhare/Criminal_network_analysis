import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  FileCheck2,
  Network,
  Clock,
  MapPin,
  Sparkles,
  Search,
  FileText,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Shield,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  anomaliesCount?: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  ai?: boolean;
  badge?: string | null;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  anomaliesCount = 6
}) => {
  const navigationGroups: NavGroup[] = [
    {
      groupTitle: 'COMMAND',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      groupTitle: 'INVESTIGATION',
      items: [
        { id: 'case', label: 'Cases', icon: FolderGit2 },
        { id: 'connect', label: 'Evidence', icon: FileCheck2 },
        { id: 'network', label: 'Network', icon: Network },
        { id: 'timeline', label: 'Timeline', icon: Clock },
        { id: 'locations', label: 'Locations', icon: MapPin }
      ]
    },
    {
      groupTitle: 'INTELLIGENCE',
      items: [
        { id: 'hidden', label: 'Hidden Links', icon: Sparkles, ai: true, badge: `${anomaliesCount}` },
        { id: 'investigate', label: 'Investigate Crime', icon: Search, ai: true, badge: 'AI' }
      ]
    },
    {
      groupTitle: 'REPORTING',
      items: [
        { id: 'reports', label: 'Reports', icon: FileText }
      ]
    },
    {
      groupTitle: 'SYSTEM',
      items: [
        { id: 'audit', label: 'Audit Log', icon: ShieldCheck }
      ]
    }
  ];

  return (
    <aside
      className={`relative flex flex-col shrink-0 bg-white border-r border-slate-200 transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Top Branding */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 bg-white">
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer overflow-hidden group"
          title="Go to ASTRA Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#C53A4F] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#a82b3d] transition-colors">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base tracking-widest text-slate-900 truncate">
                ASTRA
              </span>
              <span className="text-[9px] font-mono tracking-wider text-slate-500 font-bold truncate">
                AI NETWORK ANALYSIS
              </span>
            </div>
          )}
        </div>

        {/* Toggle Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto scrollbar-thin">
        {navigationGroups.map((group) => (
          <div key={group.groupTitle} className="space-y-1">
            {!collapsed && (
              <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                {group.groupTitle}
              </div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              const isAI = item.ai;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                    isSelected
                      ? 'bg-[#C53A4F]/10 text-[#C53A4F] font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {/* Crimson vertical indicator for selected page */}
                  {isSelected && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#C53A4F]" />
                  )}

                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isSelected
                          ? 'text-[#C53A4F]'
                          : isAI
                          ? 'text-[#45BAAC] group-hover:text-[#35968b]'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    {!collapsed && (
                      <span className={`truncate ${isSelected ? 'font-bold text-slate-900' : ''}`}>
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 font-bold ${
                        isSelected
                          ? 'bg-[#C53A4F] text-white'
                          : isAI
                          ? 'bg-[#45BAAC]/10 text-[#45BAAC]'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 space-y-2">
        <button
          onClick={() => setActiveTab('home')}
          title={collapsed ? 'Return to Home' : undefined}
          className="w-full flex items-center space-x-3 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition cursor-pointer"
        >
          <Home className="w-4 h-4 shrink-0 text-slate-500" />
          {!collapsed && <span className="truncate">ASTRA Home</span>}
        </button>

        {!collapsed && (
          <div className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45BAAC]"></span>
              <span>NCRB Network</span>
            </div>
            <span className="text-[#C53A4F] font-bold">ACTIVE</span>
          </div>
        )}
      </div>
    </aside>
  );
};
