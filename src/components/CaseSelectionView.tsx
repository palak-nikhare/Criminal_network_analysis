import React, { useState } from 'react';
import { Shield, ChevronDown, ArrowRight, FolderLock, Sparkles, Building2, User, FileText, CheckCircle2 } from 'lucide-react';
import { AVAILABLE_CASES, CaseOption } from '../data/casesDataset';

interface CaseSelectionViewProps {
  targetFeatureTitle?: string;
  onSelectAndContinue: (caseId: string) => void;
}

export const CaseSelectionView: React.FC<CaseSelectionViewProps> = ({
  targetFeatureTitle = 'Investigation Workspace',
  onSelectAndContinue
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');

  const selectedCaseObj = AVAILABLE_CASES.find((c) => c.id === selectedCaseId);

  const handleContinue = () => {
    if (selectedCaseId) {
      onSelectAndContinue(selectedCaseId);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl mx-auto">
        {/* Main Card with Generous Whitespace */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 sm:p-10 space-y-8">
          
          {/* Top Icon & Eyebrow */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#C53A4F]/10 border border-[#C53A4F]/20 flex items-center justify-center text-[#C53A4F] shadow-xs">
              <FolderLock className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 uppercase">
                SELECT INVESTIGATION CASE
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Choose a case to continue.
              </p>
            </div>

            {targetFeatureTitle && (
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/70 text-[11px] font-mono font-medium text-slate-600">
                <span>Accessing:</span>
                <span className="font-bold text-slate-900">{targetFeatureTitle}</span>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="case-select-dropdown" className="block text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
                Investigation Case Docket
              </label>

              <div className="relative">
                <select
                  id="case-select-dropdown"
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                  className="w-full appearance-none bg-slate-50 hover:bg-slate-50/80 border-2 border-slate-200 focus:border-[#C53A4F] focus:ring-4 focus:ring-[#C53A4F]/10 rounded-xl px-4 py-3.5 pr-10 text-sm font-semibold text-slate-800 transition cursor-pointer outline-hidden"
                >
                  <option value="" disabled className="text-slate-400">
                    Select Case
                  </option>
                  {AVAILABLE_CASES.map((item: CaseOption) => (
                    <option key={item.id} value={item.id} className="text-slate-900 font-medium py-1">
                      {item.id} — {item.city} ({item.title})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Selected Case Preview Info (if selected) */}
            {selectedCaseObj && (
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#45BAAC]"></span>
                    <span className="text-xs font-mono font-bold text-slate-900 tracking-wide">
                      {selectedCaseObj.id}
                    </span>
                    <span className="text-xs font-medium text-slate-400">•</span>
                    <span className="text-xs font-bold text-slate-700">
                      {selectedCaseObj.city}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#45BAAC]/15 text-[#1b7a70] border border-[#45BAAC]/30">
                    Active Docket
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">
                  {selectedCaseObj.title}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {selectedCaseObj.summary}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                  <span className="flex items-center space-x-1 truncate max-w-[240px]">
                    <User className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{selectedCaseObj.officer}</span>
                  </span>
                  <span className="text-[#9A6599] font-bold">
                    Confidence: {selectedCaseObj.confidenceScore}%
                  </span>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <div>
              <button
                id="btn-continue-case-selection"
                onClick={handleContinue}
                disabled={!selectedCaseId}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center space-x-2 transition-all shadow-sm ${
                  selectedCaseId
                    ? 'bg-[#C53A4F] hover:bg-[#a82b3d] text-white cursor-pointer hover:shadow-md active:scale-[0.99]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <span>Continue to Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {!selectedCaseId && (
                <p className="text-center text-[11px] font-mono text-slate-400 mt-2">
                  Please select a case to unlock evidence, network graph, and AI tools.
                </p>
              )}
            </div>
          </div>

          {/* Bottom Security Assurance */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-2 text-[11px] text-slate-400 font-mono">
            <Shield className="w-3.5 h-3.5 text-[#45BAAC]" />
            <span>Multi-Agency Forensic Sandbox • Strict Data Isolation Enforced</span>
          </div>

        </div>
      </div>
    </div>
  );
};
