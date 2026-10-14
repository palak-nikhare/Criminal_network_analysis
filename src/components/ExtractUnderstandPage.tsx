import React, { useState } from 'react';
import {
  FileSearch,
  Upload,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Layers,
  FileText,
  AlertCircle,
  Lock,
  Plus,
  Network
} from 'lucide-react';
import { IngestedDocument, EntityType } from '../types';
import { getEntityTypeColor } from '../utils';

interface ExtractUnderstandPageProps {
  ingestedDocs: IngestedDocument[];
  onIngestText: (doc: { title: string; sourceType: any; text: string; courtWarrantOrAuthId: string }) => void;
  onNavigateTab: (tab: string) => void;
}

export const ExtractUnderstandPage: React.FC<ExtractUnderstandPageProps> = ({
  ingestedDocs,
  onIngestText,
  onNavigateTab
}) => {
  const [docTitle, setDocTitle] = useState('Cyber Cell Supplementary FIR Note');
  const [sourceType, setSourceType] = useState('FIR');
  const [courtWarrantId, setCourtWarrantId] = useState('AUTH-NCRB-2026-WSD-881');
  const [rawText, setRawText] = useState(
    'Rahul Sharma used phone number +91-98231-XXXX2 and visited Pune Camp on 14 June. Fund transfers were coordinated through Axis Bank account ACC-201 registered under Company Alpha Ltd, with secondary liaison managed by Neha Patil in Baner.'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  // Pre-configured synthetic investigation templates for quick demonstration
  const sampleTemplates = [
    {
      label: 'Sample FIR Text (Extortion Syndicate)',
      type: 'FIR',
      title: 'FIR No. 089/2026 Complaint Supplement',
      auth: 'AUTH-MH-PNE-2026-4018',
      text: 'Complainant Priya Verma reported repeated coercive phone calls originating from mobile number +91-98231-XXXX2 demanding extortion payments to Axis Bank account ACC-201. Primary suspect referenced as Rahul Sharma alias Arjun Mehta, reportedly seen meeting associates at Pune Camp commercial complex.'
    },
    {
      label: 'Sample Surveillance & ANPR Report',
      type: 'SURVEILLANCE_REPORT',
      title: 'Special Branch Surveillance Log #SB-44',
      auth: 'AUTH-MH-PNE-2026-4022',
      text: 'On 14 June at 16:30 IST, silver SUV vehicle MH-12-AB-1234 registered to Company Alpha Ltd was observed departing Baner towards Pune Camp. Driver matched facial telemetry for Arjun Mehta. Telecommunications runner Sameer Shah using Phone-102 arrived on foot 15 minutes later.'
    },
    {
      label: 'Sample Financial Transaction Ledger',
      type: 'FINANCIAL_RECORD',
      title: 'Axis Bank High Velocity STR #TX-881',
      auth: 'AUTH-FIU-IND-2026-091',
      text: 'Account ACC-201 registered to Company Alpha Ltd debited INR 18,50,000 on 13 June via IMPS to HDFC Account ACC-202 held by Neha Patil in Baner branch. Authorized director on mandate is Rohan Kulkarni.'
    }
  ];

  const handleApplyTemplate = (tpl: typeof sampleTemplates[0]) => {
    setDocTitle(tpl.title);
    setSourceType(tpl.type);
    setCourtWarrantId(tpl.auth);
    setRawText(tpl.text);
  };

  const handleRunPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsProcessing(true);
    setPipelineStep(1);

    // Step through pipeline visual stages
    setTimeout(() => setPipelineStep(2), 300);
    setTimeout(() => setPipelineStep(3), 600);
    setTimeout(() => setPipelineStep(4), 900);
    setTimeout(() => {
      setPipelineStep(5);
      setIsProcessing(false);
      onIngestText({
        title: docTitle,
        sourceType,
        text: rawText,
        courtWarrantOrAuthId: courtWarrantId
      });
    }, 1200);
  };

  const pipelineStages = [
    { num: '01', name: 'INPUT DOCUMENT', desc: 'Secure Legal Gate Verification' },
    { num: '02', name: 'TEXT / OCR EXTRACTION', desc: 'Noise cleaning & tokenization' },
    { num: '03', name: 'ENTITY DETECTION', desc: 'Named Entity Recognition (NER)' },
    { num: '04', name: 'RELATIONSHIP EXTRACTION', desc: 'Semantic triple mining' },
    { num: '05', name: 'ENTITY RESOLUTION', desc: 'Graph & Vector deduplication' },
    { num: '06', name: 'STRUCTURED DATA', desc: 'Connected Knowledge Store' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#45baac]/10 text-[#45baac] border border-[#45baac]/30 font-bold">
                STAGE 01
              </span>
              <span className="text-xs text-slate-500">
                Data Ingestion & Entity Resolution Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Extract & Understand Fragmented Investigation Records
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl mt-1 leading-relaxed">
              Ingest unstructured FIR narratives, CDR telecom dumps, surveillance memos, or financial logs. The AI pipeline detects entities, identifies relationship triples, and normalizes them into structured investigation nodes under human verification.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[11px] font-mono px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center space-x-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Legal Gate Active: Section 91 Compliant</span>
            </span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs">
        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-1.5 font-bold">
          <Cpu className="w-3.5 h-3.5 text-[#45baac]" />
          <span>AI Processing & Entity Resolution Pipeline</span>
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {pipelineStages.map((st, i) => {
            const stepNum = i + 1;
            const isDone = pipelineStep >= stepNum;
            const isCurrent = pipelineStep === stepNum && isProcessing;

            return (
              <div
                key={st.num}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? 'bg-[#45baac]/10 border-[#45baac] ring-1 ring-[#45baac]'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400">{st.num}</span>
                  {isDone && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                </div>
                <div className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                  {st.name}
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Ingestion Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-[#45baac]" />
              <span>Document Data Ingestion Console</span>
            </h3>

            {/* Quick load template buttons */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-500 text-[11px]">Load Sample:</span>
              <button
                type="button"
                onClick={() => handleApplyTemplate(sampleTemplates[0])}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[#45baac] text-[10px] font-mono border border-slate-200 font-semibold cursor-pointer"
              >
                FIR
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate(sampleTemplates[1])}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-purple-700 text-[10px] font-mono border border-slate-200 font-semibold cursor-pointer"
              >
                ANPR
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate(sampleTemplates[2])}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-emerald-700 text-[10px] font-mono border border-slate-200 font-semibold cursor-pointer"
              >
                Banking
              </button>
            </div>
          </div>

          <form onSubmit={handleRunPipeline} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Document Title / Identifier
                </label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#45baac]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Source Category
                </label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#45baac]"
                >
                  <option value="FIR">FIR (First Information Report)</option>
                  <option value="CDR">CDR (Call Detail Records)</option>
                  <option value="FINANCIAL_RECORD">Financial Transaction Record</option>
                  <option value="LOCATION_RECORD">Location / Cell-Tower Triangulation</option>
                  <option value="SURVEILLANCE_REPORT">Surveillance & ANPR Report</option>
                  <option value="INVESTIGATION_NOTE">Investigator Supplementary Note</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Legal Authorization / Warrant Reference (Legal Gate)
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
                <input
                  type="text"
                  required
                  value={courtWarrantId}
                  onChange={(e) => setCourtWarrantId(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#45baac] font-mono"
                  placeholder="e.g. AUTH-NCRB-2026-WSD-881"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Mandatory legal clearance protocol: Unverified warrants are redirected to quarantine.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Raw Unstructured Investigation Text / Record Dump
              </label>
              <textarea
                rows={5}
                required
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#45baac] font-mono leading-relaxed"
                placeholder="Paste FIR narration, phone call snippets, bank accounts, or surveillance transcripts..."
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                Synthetic Benchmark Ingestion • SIH 2026
              </span>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2 rounded-lg bg-[#45baac] hover:bg-[#389d91] text-white font-semibold text-xs shadow-sm flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Executing AI Extraction...' : 'Process Document with AI Pipeline'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Highlighted Extraction & Entity Chips Preview (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#45baac]" />
                <span>Real-Time Entity Detection & Semantic Chips</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                NER Active
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              The AI highlights detected entities in color-coded categories according to intelligence schema:
            </p>

            {/* Color Legend */}
            <div className="flex flex-wrap gap-1.5 mb-4 text-[10px] font-mono font-medium">
              <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">PERSON</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">PHONE</span>
              <span className="px-2 py-0.5 rounded bg-green-50 text-green-800 border border-green-200">ACCOUNT</span>
              <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200">LOCATION</span>
              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">VEHICLE</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">ORGANIZATION</span>
            </div>

            {/* Extracted Entity Chips from Latest Document */}
            {ingestedDocs.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span>Extracted from: {ingestedDocs[0].title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{ingestedDocs[0].courtWarrantOrAuthId}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {ingestedDocs[0].entities.map((ent, idx) => {
                    const colors = getEntityTypeColor(ent.type);
                    return (
                      <div
                        key={idx}
                        className={`px-2.5 py-1.5 rounded-lg border ${colors.bg} ${colors.border} flex items-center space-x-2 shadow-xs`}
                      >
                        <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: colors.dot }} />
                        <span className="text-xs font-medium text-slate-800">{ent.text}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/80 text-slate-700 border border-slate-200 font-semibold">
                          {ent.type}
                        </span>
                        <span className="text-[9px] font-mono text-[#45baac] font-bold">
                          {ent.confidence}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Extracted relationships */}
                {ingestedDocs[0].relationships && ingestedDocs[0].relationships.length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">
                      Extracted Relationship Triples:
                    </div>
                    <div className="space-y-1.5">
                      {ingestedDocs[0].relationships.map((rel, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-2 rounded bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-800"
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span className="font-semibold text-[#45baac]">{rel.source}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              {rel.type}
                            </span>
                            <span className="font-semibold text-emerald-700">{rel.target}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#45baac] font-bold shrink-0">
                            {rel.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">Total Ingested Dossiers: <strong className="text-slate-900 font-mono">{ingestedDocs.length}</strong></span>
            <button
              onClick={() => onNavigateTab('connect')}
              className="text-[#45baac] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>View Connected Evidence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
