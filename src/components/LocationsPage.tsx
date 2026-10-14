import React, { useState } from 'react';
import {
  MapPin,
  Users,
  Calendar,
  Car,
  Clock,
  Compass,
  Layers,
  Radio,
  ShieldCheck,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  FileCheck2,
  Navigation,
  Eye,
  AlertCircle
} from 'lucide-react';
import { Entity } from '../types';
import { CaseOption, SyntheticLocation } from '../data/casesDataset';

interface LocationsPageProps {
  entities: Entity[];
  onSelectEntity?: (entityId: string) => void;
  locations?: SyntheticLocation[];
  caseInfo?: CaseOption;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ entities, onSelectEntity, locations: passedLocations, caseInfo }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);

  const fallbackLocations: SyntheticLocation[] = [
    {
      id: 'LOC-03',
      name: 'BANER TECH HUB',
      fullAddress: 'High Street Corporate Park, Baner, Pune, MH 411045',
      coords: { x: 22, y: 26 },
      labelOffset: { x: 20, y: -24, align: 'left' },
      personsCount: 3,
      eventsCount: 4,
      vehiclesCount: 2,
      casesCount: 2,
      activityPeriod: '10–15 JUN',
      persons: ['Rohan Kulkarni', 'Neha Patil', 'Arjun Mehta'],
      vehicles: ['MH-12-AB-1234 (Scorpio)', 'DL-01-TX-8832 (Honda City)'],
      events: [
        '11 JUN 11:30 - Registered shell office for Company Alpha Ltd established',
        '15 JUN 10:05 - RTGS wire transfer dispatched from corporate terminal IP'
      ],
      coPresenceConfidence: 91,
      hotspotType: 'Shell Corporate Office'
    },
    {
      id: 'LOC-02',
      name: 'SHIVAJINAGAR TRANSIT HUB',
      fullAddress: 'Railway Concourse & Central Bus Depot, Shivajinagar, Pune, MH 411005',
      coords: { x: 44, y: 38 },
      labelOffset: { x: -20, y: -24, align: 'right' },
      personsCount: 2,
      eventsCount: 2,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '12–13 JUN',
      persons: ['Sameer Shah', 'Rohan Kulkarni'],
      vehicles: ['MH-12-AB-1234 (Scorpio)'],
      events: [
        '12 JUN 14:15 - Physical courier bag exchange verified via Station CCTV Cam 4',
        '13 JUN 19:40 - Burner handset ping logged on Cell Tower 401 sector C'
      ],
      coPresenceConfidence: 86,
      hotspotType: 'Transit Interchange'
    },
    {
      id: 'LOC-01',
      name: 'PUNE CAMP',
      fullAddress: 'East Street Commercial Hub, Pune Camp, Pune, MH 411001',
      coords: { x: 60, y: 56 },
      labelOffset: { x: 24, y: 16, align: 'left' },
      personsCount: 4,
      eventsCount: 3,
      vehiclesCount: 2,
      casesCount: 2,
      activityPeriod: '14–16 JUN',
      persons: ['Arjun Mehta', 'Sameer Shah', 'Neha Patil', 'Rohan Kulkarni'],
      vehicles: ['MH-12-AB-1234 (Scorpio)', 'MH-14-CC-9021 (Swift)'],
      events: [
        '14 JUN 09:15 - Vehicle MH-12 entry logged via Toll ANPR Camera',
        '14 JUN 18:30 - Cell tower handoff confirmed for Phone-101 & Phone-102 simultaneously',
        '15 JUN 14:00 - Physical meeting observed in surveillance log at Cafe Rendezvous'
      ],
      coPresenceConfidence: 94,
      hotspotType: 'Primary Rendezvous'
    },
    {
      id: 'LOC-04',
      name: 'HADAPSAR INDUSTRIAL DROP',
      fullAddress: 'Phase 2 Logistics Corridor, Magarpatta Road, Hadapsar, Pune, MH 411028',
      coords: { x: 80, y: 72 },
      labelOffset: { x: -20, y: 16, align: 'right' },
      personsCount: 2,
      eventsCount: 1,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '14 JUN',
      persons: ['Sameer Shah', 'Arjun Mehta'],
      vehicles: ['MH-14-CC-9021 (Swift)'],
      events: [
        '14 JUN 21:00 - ANPR sighting of vehicle exiting logistics lane after dark'
      ],
      coPresenceConfidence: 82,
      hotspotType: 'Dead Drop Point'
    }
  ];

  const syntheticLocations = (passedLocations && passedLocations.length > 0) ? passedLocations : fallbackLocations;
  const [selectedLocationId, setSelectedLocationId] = useState<string>(syntheticLocations[0]?.id || 'LOC-01');
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  // Sync selected location when locations change
  React.useEffect(() => {
    if (syntheticLocations.length > 0 && !syntheticLocations.some(l => l.id === selectedLocationId)) {
      setSelectedLocationId(syntheticLocations[0].id);
    }
  }, [syntheticLocations, selectedLocationId]);

  const activeLoc = syntheticLocations.find(l => l.id === selectedLocationId) || syntheticLocations[0];

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(1.4, Math.max(0.8, Number((prev + delta).toFixed(1)))));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedLocationId('LOC-01');
  };

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. CLEAN MAP HEADER (WITH CASE IDENTIFIER)                                */}
      {/* ========================================================================= */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Locations & Hotspots
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
        <p className="text-sm text-slate-600 max-w-2xl">
          Analyze cell tower handoffs, vehicle camera sightings, and physical associations for {caseInfo ? `${caseInfo.id} (${caseInfo.city})` : 'the active case'}.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. DEDICATED GEOSPATIAL VISUALIZATION MAP CARD                             */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Dedicated Map Top Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 font-mono text-slate-700">
            <Compass className="w-4 h-4 text-[#C53A4F]" />
            <span className="font-bold">GRID: {caseInfo ? caseInfo.city.toUpperCase() : 'PUNE'} JURISDICTIONAL SECTOR</span>
            <span className="text-slate-400 hidden sm:inline">• Active Case {caseInfo?.id || 'FIR-2026-089'}</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-mono hidden md:inline">Click pin to inspect hotspot</span>
            <button
              onClick={() => setShowCorridors(!showCorridors)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition cursor-pointer flex items-center space-x-1.5 ${
                showCorridors
                  ? 'bg-white text-slate-800 border-slate-300 shadow-2xs'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#45BAAC]" />
              <span>Corridors {showCorridors ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Spacious Map Canvas Container (Min-height: 480px) */}
        <div className="relative w-full h-[460px] sm:h-[500px] min-h-[440px] bg-slate-50/70 select-none overflow-hidden">
          {/* Inner Zoom Container */}
          <div
            className="absolute inset-0 transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* SVG Background: Grid + Synthesized Arteries + Corridor Links */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none">
              <defs>
                <pattern id="geo-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                  <circle cx="48" cy="48" r="1.5" fill="#cbd5e1" />
                </pattern>
                <linearGradient id="corridor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C53A4F" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#45BAAC" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9A6599" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Grid backdrop */}
              <rect width="100%" height="100%" fill="url(#geo-grid)" />

              {/* Synthesized Topographic Arteries (Non-distracting roads) */}
              <path
                d="M 20 180 Q 240 220 460 320 T 920 480"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 320 40 Q 420 220 580 290 T 840 520"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Corridor Connections between hotspots (only when toggled on) */}
              {showCorridors && (
                <g className="transition-opacity duration-300">
                  {/* Baner to Shivajinagar */}
                  <line
                    x1="22%"
                    y1="26%"
                    x2="44%"
                    y2="38%"
                    stroke="#C53A4F"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    strokeOpacity="0.85"
                  />
                  {/* Shivajinagar to Pune Camp */}
                  <line
                    x1="44%"
                    y1="38%"
                    x2="60%"
                    y2="56%"
                    stroke="#45BAAC"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeOpacity="0.95"
                  />
                  {/* Pune Camp to Hadapsar */}
                  <line
                    x1="60%"
                    y1="56%"
                    x2="80%"
                    y2="72%"
                    stroke="#9A6599"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    strokeOpacity="0.85"
                  />
                </g>
              )}

              {/* Cellular coverage radius indicators */}
              {syntheticLocations.map(loc => {
                const isSelected = activeLoc.id === loc.id;
                return (
                  <circle
                    key={`circle-${loc.id}`}
                    cx={`${loc.coords.x}%`}
                    cy={`${loc.coords.y}%`}
                    r={isSelected ? 48 : 34}
                    fill={isSelected ? '#C53A4F' : '#45BAAC'}
                    fillOpacity={isSelected ? 0.08 : 0.04}
                    stroke={isSelected ? '#C53A4F' : '#45BAAC'}
                    strokeWidth={isSelected ? 1.5 : 1}
                    strokeDasharray={isSelected ? 'none' : '3 3'}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Intelligent Offset Connectors between Markers and Labels */}
              {syntheticLocations.map(loc => {
                // Determine label anchor point
                const startX = loc.coords.x;
                const startY = loc.coords.y;
                const endX = loc.coords.x + (loc.labelOffset.x > 0 ? 3.5 : -3.5);
                const endY = loc.coords.y + (loc.labelOffset.y > 0 ? 3.5 : -3.5);

                return (
                  <line
                    key={`leader-${loc.id}`}
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeOpacity="0.7"
                  />
                );
              })}
            </svg>

            {/* Non-Overlapping Interactive Hotspot Markers + Dynamically Positioned Labels */}
            {syntheticLocations.map(loc => {
              const isSelected = activeLoc.id === loc.id;
              const isHovered = hoveredLocationId === loc.id;

              return (
                <div
                  key={loc.id}
                  style={{
                    left: `${loc.coords.x}%`,
                    top: `${loc.coords.y}%`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Interactive Pin Anchor */}
                  <div
                    onClick={() => setSelectedLocationId(loc.id)}
                    onMouseEnter={() => setHoveredLocationId(loc.id)}
                    onMouseLeave={() => setHoveredLocationId(null)}
                    className="relative cursor-pointer group flex items-center justify-center"
                    tabIndex={0}
                    role="button"
                    aria-label={`Hotspot ${loc.name}`}
                  >
                    {/* Animated radar ripple for active pin */}
                    {isSelected && (
                      <span className="absolute w-12 h-12 rounded-full border-2 border-[#C53A4F] animate-ping opacity-50 pointer-events-none" />
                    )}

                    {/* Pin Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 shadow-sm ${
                        isSelected
                          ? 'bg-[#C53A4F] text-white scale-115 ring-4 ring-[#C53A4F]/25 z-30'
                          : isHovered
                          ? 'bg-slate-900 text-white scale-110 ring-2 ring-slate-400 z-25'
                          : 'bg-white text-slate-800 border-2 border-slate-300 hover:border-[#C53A4F] z-20'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Dynamically Positioned Non-Overlapping Label */}
                  <div
                    onClick={() => setSelectedLocationId(loc.id)}
                    style={{
                      transform: `translate(${loc.labelOffset.x}px, ${loc.labelOffset.y}px)`
                    }}
                    className={`absolute cursor-pointer transition-all duration-150 z-30 ${
                      loc.labelOffset.align === 'right'
                        ? 'right-full mr-2.5 top-1/2 -translate-y-1/2 text-right'
                        : loc.labelOffset.align === 'left'
                        ? 'left-full ml-2.5 top-1/2 -translate-y-1/2 text-left'
                        : 'left-1/2 -translate-x-1/2 mt-2 text-center'
                    }`}
                  >
                    <div
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap shadow-xs transition ${
                        isSelected
                          ? 'bg-[#C53A4F] text-white border border-[#C53A4F]'
                          : isHovered
                          ? 'bg-slate-900 text-white border border-slate-800'
                          : 'bg-white/95 text-slate-800 border border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {loc.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dedicated Map Controls in Top-Right Corner */}
          <div className="absolute top-4 right-4 z-30 flex flex-col space-y-1.5 bg-white/90 backdrop-blur border border-slate-200 p-1.5 rounded-xl shadow-xs">
            <button
              onClick={() => handleZoom(0.1)}
              title="Zoom In"
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 transition cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(-0.1)}
              title="Zoom Out"
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 transition cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              title="Reset View"
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dedicated Compact Legend in Bottom-Left Corner */}
          <div className="absolute bottom-4 left-4 z-30 bg-white/95 backdrop-blur border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C53A4F] inline-block shadow-2xs"></span>
              <span className="font-semibold text-slate-800">Selected Hotspot</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-white border-2 border-slate-400 inline-block"></span>
              <span className="text-slate-600">Monitored Site</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-[#45BAAC] inline-block"></span>
              <span className="text-slate-600">Transit Corridor</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SEPARATE FULL-WIDTH HOTSPOT INTELLIGENCE DOSSIER CARD                   */}
      {/* Generous visual gap (mt-12) between map and dossier                       */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Dossier Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C53A4F]">
                Hotspot Intelligence Dossier
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {activeLoc.hotspotType}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {activeLoc.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {activeLoc.fullAddress}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-center">
            <div className="px-3.5 py-1.5 rounded-lg bg-[#45BAAC]/10 border border-[#45BAAC]/30 text-[#45BAAC] text-xs font-mono font-bold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{activeLoc.coPresenceConfidence}% Corroborated Presence</span>
            </div>
          </div>
        </div>

        {/* Suspect & Sighting Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-medium text-slate-500">Co-Present Suspects</div>
            <div className="text-2xl font-bold text-slate-900 font-mono flex items-center space-x-1.5">
              <Users className="w-5 h-5 text-[#C53A4F]" />
              <span>{activeLoc.personsCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Linked entities</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-medium text-slate-500">Recorded Sightings</div>
            <div className="text-2xl font-bold text-[#45BAAC] font-mono flex items-center space-x-1.5">
              <Clock className="w-5 h-5 text-[#45BAAC]" />
              <span>{activeLoc.eventsCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">CCTV & Cell pings</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-medium text-slate-500">Identified Vehicles</div>
            <div className="text-2xl font-bold text-slate-900 font-mono flex items-center space-x-1.5">
              <Car className="w-5 h-5 text-[#9A6599]" />
              <span>{activeLoc.vehiclesCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">ANPR logged</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-medium text-slate-500">Activity Period</div>
            <div className="text-base font-bold text-slate-900 font-mono pt-1">
              {activeLoc.activityPeriod}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Primary surveillance window</div>
          </div>
        </div>

        {/* Two-Column Deep Inspection: Co-Present Suspects & Logged Sightings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          {/* Column 1: Co-Present Suspects & Vehicles */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-800 uppercase font-bold tracking-wider">
                <Users className="w-4 h-4 text-[#C53A4F]" />
                <span>Co-Present Suspects at this Location</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeLoc.persons.map((personName, idx) => {
                  const matchedEntity = entities.find(e => e.name.toLowerCase() === personName.toLowerCase());
                  return (
                    <div
                      key={idx}
                      onClick={() => matchedEntity && onSelectEntity && onSelectEntity(matchedEntity.id)}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#C53A4F] transition cursor-pointer flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#C53A4F] transition-colors">
                          {personName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {matchedEntity?.role || 'Syndicate Participant'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#C53A4F] transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Logged Vehicles */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-800 uppercase font-bold tracking-wider">
                <Car className="w-4 h-4 text-[#9A6599]" />
                <span>Corroborated Vehicles</span>
              </div>

              <div className="space-y-2">
                {activeLoc.vehicles.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 flex items-center space-x-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#9A6599]"></span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Chronological Sightings & Evidentiary Support */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-800 uppercase font-bold tracking-wider">
                <Clock className="w-4 h-4 text-[#45BAAC]" />
                <span>Recorded Sightings & Telemetry Events</span>
              </div>

              <div className="space-y-3">
                {activeLoc.events.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 leading-relaxed space-y-1"
                  >
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-[#45BAAC] font-bold">
                      <span>Event #{idx + 1}</span>
                      <span>•</span>
                      <span>Verified Telemetry</span>
                    </div>
                    <p className="text-slate-700">
                      {ev}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidentiary Admissibility Notice */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
              <FileCheck2 className="w-4 h-4 text-[#45BAAC] shrink-0 mt-0.5" />
              <div className="space-y-0.5 leading-relaxed">
                <span className="font-bold text-slate-800">Geospatial Admissibility: </span>
                Cell tower dwell periods and ANPR optical recognition timestamps are cryptographically anchored to comply with Section 65B evidential standards.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
