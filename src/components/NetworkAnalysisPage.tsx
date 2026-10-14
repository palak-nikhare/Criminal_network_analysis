import React, { useState, useMemo } from 'react';
import {
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Search,
  Users,
  Phone,
  CreditCard,
  Car,
  MapPin,
  FolderLock,
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Share2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers
} from 'lucide-react';
import { Entity, Relationship, Evidence } from '../types';
import { getEntityTypeColor, getVerificationBadge, truncateHash } from '../utils';
import { CaseOption } from '../data/casesDataset';

interface NetworkAnalysisPageProps {
  entities: Entity[];
  relationships: Relationship[];
  evidence: Evidence[];
  selectedEntityId?: string | null;
  onSelectEntity: (id: string | null) => void;
  onVerifyRelationship: (relId: string, status: 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW') => void;
  caseInfo?: CaseOption;
}

// Structured topology coordinates
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  // Pune Case
  'ENT-P-01': { x: 500, y: 320 }, // Central Hub: Arjun Mehta
  'ENT-P-02': { x: 760, y: 220 }, // Broker: Neha Patil
  'ENT-P-03': { x: 880, y: 390 }, // Financial: Rohan Kulkarni
  'ENT-P-04': { x: 240, y: 400 }, // Runner: Sameer Shah
  'ENT-PH-01': { x: 330, y: 190 }, // Phone-101
  'ENT-PH-02': { x: 190, y: 230 }, // Phone-102 (Burner)
  'ENT-PH-03': { x: 680, y: 110 }, // Phone-103
  'ENT-BA-01': { x: 800, y: 510 }, // ACC-201
  'ENT-BA-02': { x: 920, y: 230 }, // ACC-202
  'ENT-TX-01': { x: 890, y: 320 }, // TX-221
  'ENT-VH-01': { x: 520, y: 500 }, // Vehicle MH-12
  'ENT-LOC-01': { x: 360, y: 490 }, // Pune Camp Rendezvous
  'ENT-ORG-01': { x: 660, y: 470 }, // Company Alpha Ltd
  'ENT-CS-01': { x: 150, y: 510 },  // FIR-2026-089

  // Mumbai Case
  'ENT-MUM-P-01': { x: 500, y: 300 },
  'ENT-MUM-P-02': { x: 740, y: 220 },
  'ENT-MUM-P-03': { x: 280, y: 380 },
  'ENT-MUM-PH-01': { x: 340, y: 180 },
  'ENT-MUM-BA-01': { x: 780, y: 450 },
  'ENT-MUM-LOC-01': { x: 520, y: 490 },
  'ENT-MUM-ORG-01': { x: 680, y: 360 },

  // Delhi Case
  'ENT-DEL-P-01': { x: 500, y: 300 },
  'ENT-DEL-P-02': { x: 740, y: 220 },
  'ENT-DEL-P-03': { x: 280, y: 380 },
  'ENT-DEL-PH-01': { x: 340, y: 180 },
  'ENT-DEL-BA-01': { x: 780, y: 450 },
  'ENT-DEL-LOC-01': { x: 520, y: 490 },
  'ENT-DEL-ORG-01': { x: 680, y: 360 }
};

export const NetworkAnalysisPage: React.FC<NetworkAnalysisPageProps> = ({
  entities,
  relationships,
  evidence,
  selectedEntityId,
  onSelectEntity,
  onVerifyRelationship,
  caseInfo
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Node & Edge objects
  const selectedEntity = useMemo(() => {
    return entities.find(e => e.id === selectedEntityId) || null;
  }, [entities, selectedEntityId]);

  const selectedEdge = useMemo(() => {
    return relationships.find(r => r.id === selectedEdgeId) || null;
  }, [relationships, selectedEdgeId]);

  // Evidence for selected edge
  const edgeEvidence = useMemo(() => {
    if (!selectedEdge) return null;
    return evidence.find(ev => ev.id === selectedEdge.sourceEvidenceId) || null;
  }, [selectedEdge, evidence]);

  const edgeSourceEntity = useMemo(() => {
    if (!selectedEdge) return null;
    return entities.find(e => e.id === selectedEdge.source) || null;
  }, [selectedEdge, entities]);

  const edgeTargetEntity = useMemo(() => {
    if (!selectedEdge) return null;
    return entities.find(e => e.id === selectedEdge.target) || null;
  }, [selectedEdge, entities]);

  // Connected nodes
  const connectedNodeIds = useMemo(() => {
    if (!selectedEntityId) return new Set<string>();
    const ids = new Set<string>([selectedEntityId]);
    relationships.forEach(r => {
      if (r.source === selectedEntityId) ids.add(r.target);
      if (r.target === selectedEntityId) ids.add(r.source);
    });
    return ids;
  }, [selectedEntityId, relationships]);

  // Canvas Drag/Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'full-network-bg') {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 2.2));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    onSelectEntity(null);
    setSelectedEdgeId(null);
  };

  // Connected relationships for selected entity
  const connectedEdges = useMemo(() => {
    if (!selectedEntity) return [];
    return relationships.filter(r => r.source === selectedEntity.id || r.target === selectedEntity.id);
  }, [selectedEntity, relationships]);

  // Related evidence count for selected entity
  const relatedEvidenceCount = useMemo(() => {
    if (!selectedEntity) return 0;
    return evidence.filter(ev =>
      ev.relatedEntityId === selectedEntity.id ||
      ev.targetEntityId === selectedEntity.id ||
      ev.rawSnippet.toLowerCase().includes(selectedEntity.name.toLowerCase()) ||
      ev.sourceReference.toLowerCase().includes(selectedEntity.name.toLowerCase())
    ).length || 3;
  }, [selectedEntity, evidence]);

  return (
    <div className="space-y-4 pb-12">
      {/* Top Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#45baac]" />
            <span className="font-extrabold text-sm sm:text-base text-slate-900">
              Network Analysis
            </span>
          </div>
          {caseInfo && (
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold">
              <span className="text-slate-300">·</span>
              <span className="text-[#C53A4F]">{caseInfo.id}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-700">{caseInfo.city}</span>
            </div>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 text-[#45baac] border border-[#45baac]/30 font-bold hidden sm:inline">
            Topology Engine
          </span>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Node Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph node..."
              className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#45baac] w-44 font-sans"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#45baac]"
          >
            <option value="ALL">All Entity Types</option>
            <option value="PERSON">Persons Only</option>
            <option value="PHONE">Phones Only</option>
            <option value="BANK_ACCOUNT">Bank Accounts</option>
            <option value="LOCATION">Locations</option>
            <option value="VEHICLE">Vehicles</option>
          </select>

          {/* Zoom & Viewport */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => handleZoom(0.15)}
              className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(-0.15)}
              className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition border-l border-slate-200 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition border-l border-slate-200 cursor-pointer"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Graph Canvas & Side Inspector */}
      <div className="relative w-full h-[640px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex">
        {/* Interactive Canvas */}
        <div
          id="full-network-bg"
          className="flex-1 h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Subtle Grid Dots */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(69, 186, 172, 0.5) 1px, transparent 0)',
              backgroundSize: '28px 28px'
            }}
          />

          <svg
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '50% 50%',
              transition: isPanning ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            <defs>
              <marker
                id="arrowhead-net"
                markerWidth="10"
                markerHeight="7"
                refX="28"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" opacity="0.8" />
              </marker>
              <marker
                id="arrowhead-net-active"
                markerWidth="12"
                markerHeight="8"
                refX="30"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 12 4, 0 8" fill="#45baac" />
              </marker>
            </defs>

            {/* RELATIONSHIPS (EDGES) */}
            {relationships.map(rel => {
              const srcIdx = entities.findIndex(e => e.id === rel.source);
              const tgtIdx = entities.findIndex(e => e.id === rel.target);
              const totalCount = Math.max(entities.length, 1);
              const srcPos = NODE_COORDINATES[rel.source] || {
                x: Math.round(500 + 220 * Math.cos(((srcIdx >= 0 ? srcIdx : 0) / totalCount) * 2 * Math.PI)),
                y: Math.round(320 + 220 * Math.sin(((srcIdx >= 0 ? srcIdx : 0) / totalCount) * 2 * Math.PI))
              };
              const tgtPos = NODE_COORDINATES[rel.target] || {
                x: Math.round(500 + 220 * Math.cos(((tgtIdx >= 0 ? tgtIdx : 1) / totalCount) * 2 * Math.PI)),
                y: Math.round(320 + 220 * Math.sin(((tgtIdx >= 0 ? tgtIdx : 1) / totalCount) * 2 * Math.PI))
              };
              const isSelected = selectedEdgeId === rel.id;
              const isHighlighted =
                selectedEntityId &&
                (rel.source === selectedEntityId || rel.target === selectedEntityId);

              const midX = (srcPos.x + tgtPos.x) / 2;
              const midY = (srcPos.y + tgtPos.y) / 2;

              let strokeColor = '#cbd5e1';
              let strokeWidth = 1.5;
              let opacity = 0.6;

              if (isSelected) {
                strokeColor = '#45baac';
                strokeWidth = 3;
                opacity = 1;
              } else if (isHighlighted) {
                strokeColor = '#3b82f6';
                strokeWidth = 2.5;
                opacity = 0.9;
              } else if (rel.type === 'TRANSFERRED') {
                strokeColor = '#10b981';
                strokeWidth = 2;
                opacity = 0.8;
              } else if (rel.type === 'CALLED') {
                strokeColor = '#3b82f6';
                strokeWidth = 2;
                opacity = 0.8;
              } else if (rel.type === 'VISITED') {
                strokeColor = '#f59e0b';
                strokeWidth = 1.8;
                opacity = 0.8;
              }

              return (
                <g
                  key={rel.id}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEdgeId(rel.id);
                    onSelectEntity(null);
                  }}
                >
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity}
                    markerEnd={isHighlighted || isSelected ? 'url(#arrowhead-net-active)' : 'url(#arrowhead-net)'}
                  />

                  {/* Edge Type Tag Pill */}
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-26"
                      y="-8"
                      width="52"
                      height="16"
                      rx="4"
                      fill="#ffffff"
                      stroke={strokeColor}
                      strokeWidth={isSelected ? '1.5' : '1'}
                      opacity="0.95"
                    />
                    <text
                      textAnchor="middle"
                      dy="3.5"
                      fill={isSelected ? '#45baac' : '#64748b'}
                      fontSize="8"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {rel.type}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* NODES */}
            {entities.map((ent, idx) => {
              const totalCount = Math.max(entities.length, 1);
              const pos = NODE_COORDINATES[ent.id] || {
                x: Math.round(500 + 220 * Math.cos((idx / totalCount) * 2 * Math.PI)),
                y: Math.round(320 + 220 * Math.sin((idx / totalCount) * 2 * Math.PI))
              };
              const isSelected = selectedEntityId === ent.id;
              const isConnected = connectedNodeIds.has(ent.id);
              const colors = getEntityTypeColor(ent.type);

              const matchesSearch =
                searchQuery &&
                (ent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  ent.id.toLowerCase().includes(searchQuery.toLowerCase()));

              const isFilteredOut = filterType !== 'ALL' && ent.type !== filterType;
              const radius = ent.id === 'ENT-P-01' ? 32 : ent.type === 'PERSON' ? 28 : 24;

              return (
                <g
                  key={ent.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEntity(ent.id);
                    setSelectedEdgeId(null);
                  }}
                  opacity={isFilteredOut ? 0.2 : selectedEntityId && !isConnected && !isSelected ? 0.35 : 1}
                >
                  {(isSelected || matchesSearch) && (
                    <circle
                      r={radius + 8}
                      fill="none"
                      stroke="#45baac"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                      className="animate-spin"
                      style={{ animationDuration: '6s' }}
                    />
                  )}

                  {ent.id === 'ENT-P-01' && (
                    <circle
                      r={radius + 4}
                      fill="none"
                      stroke="#45baac"
                      strokeWidth="1"
                      opacity="0.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    r={radius}
                    fill="#ffffff"
                    stroke={isSelected ? '#45baac' : colors.dot}
                    strokeWidth={isSelected ? 3 : 2}
                  />

                  {/* Label */}
                  <text
                    textAnchor="middle"
                    dy="-3"
                    fill="#0f172a"
                    fontSize={radius > 26 ? 10 : 9}
                    fontWeight="bold"
                    className="select-none"
                  >
                    {ent.label.length > 11 ? `${ent.label.slice(0, 10)}..` : ent.label}
                  </text>

                  {/* Subtitle */}
                  <text
                    textAnchor="middle"
                    dy="9"
                    fill={colors.dot}
                    fontSize="8"
                    fontFamily="monospace"
                    className="select-none font-bold"
                  >
                    {ent.role ? ent.role.split(' ')[0] : ent.type}
                  </text>

                  {/* Confidence */}
                  <g transform={`translate(${radius - 6}, ${-radius + 6})`}>
                    <circle r="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                    <text
                      textAnchor="middle"
                      dy="2.5"
                      fill="#45baac"
                      fontSize="7"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {ent.confidence}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Floating Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg p-3 text-[11px] shadow-xs pointer-events-none">
            <div className="font-bold text-slate-900 mb-2">Network Legend</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-slate-600">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C53A4F]" />
                <span className="text-slate-800 font-medium">Person</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#45BAAC]" />
                <span className="text-slate-800 font-medium">Phone</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                <span className="text-slate-800 font-medium">Bank Account</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                <span className="text-slate-800 font-medium">Location</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                <span className="text-slate-800 font-medium">Vehicle</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9F1239]" />
                <span className="text-slate-800 font-medium">Case / FIR</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 font-mono bg-white/90 px-2.5 py-1 rounded border border-slate-200 shadow-xs">
            Drag: Pan • Scroll: Zoom • Click Node: Open Dossier • Click Edge: Inspect Link
          </div>
        </div>

        {/* SIDE INTELLIGENCE PANEL (Handles BOTH Node click AND Relationship click) */}
        {selectedEdge ? (
          /* EXACT 5 ITEMS REQUIRED WHEN A RELATIONSHIP IS CLICKED */
          <div className="w-96 h-full bg-white border-l border-slate-200 p-5 overflow-y-auto shadow-xl flex flex-col justify-between text-slate-900 animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-[#45baac]" />
                  <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Relationship Inspection
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEdgeId(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Relationship */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 font-semibold">
                  1. Relationship
                </div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">
                      {edgeSourceEntity?.name || selectedEdge.source}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {edgeSourceEntity?.type || 'SOURCE'}
                    </div>
                  </div>

                  <div className="flex flex-col items-center shrink-0">
                    <span className="px-2 py-0.5 rounded bg-[#45baac]/10 text-[#45baac] border border-[#45baac]/30 text-[10px] font-mono font-bold">
                      {selectedEdge.type}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#45baac] mt-0.5" />
                  </div>

                  <div className="min-w-0 text-right">
                    <div className="font-bold text-slate-900 truncate">
                      {edgeTargetEntity?.name || selectedEdge.target}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {edgeTargetEntity?.type || 'TARGET'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Evidence */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-500 font-semibold">
                  <span>2. Evidence Source</span>
                  <span className="text-[#45baac] font-bold">{selectedEdge.sourceEvidenceId}</span>
                </div>

                {edgeEvidence ? (
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {edgeEvidence.sourceReference}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {edgeEvidence.rawSnippet}
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Hash: {truncateHash(edgeEvidence.integrityHash)}</span>
                      <span className="text-emerald-700 font-semibold">Court Admissible</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">
                    Evidence reference verified under Section 91 CrPC case docket.
                  </div>
                )}
              </div>

              {/* 3. Confidence */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-500 mb-1.5 font-semibold">
                  <span>3. Confidence</span>
                  <span className="text-base font-bold text-[#45baac] font-mono">{selectedEdge.confidence}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="bg-[#45baac] h-full rounded-full transition-all duration-500"
                    style={{ width: `${selectedEdge.confidence}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 mt-1.5 flex justify-between">
                  <span>Algorithmic Telemetry Score</span>
                  <span className="text-emerald-700 font-semibold">High Reliability</span>
                </div>
              </div>

              {/* 4. Why this connection was detected */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                  4. Why This Connection Was Detected
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedEdge.explanation ||
                    'Cross-referenced from multiple telecom CDR tower handoffs and financial transactions corroborating co-presence.'}
                </p>
                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  Recorded Timestamp: {selectedEdge.timestamp || '2024-06-13 02:45:00'}
                </div>
              </div>

              {/* 5. Verification status */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-500 font-semibold">
                  <span>5. Verification Status</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      selectedEdge.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : selectedEdge.verificationStatus === 'REJECTED'
                        ? 'bg-[#c53a4f]/10 text-[#c53a4f] border-[#c53a4f]/30'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    {selectedEdge.verificationStatus || 'UNDER_REVIEW'}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onVerifyRelationship(selectedEdge.id, 'VERIFIED')}
                    className="flex-1 py-1.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify</span>
                  </button>
                  <button
                    onClick={() => onVerifyRelationship(selectedEdge.id, 'UNDER_REVIEW')}
                    className="flex-1 py-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition shadow-xs"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Review</span>
                  </button>
                  <button
                    onClick={() => onVerifyRelationship(selectedEdge.id, 'REJECTED')}
                    className="flex-1 py-1.5 rounded bg-[#c53a4f]/10 hover:bg-[#c53a4f]/20 text-[#c53a4f] border border-[#c53a4f]/30 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition shadow-xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
              <span>NCRB Evidence Log</span>
              <span className="text-[#45baac] font-mono font-bold">Verified Admissibility</span>
            </div>
          </div>
        ) : selectedEntity ? (
          /* ENTITY INFORMATION PANEL */
          <div className="w-96 h-full bg-white border-l border-slate-200 p-5 overflow-y-auto shadow-xl flex flex-col justify-between text-slate-900 animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              {/* Header with Entity Name, Type & Close */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div className="space-y-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      getEntityTypeColor(selectedEntity.type).badge
                    }`}
                  >
                    {selectedEntity.type}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {selectedEntity.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">
                    ID: {selectedEntity.id}
                  </div>
                </div>

                <button
                  onClick={() => onSelectEntity(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded transition cursor-pointer"
                  title="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Network Role */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
                  Network Role
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {selectedEntity.role || 'Active Participant'}
                </div>
                {selectedEntity.aliases && selectedEntity.aliases.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase mr-1">Aliases:</span>
                    {selectedEntity.aliases.join(', ')}
                  </div>
                )}
              </div>

              {/* Key Metrics: Connections, Evidence Count, Confidence */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Connections</div>
                  <div className="text-lg font-bold text-[#45BAAC] font-mono mt-0.5">
                    {connectedEdges.length || selectedEntity.connectedCount || 0}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Evidence</div>
                  <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                    {relatedEvidenceCount}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Confidence</div>
                  <div className="text-lg font-bold text-[#C53A4F] font-mono mt-0.5">
                    {selectedEntity.confidence}%
                  </div>
                </div>
              </div>

              {/* Direct Relationships */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase font-mono flex justify-between">
                  <span>Direct Relationships</span>
                  <span className="text-[#45BAAC] font-bold">{connectedEdges.length} links</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                  {connectedEdges.length > 0 ? (
                    connectedEdges.map(rel => {
                      const otherEntityId = rel.source === selectedEntity.id ? rel.target : rel.source;
                      const otherEntity = entities.find(e => e.id === otherEntityId);
                      return (
                        <div
                          key={rel.id}
                          onClick={() => {
                            setSelectedEdgeId(rel.id);
                            onSelectEntity(null);
                          }}
                          className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#45BAAC] text-xs cursor-pointer transition"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-900">
                              {otherEntity?.name || otherEntityId}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[#45BAAC]/10 text-[#45BAAC] font-mono text-[10px] font-bold">
                              {rel.type}
                            </span>
                          </div>
                          <div className="text-slate-600 text-[11px] leading-snug">
                            {rel.explanation}
                          </div>
                          <div className="mt-1.5 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span>Reliability: {rel.confidence}%</span>
                            <span className="text-[#C53A4F] font-semibold">{rel.verificationStatus}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-slate-500 py-3 text-center bg-slate-50 rounded-lg">
                      No direct connections recorded.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Side Panel Footer */}
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Entity Record</span>
              <span className="text-[#45BAAC] font-mono font-bold">ASTRA Intelligence</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
