'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Target,
  Sparkles,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';

export default function SkillGapView() {
  const { student, skillGaps, setActiveTab } = useCareerOS();

  const [activeGapExplanation, setActiveGapExplanation] = useState<{
    skill: string;
    loading: boolean;
    text: string | null;
  }>({
    skill: '',
    loading: false,
    text: null,
  });

  const handleAskAi = async (skillName: string, currentLevel: number, requiredLevel: number) => {
    setActiveGapExplanation({ skill: skillName, loading: true, text: null });
    try {
      const res = await fetch('/api/ai/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillName,
          currentLevel,
          requiredLevel,
          targetRole: student.targetRole,
        }),
      });
      const data = await res.json();
      setActiveGapExplanation({
        skill: skillName,
        loading: false,
        text: data.industryDemandExplanation || data.reason,
      });
    } catch {
      setActiveGapExplanation({
        skill: skillName,
        loading: false,
        text: 'Industry demand in 2026 mandates this capability for real-time model inference and high-concurrency systems.',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 font-mono">
              Target Delta Intelligence
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Target Role: {student.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Target className="w-7 h-7 text-amber-400" />
            <span>Skill Gap & Skill ROI Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            CareerOS measures not just what you know, but the exact mathematical distance between your verified
            capabilities and live enterprise job mandates. Prioritize by learning ROI (Market Value ÷ Effort).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('interventions')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Interventions Studio</span>
          </button>
        </div>
      </div>

      {/* Skill ROI 2x2 Matrix Overview */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Skill ROI Strategic Matrix</h3>
            <p className="text-xs text-slate-400 mt-0.5">Optimizing your time allocation for maximum placement conversion</p>
          </div>
          <span className="text-xs font-mono bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
            Impact vs Effort Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quadrant 1: Quick Wins */}
          <div className="p-4 rounded-2xl bg-[#090F1E] border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Quick Wins (High Impact, Low Effort)
              </span>
              <span className="text-[10px] font-mono text-emerald-300 font-bold">Priority Tier 1</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Fast-track credentials and assessments that take &lt;2 weeks but unlock multiple role filters.
            </p>
            <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#1E293B] text-xs flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200">Docker Containerization & Health Probes</span>
                <div className="text-[10px] text-slate-400">Current: 65% → Target: 80% • Effort: 1.5 wks</div>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-400">+8% Match</span>
            </div>
          </div>

          {/* Quadrant 2: Strategic Transformative */}
          <div className="p-4 rounded-2xl bg-[#090F1E] border border-cyan-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Strategic Transformative (High Impact, High Effort)
              </span>
              <span className="text-[10px] font-mono text-cyan-300 font-bold">Core Sprints</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Foundational architectural mastery required by &gt;85% of tier-1 enterprise platforms.
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#1E293B] text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-200">Node.js & Streaming Backend APIs</span>
                  <div className="text-[10px] text-slate-400">Current: 54% → Target: 85% • Effort: 3 wks</div>
                </div>
                <span className="text-xs font-bold font-mono text-red-400">-31% Gap</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#1E293B] text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-200">Kubernetes & Production Cloud Deployments</span>
                  <div className="text-[10px] text-slate-400">Current: 48% → Target: 75% • Effort: 4 wks</div>
                </div>
                <span className="text-xs font-bold font-mono text-amber-400">-27% Gap</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Comparison Table */}
      <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Active Skill Gap Inventory</h3>
            <p className="text-xs text-slate-400 mt-0.5">Prioritized by industry demand weighting</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{skillGaps.length} Target Gaps</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] text-slate-400 uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Skill & Domain</th>
                <th className="pb-3 font-semibold">Current Level</th>
                <th className="pb-3 font-semibold">Target Level</th>
                <th className="pb-3 font-semibold">Deficit Gap</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold">Market Rationale</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/60">
              {skillGaps.map((gap) => (
                <tr key={gap.id} className="hover:bg-[#121E36]/50 transition-colors">
                  <td className="py-4 pr-3 font-bold text-slate-100">
                    <div>{gap.skillName}</div>
                    <div className="text-[10px] text-slate-500 font-normal font-mono">UUID: {gap.id}</div>
                  </td>
                  <td className="py-4 pr-3 font-mono font-semibold text-amber-400">{gap.currentLevel}%</td>
                  <td className="py-4 pr-3 font-mono font-semibold text-emerald-400">{gap.requiredLevel}%</td>
                  <td className="py-4 pr-3 font-mono font-bold text-red-400">-{gap.gap}%</td>
                  <td className="py-4 pr-3">
                    <span
                      className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-full ${
                        gap.priority === 'critical'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : gap.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {gap.priority}
                    </span>
                  </td>
                  <td className="py-4 pr-3 text-slate-300 max-w-xs leading-relaxed">
                    <p className="truncate hover:whitespace-normal">{gap.reason}</p>
                    <button
                      onClick={() => handleAskAi(gap.skillName, gap.currentLevel, gap.requiredLevel)}
                      className="text-[11px] text-cyan-300 hover:text-cyan-200 mt-0.5 flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Ask AI Why</span>
                    </button>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => setActiveTab('interventions')}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors whitespace-nowrap"
                    >
                      Resolve Gap →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Explanation Drawer */}
        {activeGapExplanation.skill && (
          <div className="p-4 rounded-2xl bg-[#091122] border border-cyan-500/40 text-xs mt-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-semibold text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Market Analysis: Why {activeGapExplanation.skill} is Critical for {student.targetRole}</span>
              </div>
              <button
                onClick={() => setActiveGapExplanation({ skill: '', loading: false, text: null })}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {activeGapExplanation.loading ? (
              <div className="text-slate-400 animate-pulse py-2">Consulting live AI intelligence...</div>
            ) : (
              <p className="text-slate-200 leading-relaxed">{activeGapExplanation.text}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
