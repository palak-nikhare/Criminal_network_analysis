import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  FileCheck2,
  Search,
  Filter,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  Fingerprint
} from 'lucide-react';
import { AuditLogEntry } from '../types';
import { truncateHash } from '../utils';

interface AuditLogsPageProps {
  logs: AuditLogEntry[];
}

export const AuditLogsPage: React.FC<AuditLogsPageProps> = ({ logs }) => {
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredLogs = logs.filter((log) => {
    const matchesAction = filterAction === 'ALL' || log.action === filterAction;
    const matchesSearch =
      log.user.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.target.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.justification.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.id.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesAction && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#45baac]/10 text-[#45baac] border border-[#45baac]/30 font-bold">
                COMPLIANCE & GOVERNANCE
              </span>
              <span className="text-xs text-slate-500">
                Immutable SHA-256 Audit Trail & Legal Gate
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Investigator Audit Logs & Human-in-the-Loop Governance
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl mt-1 leading-relaxed">
              Every data ingestion, network expansion, alias merge, report generation, and AI prompt is permanently hashed. Strict role-based access control prevents unauthorized surveillance or unverified accusations.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono flex items-center space-x-1.5 font-medium">
              <Fingerprint className="w-4 h-4 text-emerald-600" />
              <span>Cryptographic Chain Integrity: 100% Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Ethical Safeguards Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#45baac] font-bold text-xs">
            <Scale className="w-4 h-4" />
            <span>Presumption of Innocence Protocol</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The AI system solely computes probabilistic correlation leads. It is algorithmically prohibited from generating determinations of guilt or liability.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>Legal Authorization Gate (Section 91)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            CDR records and bank ledgers require verified court warrant references before algorithmic parsing can be initiated.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>Low-Confidence Flagging</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Any correlation with confidence below 75% displays a prominent warning indicating circumstantial or uncorroborated status.
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#45baac]" />
              <span>Immutable Ledger of Investigator Actions ({filteredLogs.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              SHA-256 hashed records compliant with Indian Evidence Act digital records admissibility
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search officer, target, or hash..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#45baac] w-52 font-sans"
              />
            </div>

            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#45baac]"
            >
              <option value="ALL">All Actions</option>
              <option value="LOGIN">LOGIN</option>
              <option value="INGEST_DOCUMENT">INGEST DOCUMENT</option>
              <option value="EXPAND_NETWORK">EXPAND NETWORK</option>
              <option value="VERIFY_FINDING">VERIFY FINDING</option>
              <option value="AI_QUERY">AI QUERY</option>
              <option value="GENERATE_REPORT">GENERATE REPORT</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px]">
                <th className="p-3">LOG ID & TIME</th>
                <th className="p-3">INVESTIGATOR / BADGE</th>
                <th className="p-3">ACTION</th>
                <th className="p-3">TARGET ENTITY</th>
                <th className="p-3">LEGAL JUSTIFICATION</th>
                <th className="p-3 text-right">SHA-256 INTEGRITY HASH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 whitespace-nowrap">
                    <div className="font-mono text-[#45baac] font-bold">{log.id}</div>
                    <div className="text-[10px] text-slate-400">{log.timestamp}</div>
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{log.user}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{log.badge}</div>
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-[#45baac] border border-slate-200 font-semibold">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    <span className="font-mono text-slate-700 font-medium">{log.target}</span>
                  </td>

                  <td className="p-3 text-slate-600 max-w-xs truncate">
                    {log.justification}
                  </td>

                  <td className="p-3 text-right whitespace-nowrap font-mono text-[10px] text-emerald-700 font-bold">
                    {truncateHash(log.hash)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
