import React from 'react';
import {
  Shield,
  Cpu,
  Layers,
  Network,
  Share2,
  Sparkles,
  Bot,
  FileCheck,
  Lock,
  ArrowRight,
  Database,
  Terminal,
  CheckCircle2
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#45baac]/10 text-[#45baac] border border-[#45baac]/30 font-bold">
            SIH 2026 • PS 26189
          </span>
          <span className="text-xs text-slate-500">
            Ministry of Home Affairs • NCRB Women Safety Division
          </span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          System Architecture, Technical Innovation & Domain Impact
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          Designed specifically to tackle the investigation challenge of fragmented, cross-jurisdictional crime data. This architecture transforms isolated FIR complaints, CDR telecom dumps, banking ledgers, and surveillance memos into an explainable, investigator-verified criminal intelligence network.
        </p>
      </div>

      {/* Core SIH 2026 Value Proposition & Women Safety Alignment */}
      <div className="bg-white border border-[#45baac]/30 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#45baac]" />
          <span>Strategic Alignment with NCRB Women Safety Division</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-[#45baac]">Coordinated Extortion & Harassment Rings</div>
            <p className="text-slate-600 leading-relaxed">
              Perpetrators frequently rotate burner SIM cards and virtual accounts. Our cross-modal alias resolution detects recurring patterns across disparate FIR complaints in multiple police stations.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-emerald-700">Trafficking & Covert Transit Networks</div>
            <p className="text-slate-600 leading-relaxed">
              Synthesizes physical cell tower pings and ANPR vehicle sightings to detect spatial-temporal convergence where victims and syndicate couriers were proximate.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-purple-700">Cyber Financial Dissipation</div>
            <p className="text-slate-600 leading-relaxed">
              Traces layered digital transfers from victim extortion payments into corporate shell conduits and intermediary recipients within 30 minutes of telecom spikes.
            </p>
          </div>
        </div>
      </div>

      {/* The 5-Stage Modular Pipeline Architecture */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#45baac]" />
          <span>The 5-Stage Core Intelligence Pipeline</span>
        </h3>

        <div className="space-y-3">
          {[
            {
              stage: 'STAGE 01',
              title: 'Extract & Understand (Multi-Modal Ingestion & Legal Gate)',
              desc: 'Ingests unstructured text (FIRs, police diaries, witness statements) and structured feeds (CDR, bank statements, ANPR). Enforces mandatory legal authorization (Court Warrant / Section 91) before parsing. Executes Named Entity Recognition (NER) to detect Persons, Phones, Accounts, Locations, Vehicles, and Cases.',
              icon: Cpu,
              color: 'text-[#45baac]'
            },
            {
              stage: 'STAGE 02',
              title: 'Connect Evidence (Semantic Relationship & Timeline Correlation)',
              desc: 'Extracts semantic triples (e.g., [Person] --CALLED--> [Phone], [Account] --TRANSFERRED--> [Account]). Links every relationship directly to an immutable SHA-256 evidence record. Aligns all events into a unified chronological sequence.',
              icon: Share2,
              color: 'text-blue-600'
            },
            {
              stage: 'STAGE 03',
              title: 'Build Criminal Network (Multi-Entity Graph Topology)',
              desc: 'Constructs an interactive force-directed graph with typed nodes and directional weighted edges. Computes network density, clustering coefficients, and multi-hop paths between targets.',
              icon: Network,
              color: 'text-indigo-600'
            },
            {
              stage: 'STAGE 04',
              title: 'Discover Hidden Links (Alias Resolution & Key-Player Centrality)',
              desc: 'Uncovers latent patterns: resolves multiple aliases belonging to the same operative through vector similarity and shared telemetry; flags hidden intermediaries; computes Degree, Betweenness, and Closeness Centrality to pinpoint syndicate coordinators.',
              icon: Sparkles,
              color: 'text-purple-600'
            },
            {
              stage: 'STAGE 05',
              title: 'Investigator Intelligence (Explainable AI & Court Dossier)',
              desc: 'Provides a natural-language query interface grounded in Gemini 3.8 Flash. Every output shows why the connection was identified, supporting evidence citations, confidence scores, and alternative hypotheses. Generates court-admissible dossiers.',
              icon: Bot,
              color: 'text-emerald-600'
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.stage}
                className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-[#45baac]">{item.stage}</span>
                  <span className="text-slate-300">•</span>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.title}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#45baac]" />
          <span>Full-Stack Engineering & Security Specifications</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] font-mono uppercase">Frontend</span>
            <div className="font-bold text-slate-900">React 19 + TypeScript</div>
            <div className="text-slate-500 text-[11px]">Tailwind CSS v4, Lucide Icons, SVG Graph Visualizer</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] font-mono uppercase">Backend API</span>
            <div className="font-bold text-slate-900">Express + Node.js</div>
            <div className="text-slate-500 text-[11px]">Modular REST endpoints, In-Memory Knowledge Store</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] font-mono uppercase">AI Reasoning</span>
            <div className="font-bold text-slate-900">Gemini 3.8 Flash</div>
            <div className="text-slate-500 text-[11px]">@google/genai SDK with strict ground-truth prompt template</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] font-mono uppercase">Evidence Integrity</span>
            <div className="font-bold text-slate-900">Cryptographic SHA-256</div>
            <div className="text-slate-500 text-[11px]">Tamper-evident audit chain compliant with legal standards</div>
          </div>
        </div>
      </div>
    </div>
  );
};
