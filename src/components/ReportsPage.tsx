import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Network,
  Clock,
  FileCheck2,
  Sparkles,
  ExternalLink,
  Shield
} from 'lucide-react';
import { InvestigationCase, Entity, Relationship, Evidence, Finding } from '../types';
import { truncateHash } from '../utils';

interface ReportsPageProps {
  caseData: InvestigationCase;
  entities: Entity[];
  relationships: Relationship[];
  evidence: Evidence[];
  findings: Finding[];
}

export const ReportsPage: React.FC<ReportsPageProps> = ({
  caseData,
  entities,
  relationships,
  evidence,
  findings
}) => {
  const [activeSection, setActiveSection] = useState<'SUMMARY' | 'NETWORK' | 'TIMELINE' | 'EVIDENCE' | 'FINDINGS'>('SUMMARY');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white border border-slate-200 rounded-md p-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#45baac] uppercase font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>STAGE 05 • LEGAL DOSSIER COMPILER</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            INVESTIGATION REPORT WORKSPACE
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate Section 91 CrPC compliant intelligence briefs and court-ready evidence dossiers.
          </p>
        </div>

        {/* Primary Report Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-3 py-1.5 rounded bg-[#45baac] hover:bg-[#389d91] text-white font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
          >
            <span>{isGenerating ? 'GENERATING...' : 'GENERATE REPORT'}</span>
          </button>
          <button
            onClick={() => setActiveSection('SUMMARY')}
            className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            PREVIEW
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 text-[#45baac] border border-[#45baac]/40 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT PDF</span>
          </button>
        </div>
      </div>

      {/* Split Report Workspace: Left Sections / Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ================= LEFT SIDE: REPORT SECTIONS ================= */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-md p-4 shadow-sm space-y-3">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold pb-2 border-b border-slate-200">
            DOSSIER MODULES
          </div>

          {/* 1. CASE SUMMARY */}
          <div
            onClick={() => setActiveSection('SUMMARY')}
            className={`p-3 rounded border transition cursor-pointer ${
              activeSection === 'SUMMARY'
                ? 'bg-[#45baac]/10 border-[#45baac]'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#45baac]" />
                <span className="font-bold text-xs text-slate-900">CASE SUMMARY</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">READY</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              FIR details, investigating officer notes, and division assignment.
            </p>
          </div>

          {/* 2. NETWORK */}
          <div
            onClick={() => setActiveSection('NETWORK')}
            className={`p-3 rounded border transition cursor-pointer ${
              activeSection === 'NETWORK'
                ? 'bg-[#45baac]/10 border-[#45baac]'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-xs text-slate-900">NETWORK</span>
              </div>
              <span className="text-[10px] font-mono text-[#45baac] font-semibold">24 NODES</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Topological matrix, betweenness centrality, and key conduit mapping.
            </p>
          </div>

          {/* 3. TIMELINE */}
          <div
            onClick={() => setActiveSection('TIMELINE')}
            className={`p-3 rounded border transition cursor-pointer ${
              activeSection === 'TIMELINE'
                ? 'bg-[#45baac]/10 border-[#45baac]'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-xs text-slate-900">TIMELINE</span>
              </div>
              <span className="text-[10px] font-mono text-[#45baac] font-semibold">14-16 JUN</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Synchronized CDR bursts, bank fund clearing, and location sightings.
            </p>
          </div>

          {/* 4. EVIDENCE */}
          <div
            onClick={() => setActiveSection('EVIDENCE')}
            className={`p-3 rounded border transition cursor-pointer ${
              activeSection === 'EVIDENCE'
                ? 'bg-[#45baac]/10 border-[#45baac]'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs text-slate-900">EVIDENCE</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">18 VERIFIED</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Cryptographic hashes, Section 65B custody log, and telecom dockets.
            </p>
          </div>

          {/* 5. FINDINGS */}
          <div
            onClick={() => setActiveSection('FINDINGS')}
            className={`p-3 rounded border transition cursor-pointer ${
              activeSection === 'FINDINGS'
                ? 'bg-[#45baac]/10 border-[#45baac]'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-xs text-slate-900">FINDINGS</span>
              </div>
              <span className="text-[10px] font-mono text-[#45baac] font-semibold">LEADS</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              AI-generated hypothesis testing with human verification records.
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE: REPORT PREVIEW ================= */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-md p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                OFFICIAL INTELLIGENCE DOSSIER
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                REPORT PREVIEW • CASE-26189-001
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
              NCRB REVIEW COMPLIANT
            </span>
          </div>

          {/* Official Letterhead Header */}
          <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-200 pb-2 text-slate-500 font-medium">
              <span>MINISTRY OF HOME AFFAIRS</span>
              <span>NCRB WOMEN SAFETY DIVISION</span>
            </div>
            <div className="flex justify-between text-slate-900">
              <div>
                <div className="font-bold">CASE ID: CASE-26189-001</div>
                <div>FIR NO: FIR-2024-412 (Pune Rural)</div>
              </div>
              <div className="text-right">
                <div>DATE: 16 JUN 2026</div>
                <div>OFFICER: Insp. Vikram Rathod (ID #4412)</div>
              </div>
            </div>
          </div>

          {/* Report Body Content Preview */}
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-sm text-[#45baac] uppercase tracking-wider">
                1. Executive Investigation Brief
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Analysis of the fragmented multi-modal evidence across 14,820 CDR records, 12 banking entities, and 34 optical ANPR sightings reveals an organized network operating across Pune District. Arjun Mehta functions as the primary operational coordinator, while Neha Patil acts as betweenness intermediary channeling funds through Company Alpha Ltd.
              </p>
            </div>

            <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-sm text-[#45baac] uppercase tracking-wider">
                2. Key Network Intermediaries & Structural Influence
              </h3>
              <div className="space-y-1 text-slate-600">
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-900 font-semibold">Arjun Mehta (ENT-P-01)</span>
                  <span>Hub Centrality: 0.88 • Mastermind / Coordinator</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-900 font-semibold">Neha Patil (ENT-P-02)</span>
                  <span>Betweenness: 0.92 • Financial Conduit & Shell Liaison</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-900 font-semibold">Sameer Shah (ENT-P-04)</span>
                  <span>Closeness: 0.74 • Field Logistics & Burner Relay</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-sm text-[#45baac] uppercase tracking-wider">
                3. Section 65B Cryptographic Audit Evidence
              </h3>
              <div className="space-y-1 font-mono text-[11px] text-slate-600">
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-[#45baac] font-bold">EVD-CDR-104 (Airtel Dump)</span>
                  <span>SHA256: 8a4c1f7b...e3d2 (Verified)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-[#45baac] font-bold">EVD-FIN-201 (Axis Bank STR)</span>
                  <span>SHA256: c3b9a102...9f4a (Verified)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
