import React, { useState, useEffect, useMemo } from 'react';
import { HomePage } from './components/HomePage';
import { InvestigateCrimePage } from './components/InvestigateCrimePage';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { InvestigationDashboard } from './components/InvestigationDashboard';
import { CaseWorkspacePage } from './components/CaseWorkspacePage';
import { ExtractUnderstandPage } from './components/ExtractUnderstandPage';
import { ConnectEvidencePage } from './components/ConnectEvidencePage';
import { NetworkAnalysisPage } from './components/NetworkAnalysisPage';
import { HiddenLinksPage } from './components/HiddenLinksPage';
import { TimelinePage } from './components/TimelinePage';
import { LocationsPage } from './components/LocationsPage';
import { AIAssistantPage } from './components/AIAssistantPage';
import { ReportsPage } from './components/ReportsPage';
import { AuditLogsPage } from './components/AuditLogsPage';
import { ArchitecturePage } from './components/ArchitecturePage';
import { CaseSelectionView } from './components/CaseSelectionView';
import { CaseContextBar } from './components/CaseContextBar';
import { AVAILABLE_CASES, CASE_BUNDLES, CaseOption } from './data/casesDataset';

import {
  MOCK_CASE,
  MOCK_ENTITIES,
  MOCK_RELATIONSHIPS,
  MOCK_EVIDENCE,
  MOCK_TIMELINE,
  MOCK_ALIAS_RESOLUTIONS,
  MOCK_ANOMALIES,
  MOCK_FINDINGS,
  MOCK_AUDIT_LOGS,
  MOCK_INGESTED_DOCUMENTS
} from './data/mockInvestigationData';

import {
  InvestigationCase,
  Entity,
  Relationship,
  Evidence,
  TimelineEvent,
  AliasResolution,
  AnomalyAlert,
  Finding,
  AuditLogEntry,
  IngestedDocument,
  UserSession
} from './types';

// Case-dependent tabs requiring prior case selection
const CASE_DEPENDENT_TABS = [
  'connect',
  'network',
  'timeline',
  'locations',
  'hidden',
  'investigate',
  'dashboard',
  'case',
  'reports'
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected Case ID state - initially null so user must choose a case before viewing case data
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const isCaseDependentTab = CASE_DEPENDENT_TABS.includes(activeTab);

  // Active Case Option
  const activeCaseOption: CaseOption | null = useMemo(() => {
    if (!selectedCaseId) return null;
    return AVAILABLE_CASES.find((c) => c.id === selectedCaseId) || null;
  }, [selectedCaseId]);

  // Active Case Bundle containing isolated case data
  const activeBundle = useMemo(() => {
    if (!selectedCaseId) return null;
    return CASE_BUNDLES[selectedCaseId] || CASE_BUNDLES['FIR-2026-089'];
  }, [selectedCaseId]);

  // Core domain state
  const [caseData, setCaseData] = useState<InvestigationCase>(MOCK_CASE);
  const [entities, setEntities] = useState<Entity[]>(MOCK_ENTITIES);
  const [relationships, setRelationships] = useState<Relationship[]>(MOCK_RELATIONSHIPS);
  const [evidence, setEvidence] = useState<Evidence[]>(MOCK_EVIDENCE);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(MOCK_TIMELINE);
  const [aliasResolutions, setAliasResolutions] = useState<AliasResolution[]>(MOCK_ALIAS_RESOLUTIONS);
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>(MOCK_ANOMALIES);
  const [findings, setFindings] = useState<Finding[]>(MOCK_FINDINGS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [ingestedDocs, setIngestedDocs] = useState<IngestedDocument[]>(MOCK_INGESTED_DOCUMENTS);

  // Investigator Session
  const [user, setUser] = useState<UserSession | null>({
    investigatorId: 'INV-4412',
    name: 'Insp. Vikram Rathod',
    department: 'NCRB Women Safety & Cyber Intelligence Division',
    role: 'Lead Investigating Officer',
    badgeNumber: 'NCRB-WSD-4412',
    token: 'jwt-session-active-demo',
    authorizedCases: ['CASE-26189-001', 'FIR-2024-412']
  });

  // Selected Entity for inspection
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  // When switching case, reset selected entity to the primary entity of that case
  useEffect(() => {
    if (selectedCaseId && CASE_BUNDLES[selectedCaseId]) {
      const firstPerson = CASE_BUNDLES[selectedCaseId].entities.find((e) => e.type === 'PERSON');
      setSelectedEntityId(firstPerson ? firstPerson.id : CASE_BUNDLES[selectedCaseId].entities[0]?.id || null);
    } else {
      setSelectedEntityId(null);
    }
  }, [selectedCaseId]);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentEntities = activeBundle ? activeBundle.entities : entities;

  // Quick search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return currentEntities
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          (e.aliases && e.aliases.some((a) => a.toLowerCase().includes(q)))
      )
      .map((e) => ({
        id: e.id,
        name: e.name,
        type: e.type,
        label: e.label
      }));
  }, [currentEntities, searchQuery]);

  // Load from backend on mount if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [caseRes, entRes, relRes, evRes, fndRes] = await Promise.all([
          fetch('/api/case').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/entities').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/relationships').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/evidence').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/findings').then((r) => (r.ok ? r.json() : null))
        ]);

        if (caseRes) setCaseData(caseRes);
        if (entRes) setEntities(entRes);
        if (relRes) setRelationships(relRes);
        if (evRes) setEvidence(evRes);
        if (fndRes) setFindings(fndRes);
      } catch (err) {
        console.log('Using in-memory mock datasets');
      }
    };
    fetchBackendData();
  }, []);

  // Handler: Reset / Reload Demo Investigation
  const handleResetDemo = async () => {
    try {
      await fetch('/api/reset-demo', { method: 'POST' });
    } catch (e) {
      // fallback
    }
    setCaseData(MOCK_CASE);
    setEntities(MOCK_ENTITIES);
    setRelationships(MOCK_RELATIONSHIPS);
    setEvidence(MOCK_EVIDENCE);
    setTimelineEvents(MOCK_TIMELINE);
    setAliasResolutions(MOCK_ALIAS_RESOLUTIONS);
    setAnomalies(MOCK_ANOMALIES);
    setFindings(MOCK_FINDINGS);
    setAuditLogs(MOCK_AUDIT_LOGS);
    setIngestedDocs(MOCK_INGESTED_DOCUMENTS);
    setSelectedEntityId(null);
    setSelectedCaseId(null);
    showToast('Demo Investigation Dataset Reloaded Successfully');
  };

  // Handler: Verify Finding
  const handleVerifyFinding = async (
    findingId: string,
    status: 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW'
  ) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === findingId ? { ...f, status } : f))
    );
    showToast(`Finding ${findingId} marked as ${status} by Lead Investigator`);

    try {
      await fetch(`/api/findings/${findingId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      // local state updated
    }
  };

  // Handler: Verify Relationship
  const handleVerifyRelationship = async (
    relId: string,
    status: 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW'
  ) => {
    setRelationships((prev) =>
      prev.map((r) => (r.id === relId ? { ...r, verificationStatus: status } : r))
    );
    showToast(`Relationship ${relId} updated to ${status}`);

    try {
      await fetch(`/api/relationships/${relId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      // local state updated
    }
  };

  // Handler: Merge Alias
  const handleMergeAlias = async (
    aliasId: string,
    status: 'CONFIRMED_MERGED' | 'REJECTED' | 'PENDING_REVIEW'
  ) => {
    setAliasResolutions((prev) =>
      prev.map((a) => (a.id === aliasId ? { ...a, status } : a))
    );
    showToast(`Alias resolution ${aliasId} decision: ${status}`);

    try {
      await fetch(`/api/aliases/${aliasId}/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      // local state updated
    }
  };

  // Handler: Ingest Document Text
  const handleIngestText = async (doc: {
    title: string;
    sourceType: any;
    text: string;
    courtWarrantOrAuthId: string;
  }) => {
    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc)
      });
      if (res.ok) {
        const data = await res.json();
        setIngestedDocs((prev) => [data.document, ...prev]);
        if (data.newEvidence) setEvidence((prev) => [data.newEvidence, ...prev]);
        showToast(`Document "${doc.title}" processed into intelligence nodes!`);
        return;
      }
    } catch (e) {
      // fallback
    }

    const newDoc: IngestedDocument = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      title: doc.title,
      sourceType: doc.sourceType,
      courtWarrantOrAuthId: doc.courtWarrantOrAuthId,
      rawText: doc.text,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      entities: [
        { text: 'Rahul Sharma', type: 'PERSON', confidence: 95 },
        { text: '+91-98231-XXXX2', type: 'PHONE', confidence: 98 },
        { text: 'Pune Camp', type: 'LOCATION', confidence: 92 },
        { text: 'Axis Bank ACC-201', type: 'BANK_ACCOUNT', confidence: 96 }
      ],
      relationships: [
        { source: 'Rahul Sharma', target: '+91-98231-XXXX2', type: 'USED', confidence: 94 },
        { source: 'Rahul Sharma', target: 'Pune Camp', type: 'VISITED', confidence: 90 }
      ]
    };
    setIngestedDocs((prev) => [newDoc, ...prev]);
    showToast(`Document "${doc.title}" processed into intelligence nodes!`);
  };

  // Computed title for active tab in Navbar breadcrumb
  const activeTabTitle = useMemo(() => {
    switch (activeTab) {
      case 'dashboard':
        return 'Investigation Overview';
      case 'investigate':
        return 'AI Crime Investigator';
      case 'case':
        return 'Cases Dossier';
      case 'connect':
        return 'Evidence';
      case 'network':
        return 'Network Analysis';
      case 'timeline':
        return 'Timeline Reconstruction';
      case 'locations':
        return 'Locations & Hotspots';
      case 'hidden':
        return 'Hidden Links';
      case 'reports':
        return 'Reports';
      case 'audit':
        return 'Audit Log';
      case 'extract':
        return 'Evidence Ingestion';
      case 'assistant':
        return 'Investigator Assistant';
      case 'architecture':
        return 'System Architecture';
      default:
        return 'Workspace';
    }
  }, [activeTab]);

  // If on Home page: Render Clean Landing Page
  if (activeTab === 'home') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-[#C53A4F]/15 selection:text-[#C53A4F]">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-white border border-[#45BAAC] text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#45BAAC] animate-ping"></span>
            <span>{toastMessage}</span>
          </div>
        )}

        <HomePage
          onInvestigateCrime={() => setActiveTab('investigate')}
          onOpenDashboard={() => setActiveTab('dashboard')}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />

        {/* Login / Authentication Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={(session) => {
            setUser(session);
            showToast(`Logged in as ${session.name} (${session.badgeNumber})`);
          }}
        />
      </div>
    );
  }

  // Application Workspace (activeTab !== 'home')
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex selection:bg-[#C53A4F]/15 selection:text-[#C53A4F]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-white border border-[#45BAAC] text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#45BAAC] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        anomaliesCount={activeBundle ? activeBundle.anomalies.length : 0}
      />

      {/* 2. Main Center / Right Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Command Bar */}
        <Navbar
          user={user}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onResetDemo={handleResetDemo}
          onSearchSelect={(entityId) => {
            setSelectedEntityId(entityId);
            setActiveTab('network');
          }}
          onNavigateTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          activeTabTitle={activeTabTitle}
          caseInfo={activeCaseOption}
        />

        {/* Main Workspace Page */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {/* Case Selection Gate for all case-dependent investigation features */}
          {isCaseDependentTab && !selectedCaseId && (
            <CaseSelectionView
              targetFeatureTitle={activeTabTitle}
              onSelectAndContinue={(caseId) => {
                setSelectedCaseId(caseId);
                showToast(`Case ${caseId} dossier loaded into workspace.`);
              }}
            />
          )}

          {/* Active Case Context Bar (Sticky at top of active case investigation) */}
          {isCaseDependentTab && selectedCaseId && activeCaseOption && (
            <CaseContextBar
              currentCase={activeCaseOption}
              onChangeCase={(newId) => {
                setSelectedCaseId(newId);
                showToast(`Switched active investigation to ${newId}.`);
              }}
              onClearCase={() => {
                setSelectedCaseId(null);
                showToast('Investigation case context cleared.');
              }}
            />
          )}

          {/* Case-Dependent Pages (rendered with isolated case dataset) */}
          {isCaseDependentTab && selectedCaseId && activeBundle && activeCaseOption && (
            <>
              {activeTab === 'dashboard' && (
                <InvestigationDashboard
                  caseData={activeBundle.caseData}
                  entities={activeBundle.entities}
                  relationships={activeBundle.relationships}
                  evidence={activeBundle.evidence}
                  anomalies={activeBundle.anomalies}
                  findings={activeBundle.findings}
                  onNavigateTab={setActiveTab}
                  onVerifyFinding={handleVerifyFinding}
                  onSelectEntity={(id) => {
                    setSelectedEntityId(id);
                    setActiveTab('network');
                  }}
                  onVerifyRelationship={handleVerifyRelationship}
                />
              )}

              {activeTab === 'investigate' && (
                <InvestigateCrimePage
                  caseData={activeBundle.caseData}
                  entities={activeBundle.entities}
                  relationships={activeBundle.relationships}
                  evidence={activeBundle.evidence}
                  timelineEvents={activeBundle.timelineEvents}
                  onOpenNetwork={() => setActiveTab('network')}
                  onSelectEntity={(id) => {
                    setSelectedEntityId(id);
                    setActiveTab('network');
                  }}
                  caseInfo={activeCaseOption}
                  onChangeCase={(newId) => setSelectedCaseId(newId)}
                />
              )}

              {activeTab === 'case' && (
                <CaseWorkspacePage
                  caseData={activeBundle.caseData}
                  entities={activeBundle.entities}
                  relationships={activeBundle.relationships}
                  evidence={activeBundle.evidence}
                  onSelectEntity={(id) => {
                    setSelectedEntityId(id);
                    setActiveTab('network');
                  }}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'connect' && (
                <ConnectEvidencePage
                  caseInfo={activeCaseOption}
                  evidenceItems={activeBundle.evidenceItems}
                  evidence={activeBundle.evidence}
                  relationships={activeBundle.relationships}
                  entities={activeBundle.entities}
                  onVerifyRelationship={handleVerifyRelationship}
                  onSelectEntity={(id) => {
                    setSelectedEntityId(id);
                    setActiveTab('network');
                  }}
                  onChangeCase={(newId) => setSelectedCaseId(newId)}
                />
              )}

              {activeTab === 'network' && (
                <NetworkAnalysisPage
                  caseInfo={activeCaseOption}
                  entities={activeBundle.entities}
                  relationships={activeBundle.relationships}
                  evidence={activeBundle.evidence}
                  selectedEntityId={selectedEntityId}
                  onSelectEntity={setSelectedEntityId}
                  onVerifyRelationship={handleVerifyRelationship}
                />
              )}

              {activeTab === 'hidden' && (
                <HiddenLinksPage
                  caseInfo={activeCaseOption}
                  aliasResolutions={activeBundle.aliasResolutions}
                  anomalies={activeBundle.anomalies}
                  entities={activeBundle.entities}
                  onMergeAlias={handleMergeAlias}
                  onSelectEntity={(id) => {
                    setSelectedEntityId(id);
                    setActiveTab('network');
                  }}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'timeline' && (
                <TimelinePage
                  caseInfo={activeCaseOption}
                  events={activeBundle.timelineEvents}
                  onSelectEntity={(id) => {
                    setSelectedEntityId(id);
                    setActiveTab('network');
                  }}
                />
              )}

              {activeTab === 'locations' && (
                <LocationsPage
                  caseInfo={activeCaseOption}
                  locations={activeBundle.locations}
                  entities={activeBundle.entities}
                  onSelectEntity={(id) => {
                    setSelectedEntityId(id);
                    setActiveTab('network');
                  }}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsPage
                  caseData={activeBundle.caseData}
                  entities={activeBundle.entities}
                  relationships={activeBundle.relationships}
                  evidence={activeBundle.evidence}
                  findings={activeBundle.findings}
                />
              )}
            </>
          )}

          {/* Non Case-Dependent Investigation Utility Pages */}
          {activeTab === 'extract' && (
            <ExtractUnderstandPage
              ingestedDocs={ingestedDocs}
              onIngestText={handleIngestText}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'assistant' && (
            <AIAssistantPage
              onVerifyFinding={handleVerifyFinding}
              onSelectEntity={(id) => {
                setSelectedEntityId(id);
                setActiveTab('network');
              }}
            />
          )}

          {activeTab === 'audit' && <AuditLogsPage logs={auditLogs} />}

          {activeTab === 'architecture' && <ArchitecturePage />}
        </main>

        {/* Command Center Footer */}
        <footer className="border-t border-slate-200 bg-white py-2.5 px-6 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#45BAAC]"></span>
            <span className="text-slate-800 font-bold tracking-wider">ASTRA</span>
            <span className="text-slate-300">|</span>
            <span>NCRB Cyber Intelligence & Investigation Support</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Decision Support System • High-Assurance Chain of Custody
          </div>
        </footer>
      </div>

      {/* Login / Authentication Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={(session) => {
          setUser(session);
          showToast(`Logged in as ${session.name} (${session.badgeNumber})`);
        }}
      />
    </div>
  );
}
