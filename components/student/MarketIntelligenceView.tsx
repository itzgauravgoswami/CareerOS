'use client';

import React from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  TrendingUp,
  Sparkles,
  Zap,
  Building,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function MarketIntelligenceView() {
  const { student, setActiveTab } = useCareerOS();

  const emergingSkills2026 = [
    {
      combo: 'Generative AI + Streaming APIs (Node.js/FastAPI)',
      growth: '+142% Demand Growth',
      salaryPremium: '+₹4.5L Premium',
      marketNote: 'Crucial for real-time chat tokens and WebSocket agents.',
    },
    {
      combo: 'Vector Database Indexing (PgVector/HNSW) + Agentic RAG',
      growth: '+118% Demand Growth',
      salaryPremium: '+₹3.8L Premium',
      marketNote: 'Replaces simple naive cosine similarity with hybrid retrieval.',
    },
    {
      combo: 'Docker + Kubernetes Cluster GPU Scheduling',
      growth: '+88% Demand Growth',
      salaryPremium: '+₹3.2L Premium',
      marketNote: 'Required for serving quantized local models on private infrastructure.',
    },
  ];

  const topHiringEnterprises = [
    { name: 'NovaTech Labs', role: 'Junior AI Platform Engineer', package: '₹14L – ₹18L', openings: 4 },
    { name: 'Aether Labs', role: 'Agentic Systems Fellow', package: '₹12L – ₹16L', openings: 2 },
    { name: 'VertexWorks', role: 'Full Stack ML Architect', package: '₹16L – ₹22L', openings: 5 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              Live Macro Ecosystem Signals
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">2026 Enterprise Demand Forecast</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 shrink-0" />
            <span>Market &amp; Industry Intelligence</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real-time industry telemetry parsed from thousands of verified enterprise job descriptions, skill demand
            indexes, and salary benchmarks.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-left md:text-right shrink-0">
          <div className="text-[10px] font-mono uppercase text-slate-400">Industry Alignment</div>
          <div className="text-2xl font-bold text-indigo-400 font-mono">{student.industryAlignment}%</div>
        </div>
      </div>

      {/* AI Market Signal Alert */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0D1527] to-indigo-950/40 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Live AI Market Signal: 2026 AI Engineer Profile Shift</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          &ldquo;Demand for pure prompt engineering has dropped by 64% in favor of full-stack AI platform engineering.
          Candidates who present verified proof in **streaming token infrastructure**, **multi-agent reflection loops**,
          and **Dockerized deployment** receive 3.4x more interview invitations than candidates with theoretical-only
          curricula.&rdquo;
        </p>
      </div>

      {/* Emerging Skill Combinations */}
      <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-lg space-y-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">High-Growth Skill Pairings (2026)</h3>
          <p className="text-xs text-slate-400 mt-0.5">Combinations commanding the highest placement salary premiums</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergingSkills2026.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#090F1E] border border-[#1E293B] hover:border-indigo-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">{item.growth}</span>
                <h4 className="text-sm font-bold text-white mt-1 leading-snug">{item.combo}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.marketNote}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs">
                <span className="text-indigo-300 font-mono font-bold">{item.salaryPremium}</span>
                <button
                  onClick={() => setActiveTab('interventions')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Build Skill →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Hiring Enterprises */}
      <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-lg space-y-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Enterprises Hiring For Your Skill DNA</h3>
          <p className="text-xs text-slate-400 mt-0.5">Companies with active roles matching Aarav Sharma&apos;s target role</p>
        </div>

        <div className="space-y-3">
          {topHiringEnterprises.map((c) => (
            <div
              key={c.name}
              className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.role}</div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-left sm:text-right">
                  <div className="text-xs font-bold text-emerald-400 font-mono">{c.package}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{c.openings} Openings</div>
                </div>
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
                >
                  View Roles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
