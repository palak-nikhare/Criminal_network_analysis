import React, { useState } from 'react';
import {
  Sparkles,
  GitMerge,
  AlertTriangle,
  Network,
  CheckCircle2,
  XCircle,
  TrendingUp,
  PhoneCall,
  CreditCard,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Info
} from 'lucide-react';
import { AliasResolution, AnomalyAlert, Entity } from '../types';
import { CaseOption } from '../data/casesDataset';

interface HiddenLinksPageProps {
  aliasResolutions: AliasResolution[];
  anomalies: AnomalyAlert[];
  entities: Entity[];
  onMergeAlias: (aliasId: string, status: 'CONFIRMED_MERGED' | 'REJECTED' | 'PENDING_REVIEW') => void;
  onSelectEntity: (entityId: string) => void;
  onNavigateTab: (tab: string) => void;
  caseInfo?: CaseOption;
}

export const HiddenLinksPage: React.FC<HiddenLinksPageProps> = ({
  aliasResolutions,
  anomalies,
  entities,
  onMergeAlias,
  onSelectEntity,
  onNavigateTab,
  caseInfo
}) => {
  const sampleAlias = React.useMemo(() => {
    if (caseInfo?.city === 'Mumbai') {
      return {
        canonical: 'Tariq Merchant',
        variants: ['T. Merchant', 'Bhaijaan Mumbai', 'Alias: SeaLord'],
        matchConfidence: 92,
        evidenceSnippet: 'Matched through vessel registration logs and Hawala slip token references BOM-882.'
      };
    }
    if (caseInfo?.city === 'Delhi') {
      return {
        canonical: 'Kunal Verma',
        variants: ['K. Verma', 'Kunal V.', 'Alias: GhostOperator'],
        matchConfidence: 96,
        evidenceSnippet: 'Matched through automated VoIP proxy gateway and peeling-chain wallet address 0x9a8f.'
      };
    }
    return {
      canonical: 'Arjun Mehta',
      variants: ['A. Mehta', 'Arjun M.', 'Alias: Victor'],
      matchConfidence: 94,
      evidenceSnippet: 'Matched through shared IMEI on Phone-101 and common Pune IP Gateway terminal.'
    };
  }, [caseInfo]);

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#C53A4F]/10 border border-[#C53A4F]/20 text-[#C53A4F] text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Graph Intelligence</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hidden Links & Alias Resolution
            </h1>
            {caseInfo && (
              <>
                <span className="text-xl sm:text-2xl font-bold text-slate-300">·</span>
                <span className="text-lg sm:text-xl font-mono font-bold text-[#C53A4F]">
                  {caseInfo.id}
                </span>
                <span className="text-slate-400 text-sm font-medium">·</span>
                <span className="text-slate-700 text-sm font-bold">
                  {caseInfo.city}
                </span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Resolve fragmented identities, detect behavioral anomalies, and unveil indirect syndication conduits for {caseInfo ? `${caseInfo.id} (${caseInfo.city})` : 'the active case'}.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[#C53A4F] font-bold">
            {aliasResolutions.length + 1} Alias Candidates
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-amber-700 font-bold">
            {anomalies.length} Behavioral Anomalies
          </span>
        </div>
      </div>

      {/* 2-COLUMN MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= LEFT COLUMN: ALIAS RESOLUTION ================= */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <GitMerge className="w-4 h-4 text-[#C53A4F]" />
                <h3 className="font-bold text-sm text-slate-900">
                  Alias Resolution Pipeline
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#45BAAC]/10 text-[#45BAAC] border border-[#45BAAC]/30 font-semibold">
                Phonetic & Device Corroboration
              </span>
            </div>

            {/* Prominent Match Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-[#C53A4F]/20 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#C53A4F] border border-slate-200 font-bold">
                  HIGH CONFIDENCE MATCH
                </span>
                <div className="flex items-center space-x-1.5 text-xs font-mono text-[#45BAAC] font-bold">
                  <span>Match Probability:</span>
                  <span className="px-2 py-0.5 rounded bg-[#45BAAC]/10 text-[#45BAAC]">
                    {sampleAlias.matchConfidence}%
                  </span>
                </div>
              </div>

              {/* Names */}
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">Primary Identity:</span>
                  <span className="font-bold text-slate-900">{sampleAlias.canonical}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-1.5">
                  <span className="text-slate-500 font-mono text-[11px]">Observed Aliases:</span>
                  <div className="flex items-center space-x-2 font-mono text-amber-700 font-semibold text-xs">
                    {sampleAlias.variants.map((v, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Why Connected */}
              <div>
                <label className="text-[10px] uppercase font-semibold text-slate-500">Why Connected</label>
                <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                  {sampleAlias.evidenceSnippet}
                </p>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-[10px] font-mono text-slate-500">
                  Status: <strong className="text-amber-700">Requires Review</strong>
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onMergeAlias('ALIAS-01', 'CONFIRMED_MERGED')}
                    className="px-3 py-1.5 rounded-lg bg-[#45BAAC] hover:bg-[#3ba396] text-white text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    Confirm & Merge
                  </button>
                  <button
                    onClick={() => onMergeAlias('ALIAS-01', 'REJECTED')}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-medium transition cursor-pointer"
                  >
                    Keep Separate
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Ingested Alias Resolutions */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                Additional Detected Links
              </div>
              {aliasResolutions.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400">{res.id}</span>
                    <span className="text-[#45BAAC] font-mono font-bold">{res.confidence}% Match</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-900">{res.primaryName}</span>
                    <span className="text-[#C53A4F] font-mono font-bold">⟷</span>
                    <span className="text-amber-700">{res.aliasName}</span>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <strong>Why connected:</strong> {res.reasons[0]}
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[10px]">
                    <span className="text-slate-500">Status: {res.status}</span>
                    <button
                      onClick={() => onMergeAlias(res.id, 'CONFIRMED_MERGED')}
                      className="text-[#C53A4F] hover:underline font-semibold"
                    >
                      Review & Merge →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: BEHAVIORAL ANOMALIES ================= */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#C53A4F]" />
                <h3 className="font-bold text-sm text-slate-900">
                  Behavioral Anomalies & Red Flags
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C53A4F]/10 text-[#C53A4F] border border-[#C53A4F]/30 font-semibold">
                Surveillance Corroboration
              </span>
            </div>

            <div className="space-y-3">
              {anomalies.map((anom) => (
                <div
                  key={anom.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#C53A4F]">
                      {anom.id} • {anom.type}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-[10px] font-mono font-bold">
                      {anom.severity} SEVERITY
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    {anom.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {anom.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <div className="text-[11px] font-mono text-slate-500">
                      Confidence: <strong className="text-[#45BAAC]">{anom.confidence}%</strong>
                    </div>
                    <button
                      onClick={() => onNavigateTab('network')}
                      className="text-xs font-semibold text-[#C53A4F] hover:underline flex items-center space-x-1"
                    >
                      <span>Locate in Network</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
