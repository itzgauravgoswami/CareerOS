'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import { Intervention } from '@/lib/types';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Github,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Code2,
} from 'lucide-react';

export default function InterventionEngineView() {
  const { interventions, completeIntervention, student, setActiveTab, addToast } = useCareerOS();

  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [evidenceUrl, setEvidenceUrl] = useState('https://github.com/aaravsharma/sse-inference-proxy');

  const handleVerifyIntervention = (id: string) => {
    completeIntervention(id);
    setSubmittingId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 font-mono">
              Actionable Capability Studio
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Problem → Action → Evidence → Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
            <span>Targeted Intervention Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            CareerOS rejects passive video tutorials. Every skill gap generates a scoped engineering project, verifiable
            evidence requirements, and faculty/industry benchmark verification.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-right">
          <div className="text-[10px] font-mono uppercase text-slate-400">Verified Skills Count</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">{student.verifiedSkillsCount} Active</div>
        </div>
      </div>

      {/* The 5-Step Architecture Ribbon */}
      <div className="p-3.5 sm:p-5 rounded-2xl bg-[#090F1E] border border-[#1E293B] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#0D1527] border border-red-500/20">
          <div className="text-[10px] font-mono uppercase text-red-400 font-bold">Step 1: Gap Detected</div>
          <div className="font-semibold text-slate-200 mt-1">Node.js Streaming (-31%)</div>
        </div>
        <div className="p-3 rounded-xl bg-[#0D1527] border border-amber-500/20">
          <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Step 2: Intervention</div>
          <div className="font-semibold text-slate-200 mt-1">Build SSE Inference Proxy</div>
        </div>
        <div className="p-3 rounded-xl bg-[#0D1527] border border-cyan-500/20">
          <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Step 3: Evidence</div>
          <div className="font-semibold text-slate-200 mt-1">GitHub Repo + Live Stream</div>
        </div>
        <div className="p-3 rounded-xl bg-[#0D1527] border border-indigo-500/20">
          <div className="text-[10px] font-mono uppercase text-indigo-400 font-bold">Step 4: Verification</div>
          <div className="font-semibold text-slate-200 mt-1">Faculty / Test Suite Review</div>
        </div>
        <div className="p-3 rounded-xl bg-[#0D1527] border border-emerald-500/20">
          <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Step 5: Passport Updated</div>
          <div className="font-semibold text-slate-200 mt-1">Score: 82% &amp; +7% Trust</div>
        </div>
      </div>

      {/* Interventions List */}
      <div className="space-y-4">
        {interventions.map((item) => {
          const isCompleted = item.status === 'completed';
          const isInProgress = item.status === 'in_progress';
          return (
            <div
              key={item.id}
              className={`p-4 sm:p-6 rounded-3xl border transition-all ${
                isCompleted
                  ? 'bg-[#091224]/80 border-emerald-500/40 shadow-sm'
                  : isInProgress
                  ? 'bg-[#0D1527] border-cyan-500/50 shadow-xl'
                  : 'bg-[#0D1527] border-[#1E293B]'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isInProgress
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.status === 'in_progress' ? 'Active Sprint' : item.status}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-indigo-300 font-mono font-semibold">
                      Target Skill: {item.skillName}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>Estimated Time: {item.durationWeeks} Weeks</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-bold">+{item.xpReward} XP Reward</span>
                </div>
              </div>

              {/* Problem Statement Box */}
              <div className="p-3.5 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-xs space-y-1 mb-4">
                <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Diagnostic Scope
                </div>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              {/* Core Intervention Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#090F1E] border border-[#1E293B]">
                  <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold mb-1">
                    Hands-on Prescribed Deliverable
                  </div>
                  <p className="text-slate-200 leading-relaxed">{item.title}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#090F1E] border border-[#1E293B]">
                  <div className="text-[10px] uppercase font-mono text-indigo-400 font-bold mb-1">
                    Verifiable Evidence Criteria
                  </div>
                  <p className="text-slate-200 leading-relaxed">{item.expectedEvidence}</p>
                </div>
              </div>

              {/* Action / Submission Strip */}
              <div className="mt-4 pt-3 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span>Verification Method:</span>
                  <strong className="text-slate-200">{item.verificationMethod}</strong>
                </div>

                {isCompleted ? (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed &amp; Cryptographically Anchored (+7% Trust Awarded)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {submittingId === item.id ? (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={evidenceUrl}
                          onChange={(e) => setEvidenceUrl(e.target.value)}
                          placeholder="https://github.com/..."
                          className="bg-[#090F1E] border border-cyan-500 text-xs text-slate-100 px-3 py-2 rounded-lg focus:outline-none w-full sm:w-64"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVerifyIntervention(item.id)}
                            className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all text-center"
                          >
                            Submit &amp; Verify
                          </button>
                          <button
                            onClick={() => setSubmittingId(null)}
                            className="text-xs text-slate-400 hover:text-white px-2 py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSubmittingId(item.id)}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-md transition-all"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>Submit Evidence &amp; Verify Skill</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
