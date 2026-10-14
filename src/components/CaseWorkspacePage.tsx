import React, { useState } from 'react';
import {
  Users,
  Phone,
  CreditCard,
  Car,
  MapPin,
  Building2,
  FolderLock,
  Search,
  ExternalLink,
  ShieldAlert,
  Calendar,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';
import { InvestigationCase, Entity, Relationship, Evidence } from '../types';
import { getEntityTypeColor } from '../utils';

interface CaseWorkspacePageProps {
  caseData: InvestigationCase;
  entities: Entity[];
  relationships: Relationship[];
  evidence: Evidence[];
  onSelectEntity: (entityId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const CaseWorkspacePage: React.FC<CaseWorkspacePageProps> = ({
  caseData,
  entities,
  relationships,
  evidence,
  onSelectEntity,
  onNavigateTab
}) => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  // Category counts
  const typeCounts = {
    PERSON: entities.filter(e => e.type === 'PERSON').length,
    PHONE: entities.filter(e => e.type === 'PHONE').length,
    BANK_ACCOUNT: entities.filter(e => e.type === 'BANK_ACCOUNT').length,
    VEHICLE: entities.filter(e => e.type === 'VEHICLE').length,
    LOCATION: entities.filter(e => e.type === 'LOCATION').length,
    ORGANIZATION: entities.filter(e => e.type === 'ORGANIZATION').length,
    CASE: entities.filter(e => e.type === 'CASE').length
  };

  const filteredEntities = entities.filter(e => {
    const matchesType = selectedType === 'ALL' || e.type === selectedType;
    const matchesSearch =
      e.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      e.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (e.aliases && e.aliases.some(a => a.toLowerCase().includes(searchFilter.toLowerCase())));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Case Header Dossier Card */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm relative">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-3 py-1 rounded bg-[#45baac]/10 text-[#45baac] border border-[#45baac]/30 font-bold">
                {caseData.id}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold font-mono">
                {caseData.status}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                {caseData.division}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {caseData.title}
            </h2>
            <p className="text-sm text-slate-600 max-w-4xl leading-relaxed">
              {caseData.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-[#45baac]" />
                <span>Investigating Officer: <strong className="text-slate-900">{caseData.investigatingOfficer}</strong> ({caseData.badgeNumber})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Created: <strong className="text-slate-900">{caseData.createdAt}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Evidence Confidence: <strong className="text-emerald-700 font-mono">{caseData.confidenceScore}%</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('reports')}
              className="px-4 py-2 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              Generate Case Report
            </button>

            <button
              onClick={() => onNavigateTab('network')}
              className="px-4 py-2 rounded bg-[#45baac] hover:bg-[#3ba396] text-white font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-xs"
            >
              <span>Explore Graph Network</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Case Overview Category Cards */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-3">
          Case Overview by Entity Category
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { type: 'PERSON', label: 'Persons', count: typeCounts.PERSON, icon: Users, color: 'text-[#45baac]' },
            { type: 'PHONE', label: 'Phones', count: typeCounts.PHONE, icon: Phone, color: 'text-blue-600' },
            { type: 'BANK_ACCOUNT', label: 'Accounts', count: typeCounts.BANK_ACCOUNT, icon: CreditCard, color: 'text-emerald-600' },
            { type: 'VEHICLE', label: 'Vehicles', count: typeCounts.VEHICLE, icon: Car, color: 'text-purple-600' },
            { type: 'LOCATION', label: 'Locations', count: typeCounts.LOCATION, icon: MapPin, color: 'text-amber-600' },
            { type: 'ORGANIZATION', label: 'Orgs', count: typeCounts.ORGANIZATION, icon: Building2, color: 'text-blue-600' },
            { type: 'CASE', label: 'Prev Cases', count: typeCounts.CASE, icon: FolderLock, color: 'text-[#c53a4f]' }
          ].map(card => {
            const Icon = card.icon;
            const isSelected = selectedType === card.type;
            return (
              <button
                key={card.type}
                onClick={() => setSelectedType(selectedType === card.type ? 'ALL' : card.type)}
                className={`p-3 rounded border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#45baac]/10 border-[#45baac] ring-1 ring-[#45baac]'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-500">{card.label}</span>
                  <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                </div>
                <div className="text-xl font-bold text-slate-900 font-mono">{card.count}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Entity Catalog & Investigation Details */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Case Entity Registry ({filteredEntities.length} of {entities.length})
            </h3>
            <p className="text-xs text-slate-500">
              Structured database of all resolved suspects, communication lines, accounts, and infrastructure
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by name, alias, or ID..."
                className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#45baac] w-56 font-sans"
              />
            </div>
            {selectedType !== 'ALL' && (
              <button
                onClick={() => setSelectedType('ALL')}
                className="text-xs text-[#45baac] hover:underline px-2 cursor-pointer font-mono font-semibold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Entity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntities.map(entity => {
            const colors = getEntityTypeColor(entity.type);
            const connectedEdges = relationships.filter(
              r => r.source === entity.id || r.target === entity.id
            );

            return (
              <div
                key={entity.id}
                onClick={() => onSelectEntity(entity.id)}
                className="bg-white border border-slate-200 hover:border-[#45baac]/60 rounded-md p-4 transition shadow-xs cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-[#45baac] border border-slate-200 font-semibold">
                      {entity.type}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                      Conf: {entity.confidence}%
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#45baac] transition">
                    {entity.name}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-mono mb-2">
                    {entity.id}
                  </div>

                  {entity.aliases && entity.aliases.length > 0 && (
                    <div className="mb-2 text-[11px] text-slate-500">
                      <span>Aliases: </span>
                      <span className="text-amber-700 font-mono font-semibold">
                        {entity.aliases.join(', ')}
                      </span>
                    </div>
                  )}

                  {entity.role && (
                    <div className="mb-3 text-[11px] px-2 py-1 rounded bg-slate-50 text-slate-600 border border-slate-200">
                      <span>Role: </span>
                      <strong className="text-[#45baac]">{entity.role}</strong>
                    </div>
                  )}

                  {/* Metadata key-values */}
                  <div className="space-y-1 text-[11px] text-slate-500 border-t border-slate-200 pt-2 mb-3">
                    {Object.entries(entity.details).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize text-slate-500">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-slate-800 truncate max-w-[150px] font-mono font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    <strong className="text-slate-900 font-mono">{connectedEdges.length}</strong> Connections
                  </span>

                  <span className="text-[#45baac] flex items-center space-x-1 text-[11px] font-semibold">
                    <span>Inspect Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
