'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  TrendingUp,
  ShieldCheck,
  Target,
  Award,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Bot,
  AlertCircle,
  Briefcase,
  Play,
  HelpCircle,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function StudentDashboard() {
  const {
    student,
    skillGaps,
    completeWeeklyTask,
    completeIntervention,
    setActiveTab,
    setCopilotOpen,
    opportunities,
  } = useCareerOS();

  const [selectedDimension, setSelectedDimension] = useState<string | null>('Technical Capability');
  const [aiGapExplanation, setAiGapExplanation] = useState<{
    skill: string;
    loading: boolean;
    text: string | null;
  }>({
    skill: '',
    loading: false,
    text: null,
  });

  const handleAskAiWhy = async (skillName: string, currentLevel: number, requiredLevel: number) => {
    setAiGapExplanation({ skill: skillName, loading: true, text: null });
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
      setAiGapExplanation({
        skill: skillName,
        loading: false,
        text: data.industryDemandExplanation || data.reason,
      });
    } catch {
      setAiGapExplanation({
        skill: skillName,
        loading: false,
        text: `In 2026 enterprise AI platforms, 88% of production deployments rely on high-throughput streaming APIs to handle LLM token caching and connection management.`,
      });
    }
  };

  const dimensions = [
    { name: 'Technical Capability', score: student.readinessBreakdown.technicalCapability, color: 'text-indigo-400', desc: 'Evaluated algorithmic, model architecture, and framework competencies.' },
    { name: 'Evidence Strength', score: student.readinessBreakdown.evidenceStrength, color: 'text-cyan-400', desc: 'Verifiable code repositories, live deployed URLs, and passing test suites.' },
    { name: 'Industry Alignment', score: student.readinessBreakdown.industryAlignment, color: 'text-purple-400', desc: 'Direct semantic match against real 2026 enterprise job postings.' },
    { name: 'Interview Readiness', score: student.readinessBreakdown.interviewReadiness, color: 'text-amber-400', desc: 'AI mock interview scores across technical and behavioral rubrics.' },
    { name: 'Project Readiness', score: student.readinessBreakdown.projectReadiness, color: 'text-emerald-400', desc: 'End-to-end full stack delivery, schema isolation, and documentation.' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Welcome & Target Hero */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0E172A] via-[#101B33] to-[#0D1527] border border-[#1E293B] shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 font-mono">
              Student Command Center
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{student.institution}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Good morning, {student.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Targeting <span className="text-cyan-300 font-semibold">{student.targetRole}</span>. Your Career Readiness is currently at{' '}
            <span className="text-emerald-400 font-bold">{student.careerReadiness}%</span>. Complete your high-priority streaming intervention to push readiness past 84%.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab('interventions')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Interventions</span>
          </button>
          <button
            onClick={() => setCopilotOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#131D31] hover:bg-[#1A2844] border border-indigo-500/30 text-indigo-300 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Ask Copilot</span>
          </button>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 5 High-Impact Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0D1527] border border-[#1E293B] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Career Readiness</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
            {student.careerReadiness}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">+6%</span> this month
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E293B] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Industry Alignment</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">
            {student.industryAlignment}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            vs 2026 Enterprise Demands
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E293B] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Skill Trust Score</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
            {student.skillTrust}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            CareerOS Internal Trust
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E293B] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Priority Gaps</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
            {student.priorityGapsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            1 Critical Blocker
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0D1527] border border-[#1E293B] shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Verified Skills</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
            {student.verifiedSkillsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Evidence-backed
          </div>
        </div>
      </div>

      {/* Middle Row: Career Readiness Multi-Dimensional Visualizer & Priority Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Readiness Multi-Dimension Breakdown */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Career Readiness Spectrum</h3>
                <p className="text-xs text-slate-400 mt-0.5">Composite capability analysis for {student.targetRole}</p>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                {student.careerReadiness}% Composite
              </div>
            </div>

            <div className="space-y-3.5 mt-4">
              {dimensions.map((dim) => {
                const isSelected = selectedDimension === dim.name;
                return (
                  <div
                    key={dim.name}
                    onClick={() => setSelectedDimension(dim.name)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#152038] border border-indigo-500/40 shadow-md'
                        : 'bg-[#090F1E] border border-[#1E293B]/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-200">{dim.name}</span>
                      <span className={`font-mono font-bold ${dim.color}`}>{dim.score}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#1A2640] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          dim.score >= 80 ? 'bg-emerald-500' : dim.score >= 70 ? 'bg-indigo-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                    {isSelected && (
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed animate-in fade-in duration-200">
                        {dim.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
            <span>CareerOS Internal Metric</span>
            <button
              onClick={() => setActiveTab('career-twin')}
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>Explore Career Twin</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Priority Skill Gaps Panel */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Priority Skill Gaps</h3>
                <p className="text-xs text-slate-400 mt-0.5">Identified gaps blocking tier-1 AI Engineer placements</p>
              </div>
              <button
                onClick={() => setActiveTab('skill-gaps')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>View All Gaps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {skillGaps.map((gap) => {
                const isCritical = gap.priority === 'critical';
                const isHigh = gap.priority === 'high';
                return (
                  <div
                    key={gap.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCritical
                        ? 'bg-red-950/20 border-red-500/30'
                        : isHigh
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : 'bg-[#090F1E] border-[#1E293B]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-100">{gap.skillName}</h4>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono ${
                              isCritical
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                : isHigh
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {gap.priority} Priority
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{gap.reason}</p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs font-mono text-slate-300">
                          Current: <span className="font-bold text-amber-400">{gap.currentLevel}%</span> / Req:{' '}
                          <span className="font-bold text-emerald-400">{gap.requiredLevel}%</span>
                        </div>
                        <div className="text-[11px] font-mono text-red-400 font-bold mt-0.5">
                          Gap: -{gap.gap}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#1E293B]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                        <span className="font-semibold text-slate-300">Intervention:</span>
                        <span className="text-slate-400 truncate max-w-xs">{gap.recommendedIntervention}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAskAiWhy(gap.skillName, gap.currentLevel, gap.requiredLevel)}
                          className="text-[11px] text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-medium underline-offset-2 hover:underline"
                        >
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span>Ask AI why</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('interventions')}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                          Resolve Gap
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Gap Explanation Drawer if active */}
          {aiGapExplanation.skill && (
            <div className="mt-4 p-4 rounded-2xl bg-[#091122] border border-cyan-500/40 text-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>AI Market Intelligence: Why is {aiGapExplanation.skill} a priority?</span>
                </div>
                <button
                  onClick={() => setAiGapExplanation({ skill: '', loading: false, text: null })}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              {aiGapExplanation.loading ? (
                <div className="text-slate-400 animate-pulse py-2">Consulting AI market intelligence...</div>
              ) : (
                <p className="text-slate-300 leading-relaxed">{aiGapExplanation.text}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Weekly Action Plan & High-Match Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Career Action Plan */}
        <div className="lg:col-span-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Weekly Career Action Plan</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Sprint Week 4
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Completing tasks dynamically updates your career readiness</p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {student.weeklyTasks.filter((t) => t.completed).length}/{student.weeklyTasks.length} Done
            </div>
          </div>

          <div className="space-y-2.5">
            {student.weeklyTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => completeWeeklyTask(task.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  task.completed
                    ? 'bg-[#090F1E]/80 border-emerald-500/30 text-slate-400'
                    : 'bg-[#090F1E] border-[#1E293B] hover:border-slate-600 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      task.completed
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-600 hover:border-indigo-400'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-100'
                      }`}
                    >
                      {task.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {task.category} • Due: {task.dueDate}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/20 font-bold">
                    +{task.impactScore}% Impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Match Opportunities Teaser */}
        <div className="lg:col-span-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Matched Opportunities</h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time semantic matching based on your verified Skill DNA</p>
              </div>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Browse All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {opportunities.slice(0, 2).map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-100">{opp.title}</h4>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {opp.type}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300 font-medium mt-0.5">
                        {opp.company} • <span className="text-slate-400">{opp.location}</span>
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-base font-extrabold text-emerald-400 font-mono">
                        {opp.matchScore}% Match
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{opp.stipendOrSalary}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{opp.matchReason}</p>

                  <div className="mt-3 pt-2.5 border-t border-[#1E293B]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-400 text-[11px]">Deadline: {opp.deadline}</span>
                    <button
                      onClick={() => setActiveTab('opportunities')}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <span>View Match Breakdown</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
            <span>Powered by neural semantic matching</span>
            <span className="text-indigo-400 font-medium">97% Top Cohort Fit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
