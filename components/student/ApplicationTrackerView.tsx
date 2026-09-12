'use client';

import React from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import { Opportunity } from '@/lib/types';
import {
  CheckCircle2,
  Briefcase,
  Building,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';

type BoardColumnId = 'Saved' | 'Applied' | 'Assessment' | 'Interview' | 'Offer';

export default function ApplicationTrackerView() {
  const { opportunities, updateOpportunityStatus, addToast, setActiveTab } = useCareerOS();

  const columns: { id: BoardColumnId; label: string; color: string; badgeBg: string }[] = [
    { id: 'Saved', label: 'Saved Roles', color: 'border-slate-500 text-slate-300', badgeBg: 'bg-slate-500/20 text-slate-300' },
    { id: 'Applied', label: 'Applied', color: 'border-indigo-500 text-indigo-300', badgeBg: 'bg-indigo-500/20 text-indigo-300' },
    { id: 'Assessment', label: 'Tech Assessment', color: 'border-purple-500 text-purple-300', badgeBg: 'bg-purple-500/20 text-purple-300' },
    { id: 'Interview', label: 'Interview Scheduled', color: 'border-cyan-500 text-cyan-300', badgeBg: 'bg-cyan-500/20 text-cyan-300' },
    { id: 'Offer', label: 'Offer Received', color: 'border-emerald-500 text-emerald-300', badgeBg: 'bg-emerald-500/20 text-emerald-300' },
  ];

  const handleAdvanceStatus = (id: string, currentStatus?: Opportunity['applicationStatus']) => {
    let next: BoardColumnId = 'Applied';
    if (!currentStatus || currentStatus === 'Saved') next = 'Applied';
    else if (currentStatus === 'Applied') next = 'Assessment';
    else if (currentStatus === 'Assessment') next = 'Interview';
    else if (currentStatus === 'Interview') next = 'Offer';
    else return;

    updateOpportunityStatus(id, next);
    addToast('Pipeline Stage Updated', `Moved to ${next.toUpperCase()}`, 'success');
  };

  const activeAppsCount = opportunities.filter((o) => o.applied || o.applicationStatus !== 'Saved').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 font-mono">
              Placement Pipeline Tracking
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{activeAppsCount} Active Enterprise Pipelines</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            <span>Placement &amp; Application Pipeline</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Monitor real-time status transitions across enterprise recruiters. When your verified Skill Passport upgrades,
            recruiter pipelines reflect your verified capabilities immediately.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('opportunities')}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Briefcase className="w-4 h-4" />
          <span>Browse Matching Roles</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex xl:grid xl:grid-cols-5 gap-4 overflow-x-auto pb-4 scrollbar-none snap-x -mx-3 px-3 sm:mx-0 sm:px-0">
        {columns.map((col) => {
          const colApps = opportunities.filter(
            (o) => (o.applicationStatus || 'Saved') === col.id
          );
          return (
            <div
              key={col.id}
              className="bg-[#090F1E] border border-[#1E293B] rounded-3xl p-4 flex flex-col w-[280px] sm:w-[300px] xl:w-auto shrink-0 xl:shrink snap-center"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E293B] mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      col.id === 'Offer'
                        ? 'bg-emerald-400'
                        : col.id === 'Interview'
                        ? 'bg-cyan-400'
                        : col.id === 'Assessment'
                        ? 'bg-purple-400'
                        : col.id === 'Applied'
                        ? 'bg-indigo-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>{col.label}</h3>
                </div>
                <span className="text-xs font-mono font-bold bg-[#131E35] text-slate-300 px-2 py-0.5 rounded-full">
                  {colApps.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1">
                {colApps.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E293B] hover:border-slate-600 shadow-md space-y-2.5 text-xs transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-white text-xs leading-snug">{opp.title}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-slate-500" />
                          <span>{opp.company}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0">
                        {opp.matchScore}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-[#1E293B]">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{opp.location}</span>
                      </span>
                      <span className="text-slate-300 font-mono shrink-0">{opp.stipendOrSalary}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#080E1B] border border-[#1E293B] text-[11px] text-slate-300 leading-snug">
                      <span className="text-slate-400 font-medium">Readiness: </span>
                      {opp.matchReason.substring(0, 95)}...
                    </div>

                    {col.id !== 'Offer' && (
                      <button
                        onClick={() => handleAdvanceStatus(opp.id, opp.applicationStatus)}
                        className="w-full mt-1 py-1.5 rounded-lg bg-[#152038] hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/20 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Advance Stage</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="py-10 text-center text-slate-600 text-xs italic">No roles in this stage.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
