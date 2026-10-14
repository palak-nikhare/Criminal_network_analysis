import React, { useState } from 'react';
import {
  FileSearch,
  Share2,
  Network,
  Sparkles,
  BrainCircuit,
  ArrowRight,
  Info
} from 'lucide-react';

interface FiveStageWorkflowBarProps {
  currentStage?: number;
  onSelectStage?: (tabName: string) => void;
}

export const FiveStageWorkflowBar: React.FC<FiveStageWorkflowBarProps> = ({
  currentStage = 1,
  onSelectStage
}) => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const stages = [
    {
      id: 1,
      tab: 'extract',
      num: '01',
      title: 'EXTRACT & UNDERSTAND',
      shortDesc: 'Ingest raw FIR, CDR, and bank records',
      fullExplanation:
        'Normalizes unstructured police reports, telecom CDR dumps, financial ledgers, and ANPR sightings into structured entity tokens.',
      icon: FileSearch
    },
    {
      id: 2,
      tab: 'connect',
      num: '02',
      title: 'CONNECT EVIDENCE',
      shortDesc: 'Correlate multi-modal evidence trails',
      fullExplanation:
        'Computes temporal and spatial cross-modal overlaps with tamper-evident cryptographic hashes to substantiate connections.',
      icon: Share2
    },
    {
      id: 3,
      tab: 'network',
      num: '03',
      title: 'BUILD NETWORK',
      shortDesc: 'Construct unified criminal topology',
      fullExplanation:
        'Maps multidimensional graphs spanning suspects, burner phones, shell bank accounts, vehicles, and rendezvous spots.',
      icon: Network
    },
    {
      id: 4,
      tab: 'hidden',
      num: '04',
      title: 'DISCOVER HIDDEN LINKS',
      shortDesc: 'Resolve latent aliases & bridge nodes',
      fullExplanation:
        'Applies graph betweenness algorithms and phonetic similarity matching to unmask covert brokers and shared resources.',
      icon: Sparkles
    },
    {
      id: 5,
      tab: 'assistant',
      num: '05',
      title: 'INVESTIGATOR INTELLIGENCE',
      shortDesc: 'Evidence-backed leads for verification',
      fullExplanation:
        'Empowers human investigators with explainable hypothesis testing, audit-ready reports, and Section 91 CrPC compliance.',
      icon: BrainCircuit
    }
  ];

  return (
    <section className="w-full my-4">
      {/* 5-Stage Modern Horizontal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrent = currentStage === stage.id;
          const isHovered = hoveredStage === stage.id;
          const isAI = stage.id >= 4;

          return (
            <div
              key={stage.id}
              onClick={() => onSelectStage && onSelectStage(stage.tab)}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              className={`relative p-3.5 rounded-md border transition-all duration-200 cursor-pointer select-none group flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-[#45baac] shadow-md ring-2 ring-[#45baac]/20'
                  : 'bg-white border-slate-200 hover:border-[#45baac]/60 hover:shadow-sm'
              }`}
            >
              {/* Glowing thin connecting line / arrow to next card */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-400 group-hover:text-[#45baac] group-hover:border-[#45baac] transition shadow-xs">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}

              {/* Card Header: Number + Icon */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-extrabold px-1.5 py-0.5 rounded border ${
                      isCurrent
                        ? 'bg-[#45baac] text-white border-[#45baac]'
                        : isAI
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {stage.num}
                  </span>

                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isCurrent
                        ? 'text-[#45baac]'
                        : isAI
                        ? 'text-purple-600'
                        : 'text-slate-400 group-hover:text-[#45baac]'
                    }`}
                  />
                </div>

                {/* Short Title */}
                <h4 className="font-bold text-xs tracking-tight text-slate-900 group-hover:text-[#45baac] transition-colors leading-tight">
                  {stage.title}
                </h4>

                {/* ONE short description */}
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {stage.shortDesc}
                </p>
              </div>

              {/* Hover Explanation Tooltip / Banner */}
              {isHovered && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-[#45baac] flex items-start space-x-1.5 animate-in fade-in duration-150">
                  <Info className="w-3 h-3 shrink-0 mt-0.5" />
                  <span className="leading-tight text-slate-700">
                    {stage.fullExplanation}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
