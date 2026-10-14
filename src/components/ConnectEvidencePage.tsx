import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  X,
  Building2,
  Calendar,
  Layers,
  FileText,
  ExternalLink,
  Search,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { Relationship, Evidence, Entity, InvestigationCase } from '../types';
import { CaseOption, CaseEvidenceItem, AVAILABLE_CASES, CASE_BUNDLES } from '../data/casesDataset';

interface ConnectEvidencePageProps {
  relationships?: Relationship[];
  evidence?: Evidence[];
  entities?: Entity[];
  onVerifyRelationship?: (relId: string, status: 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW') => void;
  onSelectEntity?: (entityId: string) => void;
  caseData?: InvestigationCase;
  caseInfo?: CaseOption;
  evidenceItems?: CaseEvidenceItem[];
  onChangeCase?: (newCaseId: string) => void;
}

export const ConnectEvidencePage: React.FC<ConnectEvidencePageProps> = ({
  caseInfo = AVAILABLE_CASES[0],
  evidenceItems,
  onSelectEntity,
  onChangeCase
}) => {
  const [activeModalEvidence, setActiveModalEvidence] = useState<CaseEvidenceItem | null>(null);

  // Load only evidence that strictly belongs to the currently selected case
  const currentCaseEvidence = useMemo(() => {
    if (evidenceItems && evidenceItems.length > 0) {
      return evidenceItems;
    }
    const bundle = CASE_BUNDLES[caseInfo.id] || CASE_BUNDLES['FIR-2026-089'];
    return bundle.evidenceItems;
  }, [evidenceItems, caseInfo.id]);

  return (
    <div className="space-y-8 pb-24 max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. PAGE HEADER (with case identifier: Evidence · FIR-2026-089 · Pune)     */}
      {/* ========================================================================= */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Evidence
          </h1>
          <span className="text-xl sm:text-2xl font-bold text-slate-300">·</span>
          <span className="text-lg sm:text-xl font-mono font-bold text-[#C53A4F]">
            {caseInfo.id}
          </span>
          <span className="text-slate-400 text-sm font-medium">·</span>
          <span className="text-slate-700 text-sm font-bold">
            {caseInfo.city}
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Key records supporting the selected investigation.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. CASE UNDER ANALYSIS CARD                                               */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#C53A4F]">
              CASE UNDER ANALYSIS
            </span>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#45BAAC]"></span>
              <span className="text-xs font-mono font-bold text-slate-900">
                STRICT DATA ISOLATION ENFORCED
              </span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#45BAAC]/10 border border-[#45BAAC]/25 text-[#1b7a70] text-xs font-mono font-bold self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admissible Court Docket</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Case Code */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Case Identifier
            </span>
            <div className="font-mono text-base font-black text-[#C53A4F]">
              {caseInfo.id}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Code: {caseInfo.code}
            </div>
          </div>

          {/* Title */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Investigation Title
            </span>
            <div className="text-sm font-bold text-slate-900 truncate">
              {caseInfo.title}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {caseInfo.division || 'Special Crime Wing'}
            </div>
          </div>

          {/* Jurisdiction */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Jurisdiction
            </span>
            <div className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-[#45BAAC]" />
              <span>{caseInfo.city}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Lead Officer: {caseInfo.officer}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EVIDENCE RECORDS LIST (CLEAN & MINIMAL)                                */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Supporting Evidence Records ({currentCaseEvidence.length})
            </h2>
            <p className="text-xs text-slate-500">
              Filtered exclusively for case {caseInfo.id} ({caseInfo.city})
            </p>
          </div>
        </div>

        {currentCaseEvidence.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-200 rounded-2xl bg-white space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No evidence items in this case docket.</div>
            <p className="text-xs text-slate-400">All evidence must strictly belong to {caseInfo.id}.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {currentCaseEvidence.map((item) => (
              <div
                key={item.id}
                id={`evidence-card-${item.id}`}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left Attributes */}
                <div className="flex-1 space-y-2.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Evidence ID */}
                    <span className="font-mono text-sm font-black text-[#C53A4F] tracking-wide">
                      {item.id}
                    </span>

                    {/* Evidence Type Badge */}
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {item.typeBadge}
                    </span>

                    {/* Date */}
                    <span className="text-xs font-medium text-slate-500 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  {/* Main relationship / event */}
                  <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                    <span>{item.mainRelationship}</span>
                  </div>

                  {/* Confidence score */}
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-[#1b7a70]">
                    <span className="w-2 h-2 rounded-full bg-[#45BAAC]"></span>
                    <span>Confidence: {item.confidence}%</span>
                  </div>
                </div>

                {/* Right Action: View Details */}
                <div className="flex items-center md:justify-end shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <button
                    id={`btn-view-details-${item.id}`}
                    onClick={() => setActiveModalEvidence(item)}
                    className="w-full md:w-auto px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer hover:border-slate-300"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL: DETAILED EVIDENCE INSPECTOR                                     */}
      {/* ========================================================================= */}
      {activeModalEvidence && (
        <div
          id="evidence-details-modal-backdrop"
          onClick={() => setActiveModalEvidence(null)}
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
        >
          <div
            id="evidence-details-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-base font-black text-[#C53A4F]">
                    {activeModalEvidence.id}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {activeModalEvidence.typeBadge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {caseInfo.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeModalEvidence.mainRelationship}
                </h3>
              </div>

              <button
                id="btn-close-evidence-modal"
                onClick={() => setActiveModalEvidence(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Forensic Metadata */}
            <div className="space-y-5">
              {/* Type, Date, Integrity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Evidence Type
                  </span>
                  <div className="text-xs font-bold text-slate-800">
                    {activeModalEvidence.typeName}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Date & Timestamp
                  </span>
                  <div className="text-xs font-bold text-slate-800">
                    {activeModalEvidence.fullDate}
                  </div>
                </div>
              </div>

              {/* Entities Involved */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Entities Involved
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModalEvidence.entities.map((ent, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (onSelectEntity) {
                          onSelectEntity(ent);
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#C53A4F]/10 hover:text-[#C53A4F] text-slate-800 text-xs font-mono font-bold border border-slate-200 transition cursor-pointer"
                    >
                      {ent}
                    </button>
                  ))}
                </div>
              </div>

              {/* Raw Record Monospace Block */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Raw Record / Intercept Telemetry
                </span>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                  {activeModalEvidence.rawRecord}
                </pre>
              </div>

              {/* Source & Integrity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Forensic Source
                  </span>
                  <div className="text-xs font-medium text-slate-700 leading-snug">
                    {activeModalEvidence.source}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Integrity Status
                  </span>
                  <div className="text-xs font-bold text-[#1b7a70] flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#45BAAC]" />
                    <span>{activeModalEvidence.integrity}</span>
                  </div>
                </div>
              </div>

              {/* Why this evidence matters */}
              <div className="p-4 rounded-xl bg-[#9A6599]/10 border border-[#9A6599]/20 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#9A6599] uppercase tracking-wide">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Why this evidence matters</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {activeModalEvidence.whyItMatters}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Case: {caseInfo.id} • Sec 65B Admissible
              </span>
              <button
                onClick={() => setActiveModalEvidence(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
