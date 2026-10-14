import React from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Shield,
  FileCheck2,
  GitMerge,
  Cpu,
  LayoutDashboard
} from 'lucide-react';

interface HomePageProps {
  onInvestigateCrime: () => void;
  onOpenDashboard: () => void;
  onNavigateTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onInvestigateCrime,
  onOpenDashboard,
  onNavigateTab
}) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between selection:bg-[#C53A4F]/10 selection:text-[#C53A4F]">
      {/* Minimal Top Header for Home Page */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#C53A4F] flex items-center justify-center shadow-xs">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-widest text-slate-900">
              ASTRA
            </span>
            <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
              NCRB Intelligence
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="home-open-dashboard-btn"
            onClick={onOpenDashboard}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
            <span>Open Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-5xl mx-auto text-center w-full">
        {/* Large Elegant ASTRA Title */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C53A4F]/5 border border-[#C53A4F]/20 text-[#C53A4F] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C53A4F]"></span>
            <span>National Crime Record Intelligence System</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
            ASTRA
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
            AI-Powered Criminal Network Analysis
          </p>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed pt-1">
            Connect fragmented evidence, uncover hidden relationships, and generate evidence-backed investigation leads.
          </p>
        </div>

        {/* Primary and Most Prominent CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            id="home-investigate-crime-cta"
            onClick={onInvestigateCrime}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#C53A4F] hover:bg-[#a82b3d] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer group"
          >
            <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Investigate Crime</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="home-secondary-dashboard-btn"
            onClick={onOpenDashboard}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-semibold border border-slate-200 shadow-xs transition cursor-pointer"
          >
            View Active Case
          </button>
        </div>

        {/* Three Simple Minimal Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {/* Card 1: Connect Evidence */}
          <div
            id="home-feature-connect-evidence"
            onClick={() => onNavigateTab('connect')}
            className="p-6 bg-white border border-slate-200 hover:border-[#45BAAC] rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#45BAAC]/10 border border-[#45BAAC]/20 flex items-center justify-center mb-4 text-[#45BAAC]">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#45BAAC] transition-colors mb-2">
              Connect Evidence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Correlate people, phones, accounts, locations and case records.
            </p>
          </div>

          {/* Card 2: Discover Hidden Links */}
          <div
            id="home-feature-hidden-links"
            onClick={() => onNavigateTab('hidden')}
            className="p-6 bg-white border border-slate-200 hover:border-[#C53A4F] rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#C53A4F]/10 border border-[#C53A4F]/20 flex items-center justify-center mb-4 text-[#C53A4F]">
              <GitMerge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C53A4F] transition-colors mb-2">
              Discover Hidden Links
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identify aliases, intermediaries and relationships across fragmented evidence.
            </p>
          </div>

          {/* Card 3: Generate Intelligence */}
          <div
            id="home-feature-generate-intelligence"
            onClick={onInvestigateCrime}
            className="p-6 bg-white border border-slate-200 hover:border-[#45BAAC] rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#45BAAC]/10 border border-[#45BAAC]/20 flex items-center justify-center mb-4 text-[#45BAAC]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#45BAAC] transition-colors mb-2">
              Generate Intelligence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Turn connected evidence into clear, evidence-backed investigation leads.
            </p>
          </div>
        </div>
      </main>

      {/* Minimal Landing Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#45BAAC]"></span>
          <span className="font-medium text-slate-700">ASTRA Platform</span>
          <span>•</span>
          <span>NCRB Cyber Intelligence & Investigation Support</span>
        </div>
        <div className="font-mono text-[11px] text-slate-400">
          Decision Support System • High-Assurance Chain of Custody
        </div>
      </footer>
    </div>
  );
};
