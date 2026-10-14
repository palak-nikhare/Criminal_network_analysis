import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Network,
  Users,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  ChevronRight,
  FileText,
  RotateCcw,
  Lock,
  Building2,
  HelpCircle
} from 'lucide-react';
import { InvestigationCase, Entity, Relationship, Evidence, TimelineEvent } from '../types';
import { CaseOption, AVAILABLE_CASES } from '../data/casesDataset';

interface InvestigateCrimePageProps {
  caseData: InvestigationCase;
  entities: Entity[];
  relationships: Relationship[];
  evidence: Evidence[];
  timelineEvents: TimelineEvent[];
  onOpenNetwork: () => void;
  onSelectEntity: (entityId: string) => void;
  caseInfo?: CaseOption;
  onChangeCase?: (caseId: string) => void;
}

interface MockCaseOption {
  id: string;
  code: string;
  title: string;
  city: 'Pune' | 'Mumbai' | 'Delhi';
  status: string;
  entitiesCount: number;
}

const MOCK_CASES_BY_CITY: Record<string, MockCaseOption[]> = {
  Pune: [
    {
      id: 'FIR-2026-089',
      code: 'FIR-2026-089',
      title: 'Cyber Crime Investigation',
      city: 'Pune',
      status: 'Evidence Corroboration',
      entitiesCount: 9
    }
  ],
  Mumbai: [
    {
      id: 'FIR-2026-102',
      code: 'FIR-2026-102',
      title: 'Coastal Hawala & Port Smuggling Ring',
      city: 'Mumbai',
      status: 'Active Investigation',
      entitiesCount: 7
    }
  ],
  Delhi: [
    {
      id: 'FIR-2026-115',
      code: 'FIR-2026-115',
      title: 'NCR Cyber Extortion & Peeling Chain Syndicate',
      city: 'Delhi',
      status: 'Active Investigation',
      entitiesCount: 7
    }
  ]
};

const INVESTIGATION_QUERIES = [
  'Identify key persons in the network',
  'Find connections between suspects',
  'Trace phone and financial relationships',
  'Discover hidden links',
  'View investigation timeline',
  'Find important locations',
  'Generate investigation summary'
];

export const InvestigateCrimePage: React.FC<InvestigateCrimePageProps> = ({
  caseData,
  entities,
  relationships,
  evidence,
  timelineEvents,
  onOpenNetwork,
  onSelectEntity,
  caseInfo,
  onChangeCase
}) => {
  // State 1 vs State 2: Initially FALSE, never preload analysis
  const [hasInvestigated, setHasInvestigated] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Selector state for State 1
  const [selectedCity, setSelectedCity] = useState<'Pune' | 'Mumbai' | 'Delhi'>(
    (caseInfo?.city as 'Pune' | 'Mumbai' | 'Delhi') || 'Pune'
  );
  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseInfo?.id || 'FIR-2026-089');
  const [selectedQuery, setSelectedQuery] = useState<string>('Identify key persons in the network');

  // Frozen Read-Only Investigation Context for State 2
  const [frozenContext, setFrozenContext] = useState<{
    city: 'Pune' | 'Mumbai' | 'Delhi';
    caseOption: MockCaseOption;
    query: string;
  } | null>(null);

  // Reset State 1 whenever the global case changes
  React.useEffect(() => {
    if (caseInfo) {
      setSelectedCity(caseInfo.city as 'Pune' | 'Mumbai' | 'Delhi');
      setSelectedCaseId(caseInfo.id);
      setHasInvestigated(false);
      setFrozenContext(null);
    }
  }, [caseInfo?.id]);

  const availableCases = MOCK_CASES_BY_CITY[selectedCity] || [];
  const currentCase = availableCases.find(c => c.id === selectedCaseId) || availableCases[0] || {
    id: selectedCaseId,
    code: selectedCaseId,
    title: caseInfo?.title || 'Active Investigation',
    city: selectedCity,
    status: 'Active',
    entitiesCount: entities.length
  };

  const handleCityChange = (city: 'Pune' | 'Mumbai' | 'Delhi') => {
    setSelectedCity(city);
    const newCases = MOCK_CASES_BY_CITY[city] || [];
    if (newCases.length > 0) {
      setSelectedCaseId(newCases[0].id);
      if (onChangeCase) {
        onChangeCase(newCases[0].id);
      }
    }
  };

  const handleInvestigate = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Freeze the context so it becomes read-only
      setFrozenContext({
        city: selectedCity,
        caseOption: currentCase,
        query: selectedQuery
      });
      setIsAnalyzing(false);
      setHasInvestigated(true);
    }, 450);
  };

  const handleStartNewInvestigation = () => {
    // Reset to State 1
    setHasInvestigated(false);
    setFrozenContext(null);
  };

  return (
    <div className="space-y-12 pb-24 max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* SECTION: PAGE TITLE & OVERVIEW                                           */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#9A6599]/10 border border-[#9A6599]/20 text-[#9A6599] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Intelligence Engine</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Crime Investigator
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
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Select an analytical inquiry to synthesize multi-source criminal network intelligence for {caseInfo ? `${caseInfo.id} (${caseInfo.city})` : 'the active case'}.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: INVESTIGATION CONTEXT / SELECTION CONTROLS                        */}
      {/* STATE 1: Interactive Selectors | STATE 2: Read-Only Context Card           */}
      {/* ========================================================================= */}
      {!hasInvestigated ? (
        /* STATE 1 — BEFORE INVESTIGATION */
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Investigation Context Selection
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Choose the target city, case record, and specific analysis query before initiating synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* City Selector */}
            <div className="space-y-2">
              <label htmlFor="investigate-city-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                City
              </label>
              <select
                id="investigate-city-select"
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value as 'Pune' | 'Mumbai' | 'Delhi')}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:border-[#C53A4F] focus:bg-white transition cursor-pointer"
              >
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            {/* Case Selector */}
            <div className="space-y-2">
              <label htmlFor="investigate-case-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Case
              </label>
              <select
                id="investigate-case-select"
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:border-[#C53A4F] focus:bg-white transition cursor-pointer"
              >
                {availableCases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Investigation Query Selector */}
            <div className="space-y-2">
              <label htmlFor="investigate-query-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Investigation Query
              </label>
              <select
                id="investigate-query-select"
                value={selectedQuery}
                onChange={(e) => setSelectedQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:border-[#C53A4F] focus:bg-white transition cursor-pointer"
              >
                {INVESTIGATION_QUERIES.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Investigate Action Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center space-x-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#45BAAC]" />
              <span>Targeting verified evidence artifacts & network nodes</span>
            </div>

            <button
              id="investigate-submit-btn"
              onClick={handleInvestigate}
              disabled={isAnalyzing}
              className="px-7 py-3 rounded-lg bg-[#C53A4F] hover:bg-[#a82b3d] text-white text-sm font-bold shadow-xs hover:shadow transition flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Synthesizing Network Intelligence...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Investigate</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* STATE 2 — FIXED AND READ-ONLY INVESTIGATION CONTEXT CARD */
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-md bg-slate-100 text-slate-700">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Analysis Context — Read Only
                </span>
                <p className="text-[11px] text-slate-500">
                  Parameters are locked to preserve analytical reproducibility for this report.
                </p>
              </div>
            </div>

            {/* Start New Investigation subtle action */}
            <button
              id="investigate-start-new-btn"
              onClick={handleStartNewInvestigation}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold transition cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Start New Investigation</span>
            </button>
          </div>

          {/* Read-Only Context Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Case Block */}
            <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Case Under Analysis
              </span>
              <div className="font-mono text-base font-bold text-[#C53A4F]">
                {frozenContext?.caseOption.code || 'FIR-2026-089'}
              </div>
              <div className="text-xs font-medium text-slate-700">
                {frozenContext?.caseOption.title || 'Cyber Crime Investigation'}
              </div>
            </div>

            {/* City Block */}
            <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                City
              </span>
              <div className="text-base font-bold text-slate-900 flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-[#45BAAC]" />
                <span>{frozenContext?.city || 'Pune'}</span>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Jurisdiction Authority: MH State Police
              </div>
            </div>

            {/* Investigation Query Block */}
            <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Investigation Query
              </span>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {frozenContext?.query || 'Identify key persons in the network'}
              </div>
              <div className="text-[11px] text-[#9A6599] font-medium font-mono">
                Graph Neural Inference
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LOWER SECTION:                                                           */}
      {/* STATE 1: Empty-state message                                             */}
      {/* STATE 2: AI INVESTIGATION INTELLIGENCE REPORT                            */}
      {/* ========================================================================= */}
      {!hasInvestigated ? (
        /* SUBTLE EMPTY STATE MESSAGE */
        <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-sm text-slate-600 font-medium">
            Select an investigation and click Investigate to generate AI-powered analysis.
          </p>
          <p className="text-xs text-slate-400 font-mono">
            Analysis records will render with Sec 65B evidential admissibility.
          </p>
        </div>
      ) : (
        /* STATE 2 — STRUCTURED AI INVESTIGATION INTELLIGENCE REPORT */
        <div className="space-y-12">
          {/* Section Divider with generous vertical separation */}
          <div className="relative flex items-center py-4">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink mx-4 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#9A6599]/10 text-[#9A6599] border border-[#9A6599]/20 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Investigation Intelligence Report</span>
            </span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 1. INVESTIGATION SUMMARY                                              */}
          {/* --------------------------------------------------------------------- */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#9A6599] uppercase font-bold tracking-wider pb-2 border-b border-slate-100">
              <FileText className="w-4 h-4" />
              <span>1. Investigation Summary</span>
            </div>

            <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 pt-1">
              {frozenContext?.city === 'Mumbai' ? (
                <p>
                  Topological graph intelligence for <strong className="text-slate-900 font-bold">{frozenContext?.caseOption.code} ({frozenContext?.city})</strong> reveals an offshore hawala transit conduit routed through Ferry Wharf berths to unrecorded shell accounts in Bandra. Target suspect <strong className="text-slate-900 font-bold">Tariq Merchant (ENT-MUM-P-01)</strong> functions as coordinating hub for maritime consignments, liquidating ₹45,00,000 via informal slip tokens through courier agent <strong className="text-slate-900 font-bold">Farooq Chhota</strong>.
                </p>
              ) : frozenContext?.city === 'Delhi' ? (
                <p>
                  Network analysis for <strong className="text-slate-900 font-bold">{frozenContext?.caseOption.code} ({frozenContext?.city})</strong> flags an automated cyber extortion and VoIP dialing ring operating out of Cyber City. Target suspect <strong className="text-slate-900 font-bold">Kunal Verma (ENT-DEL-P-01)</strong> channels 50,000 USDT in crypto extortion ransoms through 4 peeling-chain mixing hops to domestic liquidation accounts managed by <strong className="text-slate-900 font-bold">Deepak Joshi</strong>.
                </p>
              ) : (
                <>
                  {frozenContext?.query === 'Identify key persons in the network' && (
                    <p>
                      Topological betweenness analysis identifies <strong className="text-slate-900 font-bold">Arjun Mehta (ENT-P-01)</strong> as the primary connector with highest network influence (betweenness centrality: 0.88), bridging telecommunication operations to shell banking vehicles. <strong className="text-slate-900 font-bold">Neha Patil (ENT-P-02)</strong> acts as an analytical financial broker managing account liquidity, while <strong className="text-slate-900 font-bold">Sameer Shah (ENT-P-04)</strong> handles burner telecommunication devices in the field.
                    </p>
                  )}
                  {frozenContext?.query === 'Find connections between suspects' && (
                    <p>
                      Cross-modal correlation reveals a direct coordination triad between <strong className="text-slate-900 font-bold">Arjun Mehta</strong>, <strong className="text-slate-900 font-bold">Sameer Shah</strong>, and <strong className="text-slate-900 font-bold">Neha Patil</strong>. 42 voice calls over 7 days coincided with physical co-presence at the Pune Camp Rendezvous, followed by an immediate ₹18,50,000 fund dispersion into intermediary accounts.
                    </p>
                  )}
                  {frozenContext?.query === 'Trace phone and financial relationships' && (
                    <p>
                      Financial traces confirm <strong className="text-slate-900 font-bold">ACC-201 (Rohan Kulkarni)</strong> dispatched ₹18,50,000 via transaction TX-221 into <strong className="text-slate-900 font-bold">ACC-202 (Neha Patil)</strong> within 120 seconds of a 14-minute call from registered mobile <strong className="text-slate-900 font-bold">Phone-101</strong> to burner SIM <strong className="text-slate-900 font-bold">Phone-102</strong>.
                    </p>
                  )}
                  {frozenContext?.query === 'Discover hidden links' && (
                    <p>
                      Identity resolution algorithms flagged alias <strong className="text-slate-900 font-bold">"Rahul Sharma"</strong> as 94% probable match to <strong className="text-slate-900 font-bold">Arjun Mehta</strong> due to shared IMEI telemetry on Phone-101 and identical cell-tower dwell times at Pune Camp. Furthermore, <strong className="text-slate-900 font-bold">Company Alpha Ltd</strong> shares corporate lease signatories with suspect accounts.
                    </p>
                  )}
                  {frozenContext?.query === 'View investigation timeline' && (
                    <p>
                      Chronological reconstruction indicates a 5-day cycle: Initial KYC handset activation on 10 June, progressive communication spike on 12 June (42 calls), physical rendezvous at Pune Camp on 14 June (ANPR verified), culminating in fund dispersal on 15 June 10:05 AM.
                    </p>
                  )}
                  {frozenContext?.query === 'Find important locations' && (
                    <p>
                      Spatial clustering confirms <strong className="text-slate-900 font-bold">Pune Camp Commercial Sector</strong> is the primary co-location rendezvous point with 4 linked entities and 94% co-presence confidence. Secondary hotspots include <strong className="text-slate-900 font-bold">Baner Tech Hub</strong> (corporate shell registration) and <strong className="text-slate-900 font-bold">Shivajinagar Transit Hub</strong>.
                    </p>
                  )}
                  {frozenContext?.query === 'Generate investigation summary' && (
                    <p>
                      Comprehensive intelligence synthesis for <strong className="text-slate-900 font-bold">{frozenContext?.caseOption.code}</strong> confirms a multi-layered financial syndicate operating across Pune and Mumbai. The network deploys burner SIM rotations to shield high-velocity hawala remittances channeled through shell enterprise Company Alpha Ltd. Evidence chain complies with Sec 65B hash verification.
                    </p>
                  )}
                </>
              )}
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* 2. KEY ENTITIES                                                       */}
          {/* --------------------------------------------------------------------- */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#C53A4F] uppercase font-bold tracking-wider">
                <Users className="w-4 h-4" />
                <span>2. Key Entities</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Ranked by Topological Centrality
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {entities.slice(0, 3).map((entity) => (
                <div
                  key={entity.id}
                  onClick={() => {
                    onSelectEntity(entity.id);
                    onOpenNetwork();
                  }}
                  className="p-5 rounded-xl border border-slate-200 hover:border-[#C53A4F] bg-slate-50/50 hover:bg-white transition cursor-pointer group shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                      {entity.id}
                    </span>
                    <span className="text-xs font-mono text-[#C53A4F] font-bold">
                      {entity.confidence}% Conf.
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-base text-slate-900 group-hover:text-[#C53A4F] transition-colors">
                      {entity.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {entity.role || 'Network Participant'}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{entity.connectedCount || 4} Connections</span>
                    <span className="text-[#45BAAC] font-semibold group-hover:underline flex items-center">
                      Inspect <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* 3. IMPORTANT RELATIONSHIPS                                            */}
          {/* --------------------------------------------------------------------- */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-800 uppercase font-bold tracking-wider pb-3 border-b border-slate-100">
              <Network className="w-4 h-4 text-[#9A6599]" />
              <span>3. Important Relationships</span>
            </div>

            <div className="space-y-3">
              {relationships.slice(0, 3).map((rel) => {
                const sourceEntity = entities.find(e => e.id === rel.source);
                const targetEntity = entities.find(e => e.id === rel.target);
                return (
                  <div
                    key={rel.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2 font-medium text-slate-900 text-sm">
                        <span className="font-bold">{sourceEntity?.name || rel.source}</span>
                        <span className="px-2 py-0.5 rounded bg-[#C53A4F]/10 text-[#C53A4F] font-mono text-[10px] font-bold">
                          {rel.type}
                        </span>
                        <span className="font-bold">{targetEntity?.name || rel.target}</span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {rel.explanation}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 self-start sm:self-center">
                      <span className="font-mono text-xs text-slate-500">
                        {rel.confidence}% Corroborated
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#45BAAC]/10 text-[#45BAAC] border border-[#45BAAC]/30 font-mono text-[10px] font-bold">
                        {rel.verificationStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* 4. EVIDENCE SUPPORT                                                   */}
          {/* --------------------------------------------------------------------- */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#45BAAC] uppercase font-bold tracking-wider">
                <FileCheck2 className="w-4 h-4" />
                <span>4. Evidence Support</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                Sec 65B Indian Evidence Act Compliant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidence.slice(0, 2).map((ev) => (
                <div key={ev.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-slate-900">{ev.id}</span>
                    <span className="px-2 py-0.5 rounded bg-white text-[#45BAAC] border border-slate-200 font-mono text-[10px] font-bold">
                      {ev.sourceType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{ev.rawSnippet}"
                  </p>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="truncate max-w-[200px]">SHA-256: {ev.integrityHash}</span>
                    <span className="text-[#45BAAC] font-bold">{ev.confidence}% Confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* BOTTOM ACTION: OPEN NETWORK ANALYSIS                                  */}
          {/* --------------------------------------------------------------------- */}
          <div className="pt-4 flex justify-center">
            <button
              id="investigate-bottom-open-network-btn"
              onClick={onOpenNetwork}
              className="px-8 py-3.5 rounded-xl bg-[#45BAAC] hover:bg-[#38a295] text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center space-x-2.5 cursor-pointer"
            >
              <Network className="w-4 h-4" />
              <span>Open Network Analysis</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
