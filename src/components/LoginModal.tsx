import React, { useState } from 'react';
import { Shield, Lock, X, KeyRound, UserCheck, CheckCircle2 } from 'lucide-react';
import { UserSession } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (session: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [investigatorId, setInvestigatorId] = useState('INV-4412');
  const [password, setPassword] = useState('••••••••••••');
  const [department, setDepartment] = useState('NCRB Women Safety & Cyber Intelligence Division');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onLogin({
        investigatorId,
        name: 'Insp. Vikram Rathod',
        department,
        role: 'Lead Investigating Officer',
        badgeNumber: 'NCRB-WSD-4412',
        token: `jwt-auth-session-${Date.now()}`,
        authorizedCases: ['CASE-26189-001', 'FIR-2024-412']
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden text-slate-900 flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 z-20 cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= LEFT SIDE: NEXUS BRAND & ANIMATED GRAPH ================= */}
        <div className="md:w-1/2 p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle SVG network visual */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <line x1="40" y1="50" x2="100" y2="90" stroke="#45baac" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="100" y1="90" x2="160" y2="60" stroke="#3B82F6" strokeWidth="1.5" />
              <line x1="100" y1="90" x2="110" y2="150" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="110" y1="150" x2="50" y2="160" stroke="#10B981" strokeWidth="1.5" />
              <circle cx="40" cy="50" r="5" fill="#45baac" />
              <circle cx="100" cy="90" r="7" fill="#8B5CF6" />
              <circle cx="160" cy="60" r="4" fill="#3B82F6" />
              <circle cx="110" cy="150" r="5" fill="#10B981" />
              <circle cx="50" cy="160" r="4" fill="#F59E0B" />
            </svg>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#45baac]/10 border border-[#45baac]/30 text-[#45baac] text-[10px] font-mono font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>SIH 26189</span>
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                NEXUS
              </h1>
              <p className="text-xs font-mono text-[#45baac] font-bold tracking-wider uppercase mt-0.5">
                AI-POWERED CRIMINAL NETWORK ANALYSIS
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              National investigation intelligence portal integrating multi-modal call detail records, financial flows, and geofence telemetry.
            </p>
          </div>

          <div className="relative z-10 pt-6 text-[10px] font-mono text-slate-400">
            MINISTRY OF HOME AFFAIRS • NCRB
          </div>
        </div>

        {/* ================= RIGHT SIDE: SECURE INVESTIGATOR ACCESS ================= */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[10px] font-mono text-[#45baac] uppercase font-bold tracking-wider mb-1">
              CREDENTIAL VERIFICATION
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              SECURE INVESTIGATOR ACCESS
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {/* Investigator ID */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">
                Investigator ID
              </label>
              <input
                type="text"
                value={investigatorId}
                onChange={(e) => setInvestigatorId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono focus:outline-none focus:border-[#45baac]"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono focus:outline-none focus:border-[#45baac]"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#45baac]"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isAuthorizing}
              className="w-full py-2.5 rounded bg-[#45baac] hover:bg-[#3ba396] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer mt-2 shadow-xs"
            >
              {isAuthorizing ? 'AUTHENTICATING TOKEN...' : 'SECURE LOGIN'}
            </button>
          </form>

          {/* Bottom Notice: AUTHORIZED DEMO ENVIRONMENT */}
          <div className="text-center pt-2 border-t border-slate-200 text-[10px] font-mono text-amber-700 font-bold">
            AUTHORIZED DEMO ENVIRONMENT
          </div>
        </div>
      </div>
    </div>
  );
};
