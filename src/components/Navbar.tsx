import React, { useState } from 'react';
import {
  Search,
  Bell,
  User,
  ChevronRight,
  Shield,
  RotateCcw,
  CheckCircle2,
  X,
  Home
} from 'lucide-react';
import { UserSession } from '../types';
import { CaseOption } from '../data/casesDataset';

interface NavbarProps {
  user: UserSession | null;
  onOpenLogin: () => void;
  onResetDemo: () => void;
  onSearchSelect?: (entityId: string) => void;
  onNavigateTab?: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Array<{ id: string; name: string; type: string; label: string }>;
  activeTabTitle?: string;
  caseInfo?: CaseOption | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenLogin,
  onResetDemo,
  onSearchSelect,
  onNavigateTab,
  searchQuery,
  setSearchQuery,
  searchResults,
  activeTabTitle = 'Dashboard',
  caseInfo
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs font-mono shrink-0">
        <button
          onClick={() => onNavigateTab && onNavigateTab('home')}
          className="text-slate-500 hover:text-slate-900 transition flex items-center space-x-1 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>ASTRA</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        {caseInfo ? (
          <span className="text-[#C53A4F] font-bold">
            {caseInfo.id} ({caseInfo.city})
          </span>
        ) : (
          <span className="text-slate-400 italic">No Case Selected</span>
        )}
        {activeTabTitle && activeTabTitle !== 'Dashboard' && (
          <>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-bold">{activeTabTitle}</span>
          </>
        )}
      </div>

      {/* Center: Global Search */}
      <div className="relative flex-1 max-w-lg hidden md:block">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search entities: Arjun Mehta, +91-98231-XXXX1, ACC-201..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#C53A4F] focus:bg-white transition font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Live Search Popup */}
        {isSearchOpen && searchQuery.trim() && searchResults.length > 0 && (
          <div
            className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
            onMouseLeave={() => setIsSearchOpen(false)}
          >
            <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 border-b border-slate-100 flex justify-between bg-slate-50">
              <span>MATCHING ENTITIES</span>
              <span className="text-[#C53A4F] font-bold">{searchResults.length} RESULTS</span>
            </div>
            {searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (onSearchSelect) onSearchSelect(item.id);
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 text-slate-900 transition cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-slate-900">{item.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{item.id}</div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {item.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Actions & Profile */}
      <div className="flex items-center space-x-3 shrink-0">
        <button
          onClick={onResetDemo}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-medium transition cursor-pointer"
          title="Reload Synthetic Demo Records"
        >
          <RotateCcw className="w-3 h-3 text-slate-500" />
          <span>Reload Demo</span>
        </button>

        {/* User Profile / Login */}
        <div
          onClick={onOpenLogin}
          className="flex items-center space-x-2 pl-2 border-l border-slate-200 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-[#C53A4F]/10 border border-[#C53A4F]/30 flex items-center justify-center text-[#C53A4F] font-bold text-xs">
            {user ? user.name.slice(0, 2).toUpperCase() : 'VR'}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {user ? user.name : 'Insp. Vikram Rathod'}
            </span>
            <span className="text-[10px] font-mono text-slate-500 leading-tight">
              {user ? user.badgeNumber : 'NCRB-WSD-4412'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
