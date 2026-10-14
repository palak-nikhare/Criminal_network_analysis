import React from 'react';
import {
  FolderGit2,
  Users,
  Share2,
  FileCheck2,
  AlertTriangle,
  Network,
  Clock,
  MapPin,
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Shield,
  Activity,
  UserCheck,
  Calendar
} from 'lucide-react';
import {
  InvestigationCase,
  Entity,
  Relationship,
  Evidence,
  AnomalyAlert,
  Finding
} from '../types';

interface InvestigationDashboardProps {
  caseData: InvestigationCase;
  entities: Entity[];
  relationships: Relationship[];
  evidence: Evidence[];
  anomalies: AnomalyAlert[];
  findings: Finding[];
  onNavigateTab: (tab: string) => void;
  onSelectEntity: (entityId: string) => void;
  onVerifyFinding?: (findingId: string, status: 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW') => void;
  onVerifyRelationship?: (relId: string, status: 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW') => void;
}

export const InvestigationDashboard: React.FC<InvestigationDashboardProps> = ({
  caseData,
  entities,
  relationships,
  evidence,
  anomalies,
  findings,
  onNavigateTab,
  onSelectEntity
}) => {
  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* 1. Active Case Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#C53A4F]/10 text-[#C53A4F] border border-[#C53A4F]/20 font-bold">
                Active Case: {caseData.id}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold font-mono">
                {caseData.status}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                {caseData.division}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {caseData.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {caseData.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-[#45BAAC]" />
                <span>Lead Investigator: <strong className="text-slate-900">{caseData.investigatingOfficer}</strong> ({caseData.badgeNumber})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Registered: <strong className="text-slate-900">{caseData.createdAt}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-[#C53A4F]" />
                <span>Confidence Score: <strong className="text-[#C53A4F] font-mono">{caseData.confidenceScore}%</strong></span>
              </div>
            </div>
          </div>

          {/* Quick AI Action */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
            <button
              id="dashboard-investigate-btn"
              onClick={() => onNavigateTab('investigate')}
              className="px-5 py-2.5 rounded-lg bg-[#C53A4F] hover:bg-[#a82b3d] text-white text-xs font-bold shadow-xs hover:shadow transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Investigate Crime with AI</span>
            </button>
            <button
              id="dashboard-view-case-btn"
              onClick={() => onNavigateTab('case')}
              className="px-5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Case Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Investigation Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Entities */}
        <div
          onClick={() => onNavigateTab('case')}
          className="p-5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Entities</span>
            <Users className="w-4 h-4 text-[#C53A4F]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 group-hover:text-[#C53A4F] transition-colors">
            {entities.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            People, phones, accounts, vehicles
          </div>
        </div>

        {/* Relationships */}
        <div
          onClick={() => onNavigateTab('network')}
          className="p-5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Relationships</span>
            <Share2 className="w-4 h-4 text-[#45BAAC]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 group-hover:text-[#45BAAC] transition-colors">
            {relationships.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Calls, transfers, co-locations
          </div>
        </div>

        {/* Evidence Records */}
        <div
          onClick={() => onNavigateTab('connect')}
          className="p-5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Evidence</span>
            <FileCheck2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
            {evidence.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            FIRs, CDRs, financial records
          </div>
        </div>

        {/* Potential Alerts */}
        <div
          onClick={() => onNavigateTab('hidden')}
          className="p-5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Alerts</span>
            <AlertTriangle className="w-4 h-4 text-[#C53A4F]" />
          </div>
          <div className="text-3xl font-extrabold text-[#C53A4F]">
            {anomalies.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Anomalies & flagged patterns
          </div>
        </div>
      </div>

      {/* 3. Progressive Disclosure Navigation Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            Investigation Workspaces
          </h2>
          <span className="text-xs text-slate-500">
            Select a specialized view to focus your analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Evidence */}
          <div
            id="dash-access-evidence"
            onClick={() => onNavigateTab('connect')}
            className="p-5 bg-white border border-slate-200 hover:border-[#45BAAC] rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#45BAAC]/10 border border-[#45BAAC]/20 flex items-center justify-center text-[#45BAAC] mb-3">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#45BAAC] transition-colors">
                Evidence Vault
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Review call records, financial transactions, surveillance reports and court-admissible source data.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#45BAAC]">
              <span>Inspect {evidence.length} Records</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Network */}
          <div
            id="dash-access-network"
            onClick={() => onNavigateTab('network')}
            className="p-5 bg-white border border-slate-200 hover:border-[#C53A4F] rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#C53A4F]/10 border border-[#C53A4F]/20 flex items-center justify-center text-[#C53A4F] mb-3">
                <Network className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C53A4F] transition-colors">
                Network Analysis
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Explore interactive network graph mapping persons, phones, bank accounts, and criminal affiliations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#C53A4F]">
              <span>View Interactive Graph</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Timeline */}
          <div
            id="dash-access-timeline"
            onClick={() => onNavigateTab('timeline')}
            className="p-5 bg-white border border-slate-200 hover:border-slate-400 rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                Timeline Reconstruction
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Step chronologically through call sequences, fund transfers, and physical co-location incidents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>View Chronology</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Locations */}
          <div
            id="dash-access-locations"
            onClick={() => onNavigateTab('locations')}
            className="p-5 bg-white border border-slate-200 hover:border-[#45BAAC] rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#45BAAC]/10 border border-[#45BAAC]/20 flex items-center justify-center text-[#45BAAC] mb-3">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#45BAAC] transition-colors">
                Locations & Hotspots
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Investigate geographical meeting locations, cell tower overlaps, and transit routes in Pune.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#45BAAC]">
              <span>View 4 Hotspots</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Hidden Links */}
          <div
            id="dash-access-hidden"
            onClick={() => onNavigateTab('hidden')}
            className="p-5 bg-white border border-slate-200 hover:border-[#C53A4F] rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#C53A4F]/10 border border-[#C53A4F]/20 flex items-center justify-center text-[#C53A4F] mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C53A4F] transition-colors">
                Hidden Links
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Uncover disguised aliases, proxy bank accounts, and indirect intermediaries detected by AI.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#C53A4F]">
              <span>Review Discovered Links</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Investigate Crime Card */}
          <div
            id="dash-access-investigate"
            onClick={() => onNavigateTab('investigate')}
            className="p-5 bg-[#C53A4F]/5 border border-[#C53A4F]/30 hover:border-[#C53A4F] rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#C53A4F] text-white flex items-center justify-center mb-3">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C53A4F] transition-colors">
                Investigate Crime (AI)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Query the AI Crime Investigator with structured presets across key persons, links, and locations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C53A4F]/20 flex items-center justify-between text-xs font-bold text-[#C53A4F]">
              <span>Run AI Investigation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Potential Alerts Section (Restrained Overview) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-[#C53A4F]" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Potential Investigation Alerts ({anomalies.length})
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('hidden')}
            className="text-xs font-semibold text-[#C53A4F] hover:underline flex items-center"
          >
            View All in Hidden Links <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {anomalies.slice(0, 3).map((alert) => (
            <div key={alert.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {alert.id}
                  </span>
                  <span className="font-bold text-xs text-slate-900">{alert.title}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      alert.severity === 'HIGH'
                        ? 'bg-[#C53A4F]/10 text-[#C53A4F]'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {alert.severity} SEVERITY
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {alert.description}
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('hidden')}
                className="self-start sm:self-center px-3 py-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer shrink-0"
              >
                Investigate Alert
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
