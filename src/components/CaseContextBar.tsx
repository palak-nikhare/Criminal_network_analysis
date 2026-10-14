import React, { useState } from 'react';
import { FolderLock, RefreshCw, CheckCircle2, ChevronDown, X, Shield, ArrowRight } from 'lucide-react';
import { AVAILABLE_CASES, CaseOption } from '../data/casesDataset';

interface CaseContextBarProps {
  currentCase: CaseOption;
  onChangeCase: (newCaseId: string) => void;
  onClearCase?: () => void;
}

export const CaseContextBar: React.FC<CaseContextBarProps> = ({
  currentCase,
  onChangeCase,
  onClearCase
}) => {
  const [isSwitchingOpen, setIsSwitchingOpen] = useState(false);
  const [targetCaseId, setTargetCaseId] = useState<string>(currentCase.id);

  const handleConfirmSwitch = () => {
    if (targetCaseId && targetCaseId !== currentCase.id) {
      onChangeCase(targetCaseId);
    }
    setIsSwitchingOpen(false);
  };

  return (
    <div className="relative mb-6">
      {/* Persistent Case Context Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all">
        
        {/* Left: Current Case Information */}
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#C53A4F]/10 border border-[#C53A4F]/25 flex items-center justify-center shrink-0 text-[#C53A4F]">
            <FolderLock className="w-5 h-5" />
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#C53A4F]">
                CURRENT CASE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#45BAAC] animate-pulse"></span>
              <span className="text-[10px] font-mono text-[#1b7a70] bg-[#45BAAC]/15 px-1.5 py-0.2 rounded font-semibold border border-[#45BAAC]/30">
                ACTIVE
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-sm sm:text-base font-black text-slate-900 tracking-tight">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">ACTIVE CASE:</span>
              <span className="font-mono text-[#C53A4F]">{currentCase.id}</span>
              <span className="text-slate-300 font-normal">|</span>
              <span className="text-slate-700 font-bold">{currentCase.city}</span>
              <span className="text-slate-300 font-normal">|</span>
              <span className="text-slate-800 font-extrabold truncate">{currentCase.title}</span>
            </div>
          </div>
        </div>

        {/* Right: Change Case Button */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          <button
            id="btn-change-investigation-case"
            onClick={() => {
              setTargetCaseId(currentCase.id);
              setIsSwitchingOpen(!isSwitchingOpen);
            }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-[#C53A4F] bg-slate-100 hover:bg-slate-200/70 border border-slate-200 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Case</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSwitchingOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Case Switching Dropdown / Modal Bar */}
      {isSwitchingOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white rounded-xl border border-slate-200 shadow-xl p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Switch Investigation Case
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                (Replaces all current view data)
              </span>
            </div>
            <button
              onClick={() => setIsSwitchingOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {AVAILABLE_CASES.map((c) => {
                const isCurrent = c.id === currentCase.id;
                const isSelected = c.id === targetCaseId;

                return (
                  <div
                    key={c.id}
                    onClick={() => setTargetCaseId(c.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#C53A4F] bg-[#C53A4F]/5 ring-1 ring-[#C53A4F]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {c.id}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-200 text-slate-600 font-bold">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-700 truncate">{c.city}</div>
                    <div className="text-[11px] text-slate-500 truncate">{c.title}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {onClearCase ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsSwitchingOpen(false);
                    onClearCase();
                  }}
                  className="text-xs text-[#C53A4F] hover:text-[#9b293b] hover:underline font-bold transition cursor-pointer"
                >
                  ← Select Another Case
                </button>
              ) : (
                <div />
              )}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSwitchingOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="btn-confirm-switch-case"
                  disabled={targetCaseId === currentCase.id}
                  onClick={handleConfirmSwitch}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
                    targetCaseId !== currentCase.id
                      ? 'bg-[#C53A4F] hover:bg-[#a82b3d] text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Confirm & Load Data</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
