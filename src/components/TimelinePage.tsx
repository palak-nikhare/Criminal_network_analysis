import React, { useState, useMemo } from 'react';
import {
  Clock,
  Calendar,
  Filter,
  PhoneCall,
  CreditCard,
  MapPin,
  Users,
  AlertTriangle,
  Play,
  RotateCcw,
  Tag,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { TimelineEvent } from '../types';
import { CaseOption } from '../data/casesDataset';

interface TimelinePageProps {
  events: TimelineEvent[];
  onSelectEntity?: (entityId: string) => void;
  caseInfo?: CaseOption;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ events, onSelectEntity, caseInfo }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const structuredDays = useMemo(() => {
    if (!events || events.length === 0) return [];
    
    // Group events by day string
    const map = new Map<string, any[]>();
    events.forEach(ev => {
      const d = new Date(ev.timestamp);
      const dayKey = isNaN(d.getTime()) 
        ? ev.timestamp.slice(0, 10) 
        : d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase();
      
      const timeStr = isNaN(d.getTime()) 
        ? '12:00 PM' 
        : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let icon = Clock;
      let color = 'text-slate-700 border-slate-200 bg-slate-50';
      if (ev.type === 'COMMUNICATION') {
        icon = PhoneCall;
        color = 'text-blue-700 border-blue-200 bg-blue-50';
      } else if (ev.type === 'FINANCIAL') {
        icon = CreditCard;
        color = 'text-emerald-700 border-emerald-200 bg-emerald-50';
      } else if (ev.type === 'LOCATION') {
        icon = MapPin;
        color = 'text-amber-700 border-amber-200 bg-amber-50';
      } else if (ev.type === 'ANOMALY') {
        icon = AlertTriangle;
        color = 'text-[#C53A4F] border-[#C53A4F]/30 bg-[#C53A4F]/10';
      }

      const item = {
        id: ev.id,
        time: timeStr,
        title: ev.type.charAt(0) + ev.type.slice(1).toLowerCase() + ' Record',
        subtitle: ev.description,
        type: ev.type,
        evidenceTag: ev.evidenceId,
        confidence: (ev as any).confidenceScore ?? ev.confidence ?? 95,
        icon,
        color
      };

      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
      map.get(dayKey)!.push(item);
    });

    return Array.from(map.entries()).map(([date, items]) => ({
      date,
      items
    }));
  }, [events]);

  const filteredDays = structuredDays.map(day => ({
    ...day,
    items: day.items.filter(item => selectedFilter === 'ALL' || item.type === selectedFilter)
  })).filter(day => day.items.length > 0);

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#C53A4F]/10 border border-[#C53A4F]/20 text-[#C53A4F] text-xs font-semibold mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Chronological Reconstruction</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Investigation Timeline
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
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Reconstructed sequence of suspect movements, phone communications, and financial flows for {caseInfo ? `${caseInfo.id} (${caseInfo.city})` : 'the active case'}.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'COMMUNICATION', 'FINANCIAL', 'LOCATION', 'ANOMALY'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedFilter === category
                  ? 'bg-[#C53A4F] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Investigation Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="relative pl-6 sm:pl-10 space-y-8">
          {/* Central Vertical Spine (│) */}
          <div className="absolute left-6 sm:left-10 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#C53A4F] via-[#45BAAC] to-slate-200" />

          {filteredDays.map(day => (
            <div key={day.date} className="relative space-y-4">
              {/* Date Header: 14 JUN / 15 JUN / 16 JUN */}
              <div className="relative flex items-center -ml-6 sm:-ml-10">
                <div className="w-16 sm:w-20 text-center font-mono font-extrabold text-xs sm:text-sm text-[#C53A4F] bg-white py-1 px-2 rounded-lg border border-[#C53A4F]/30 shadow-xs shrink-0 z-10">
                  {day.date}
                </div>
                <div className="h-px bg-slate-200 flex-1 ml-3" />
              </div>

              {/* Items under this date */}
              <div className="space-y-4 pl-4 sm:pl-6">
                {day.items.map(item => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="relative p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs group"
                    >
                      {/* Node Bullet On Vertical Spine */}
                      <div className="absolute -left-[27px] sm:-left-[35px] top-5 w-4 h-4 rounded-full bg-white border-2 border-[#C53A4F] flex items-center justify-center shadow-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C53A4F]" />
                      </div>

                      {/* Content Header: Icon + Title + Time */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200/80">
                        <div className="flex items-center space-x-2.5">
                          <div className={`p-1.5 rounded-lg border ${item.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                            {item.title}
                          </h4>
                        </div>

                        <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </div>
                      </div>

                      {/* Subtitle / Details */}
                      <p className="text-xs text-slate-600 my-2 leading-relaxed">
                        {item.subtitle}
                      </p>

                      {/* Evidence Tag & Confidence */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] font-mono">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-500">Evidence Tag:</span>
                          <span className="px-2 py-0.5 rounded bg-white text-[#45BAAC] border border-slate-200 font-bold">
                            [{item.evidenceTag}]
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{item.confidence}% Corroboration</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
