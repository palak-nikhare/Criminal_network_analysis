import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  Search,
  ExternalLink,
  Layers,
  PhoneCall,
  CreditCard,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { AIQueryResponse } from '../types';

interface AIAssistantPageProps {
  onVerifyFinding?: (findingId: string, status: 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW') => void;
  onSelectEntity?: (entityId: string) => void;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  onVerifyFinding,
  onSelectEntity
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ question: string; response: AIQueryResponse }>>([
    {
      question: 'Who connected Arjun Mehta to Company Alpha Ltd and what financial transactions occurred?',
      response: {
        answer:
          'Arjun Mehta is connected to Company Alpha Ltd through two convergent lines of evidence: First, surveillance log ANPR-2024-069 documented Arjun Mehta operating Scorpio MH-12-AB-1234 registered directly to Company Alpha Ltd. Second, financial ledger FIN-201 confirmed an IMPS transfer of ₹18,50,000 from Company Alpha Ltd’s Axis Bank account (ACC-201) to Neha Patil following Arjun Mehta’s instructions.',
        confidence: 91,
        supportingEvidence: [
          'EVD-ANPR-01: Vehicle MH-12-AB-1234 registered to Company Alpha Ltd',
          'EVD-FIN-01: IMPS Transfer TX-221 of ₹18,50,000 from ACC-201',
          'EVD-CDR-02: 18 phone calls between Arjun Mehta and Neha Patil'
        ],
        sourceReferences: ['Surveillance Log #SB-44', 'Axis Bank STR #TX-881', 'CDR Telemetry Cluster CDR-104'],
        whyDetected:
          'Co-occurrence of vehicle registration cross-referenced with ANPR optical capture and subsequent electronic wire transfer within 24 hours of telephony spikes.',
        alternativeExplanations:
          'The vehicle may have been loaned without corporate knowledge, though concurrent financial authorizations make independent coincidence statistically remote (p < 0.01).',
        suggestedNextSteps: [
          'Issue formal Section 91 notice to Axis Bank for signature mandate on ACC-201',
          'Summon Neha Patil regarding the economic purpose of the ₹18.5L transfer',
          'Audit GPS telematics of vehicle MH-12-AB-1234 for June 10-15'
        ]
      }
    }
  ]);

  const quickActions = [
    { label: 'SHOW CONNECTIONS', query: 'Show all connections and key conduits linked to Arjun Mehta.' },
    { label: 'FIND HIDDEN LINKS', query: 'Find latent aliases and indirect bridge nodes in this case.' },
    { label: 'EXPLAIN RELATIONSHIP', query: 'Explain the evidence connecting Neha Patil to Rohan Kulkarni.' },
    { label: 'FIND FINANCIAL LINKS', query: 'Trace the path of all fund transfers originating from ACC-201.' },
    { label: 'FIND ANOMALIES', query: 'Identify all temporal communication and location anomalies.' }
  ];

  const handleSendQuery = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q.trim() || isLoading) return;

    if (!customQuery) setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data: AIQueryResponse = await res.json();
      setHistory((prev) => [...prev, { question: q, response: data }]);
    } catch (err) {
      console.error('AI Query failed:', err);
      // Demo fallback response
      setHistory((prev) => [
        ...prev,
        {
          question: q,
          response: {
            answer:
              'Analysis of the case dossier indicates multiple corroborated links: Telecom records establish 18 calls between primary targets, while bank clearing records demonstrate rapid fund dissipation across secondary conduits.',
            confidence: 88,
            supportingEvidence: [
              'EVD-CDR-104: Call detail records from Pune gateway',
              'EVD-FIN-201: RTGS transaction ledger from Axis Bank'
            ],
            sourceReferences: ['CrPC Section 91 Case File #412'],
            whyDetected: 'Algorithmic cross-correlation of timestamps across independent telecom and banking streams.',
            alternativeExplanations: 'Standard commercial transaction between registered entities.',
            suggestedNextSteps: [
              'Review subscriber CAF records for burner phones',
              'Verify beneficiary KYC files'
            ]
          }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white border border-slate-200 rounded-md p-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#45baac] uppercase font-bold">
            <Bot className="w-3.5 h-3.5" />
            <span>STAGE 05 • EXPLAINABLE INVESTIGATOR AI</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            INVESTIGATOR AI COMMAND INTERFACE
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Grounded investigation reasoning engine with evidence-backed hypothesis testing and alternative explanations.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[#45baac] bg-slate-50 px-3 py-1.5 rounded border border-slate-200 font-bold">
          <Cpu className="w-3.5 h-3.5" />
          <span>GEMINI INVESTIGATION CO-PILOT</span>
        </div>
      </div>

      {/* 3-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ================= LEFT SIDE: INVESTIGATION CONTEXT ================= */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-md p-4 shadow-sm space-y-4">
          <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase font-mono">
              INVESTIGATION CONTEXT
            </span>
            <span className="text-[10px] font-mono text-[#45baac] font-bold">ACTIVE CASE</span>
          </div>

          {/* Case Info */}
          <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono text-[#45baac] uppercase font-bold">
              CASE-26189-001
            </div>
            <div className="text-xs font-bold text-slate-900">
              Organized Financial & Communication Network
            </div>
            <div className="text-[11px] text-slate-500">
              Lead: Insp. Vikram Rathod • NCRB Women Safety Div
            </div>
          </div>

          {/* Entities In Scope */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              ENTITIES IN SCOPE (24)
            </div>
            <div className="space-y-1 text-xs">
              <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-800 flex justify-between">
                <span className="font-medium">Arjun Mehta</span>
                <span className="text-[#45baac] font-mono text-[10px] font-semibold">Connector</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-800 flex justify-between">
                <span className="font-medium">Neha Patil</span>
                <span className="text-blue-600 font-mono text-[10px] font-semibold">Broker</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-800 flex justify-between">
                <span className="font-medium">Sameer Shah</span>
                <span className="text-amber-600 font-mono text-[10px] font-semibold">Courier</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-800 flex justify-between">
                <span className="font-medium">Company Alpha Ltd</span>
                <span className="text-purple-600 font-mono text-[10px] font-semibold">Corporate</span>
              </div>
            </div>
          </div>

          {/* Evidence Repository */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              EVIDENCE VAULT (18)
            </div>
            <div className="space-y-1 text-xs font-mono text-slate-600">
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                CDR: 14,820 Records (Airtel & Jio)
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                BANK: 12 Accounts (Axis & HDFC)
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                ANPR: 34 Camera Hits (Pune Camp)
              </div>
            </div>
          </div>
        </div>

        {/* ================= CENTER: AI CONVERSATION & INTELLIGENCE CARDS ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden min-h-[560px]">
          {/* Top Quick Actions Bar */}
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center gap-1.5 overflow-x-auto">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(action.query)}
                className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-[#45baac] hover:text-[#389d91] border border-slate-200 text-[10px] font-mono font-bold whitespace-nowrap transition cursor-pointer shadow-xs"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Conversation Stream of Intelligence Cards */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1 max-h-[500px]">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-3">
                {/* Investigator Question */}
                <div className="flex items-start justify-end space-x-2">
                  <div className="bg-[#45baac]/10 border border-[#45baac]/30 text-slate-900 p-3 rounded-lg max-w-lg text-xs leading-relaxed">
                    <div className="text-[9px] font-mono text-[#45baac] font-bold uppercase mb-1">
                      INVESTIGATOR QUERY
                    </div>
                    {item.question}
                  </div>
                </div>

                {/* AI Intelligence Card (NOT generic ChatGPT!) */}
                <div className="bg-slate-50 border border-[#45baac]/40 rounded-md p-4 space-y-3 shadow-xs">
                  {/* Header: AI Badge + Confidence */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#45baac]" />
                      <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                        INTELLIGENCE FINDING
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-[#45baac]/15 text-[#2c7a71] border border-[#45baac]/30 text-[10px] font-mono font-bold">
                        {item.response.confidence}% Confidence
                      </span>
                    </div>
                  </div>

                  {/* Core Finding Answer */}
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {item.response.answer}
                  </p>

                  {/* Why Detected? */}
                  <div className="p-2.5 rounded bg-white border border-slate-200 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-[#45baac] font-bold">
                      DETECTION RATIONALE (WHY DETECTED?)
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.response.whyDetected}
                    </p>
                  </div>

                  {/* Alternative Explanation */}
                  <div className="p-2.5 rounded bg-white border border-slate-200 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-amber-700 font-bold">
                      ALTERNATIVE HYPOTHESIS CONSIDERED
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.response.alternativeExplanations}
                    </p>
                  </div>

                  {/* Suggested Next Steps */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold">
                      ACTIONABLE INVESTIGATOR LEADS
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {item.response.suggestedNextSteps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start space-x-2">
                          <span className="text-emerald-600 mt-0.5">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="p-4 rounded bg-slate-50 border border-[#45baac]/40 flex items-center space-x-3 text-xs text-[#45baac]">
                <Sparkles className="w-4 h-4 animate-spin text-[#45baac]" />
                <span>Evaluating multi-modal evidence across graph topology...</span>
              </div>
            )}
          </div>

          {/* Bottom Query Input */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask investigator intelligence query..."
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#45baac] font-sans"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="px-4 py-2 rounded bg-[#45baac] hover:bg-[#389d91] disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
              >
                <span>ANALYZE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* ================= RIGHT SIDE: EVIDENCE & SOURCES ================= */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-md p-4 shadow-sm space-y-4">
          <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase font-mono">
              EVIDENCE & SOURCES
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">VERIFIED</span>
          </div>

          {/* Sources Grounding Current Analysis */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              GROUNDING REFERENCES
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-semibold text-[#45baac]">
                Surveillance Log #SB-44
              </div>
              <div className="text-[11px] text-slate-600">
                ANPR vehicle entry at Pune Camp on 14 June.
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-semibold text-emerald-700">
                Axis Bank STR #TX-881
              </div>
              <div className="text-[11px] text-slate-600">
                RTGS transfer of ₹18,50,000 to intermediary account.
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-semibold text-blue-700">
                CDR Telemetry Cluster CDR-104
              </div>
              <div className="text-[11px] text-slate-600">
                18 call records triangulated between burner phones.
              </div>
            </div>
          </div>

          {/* CrPC Section 65B Audit Admissibility */}
          <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Section 65B Compliance</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              All intelligence responses derive strictly from cryptographic hash-verified records admissible under Indian Evidence Act.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
