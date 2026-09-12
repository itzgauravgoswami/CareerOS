'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  FolderGit2,
  BookOpen,
  Users,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
} from 'lucide-react';

export default function LearningAndProjectsView() {
  const { student, setActiveTab, addToast } = useCareerOS();

  const [activeTab, setActiveTabLocal] = useState<'projects' | 'learning' | 'team'>('projects');
  const [teamFormed, setTeamFormed] = useState(false);
  const [formingTeam, setFormingTeam] = useState(false);

  const curatedLearning = [
    {
      title: 'High-Throughput Node.js Streaming & Server-Sent Events',
      targetedGap: 'Node.js & Streaming Backend APIs',
      duration: '6 Hours Lab',
      type: 'Hands-on Architecture Practicum',
      skills: ['Node.js', 'WebSockets', 'SSE', 'Backpressure'],
      url: '#',
    },
    {
      title: 'Kubernetes for AI Engineers: GPU Scheduling & Helm Charts',
      targetedGap: 'Cloud Native & Kubernetes Deployment',
      duration: '8 Hours Lab',
      type: 'DevOps & Cluster Infrastructure',
      skills: ['Kubernetes', 'Docker', 'GPU Scheduling', 'Prometheus'],
      url: '#',
    },
    {
      title: 'Distributed Vector Database Indexing: HNSW vs IVFFlat',
      targetedGap: 'Distributed Systems & Vector DBs',
      duration: '4 Hours Deep Dive',
      type: 'Algorithmic Optimization',
      skills: ['Vector DB', 'HNSW', 'PgVector', 'RAG Retrieval'],
      url: '#',
    },
  ];

  const projectExchange = [
    {
      id: 'proj_exchange_1',
      title: 'Distributed LLM Token Rate Limiter & Edge Proxy',
      sponsor: 'NovaTech Partner Lab',
      difficulty: 'Advanced',
      duration: '3 Weeks',
      deliverable: 'Node.js + Redis Token Bucket with Prometheus telemetry',
      skills: ['Node.js', 'Redis', 'Streaming', 'Distributed Systems'],
      spotsLeft: 2,
    },
    {
      id: 'proj_exchange_2',
      title: 'Agentic RAG with Self-Correction & Reflection Loops',
      sponsor: 'Aether Labs',
      difficulty: 'Intermediate',
      duration: '2 Weeks',
      deliverable: 'Python FastAPI service with LangGraph reflection state machine',
      skills: ['Python', 'GenAI', 'LangGraph', 'RAG'],
      spotsLeft: 1,
    },
    {
      id: 'proj_exchange_3',
      title: 'High-Speed Multimodal Vector Semantic Search Engine',
      sponsor: 'VertexWorks',
      difficulty: 'Advanced',
      duration: '4 Weeks',
      deliverable: 'Vector embedding pipeline with sub-50ms query latency',
      skills: ['Vector DB', 'PyTorch', 'FastAPI', 'Docker'],
      spotsLeft: 3,
    },
  ];

  const handleFormTeam = () => {
    setFormingTeam(true);
    setTimeout(() => {
      setFormingTeam(false);
      setTeamFormed(true);
      addToast('AI Team Formed', 'Matched with 3 complementary peers based on Skill DNA balance.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              Collaborative Project &amp; Skill Studio
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Target Role: {student.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <FolderGit2 className="w-7 h-7 text-cyan-400 shrink-0" />
            <span>Projects &amp; Targeted Learning Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Directly bridge your diagnosed skill gaps with hands-on enterprise-sponsored projects and AI-orchestrated
            collaborative teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTabLocal('team')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Users className="w-4 h-4" />
            <span>AI Team Formation</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-1 text-xs overflow-x-auto scrollbar-none flex-nowrap -mx-3 px-3 sm:mx-0 sm:px-0">
        {[
          { id: 'projects', label: 'Industry Project Exchange', icon: FolderGit2 },
          { id: 'learning', label: 'Targeted Gap Modules', icon: BookOpen },
          { id: 'team', label: 'AI Team Formation Generator', icon: Users },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTabLocal(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all shrink-0 whitespace-nowrap ${
                isActive
                  ? 'bg-[#152038] text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E172A]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Project Exchange */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projectExchange.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-3xl bg-[#0D1527] border border-[#1E293B] hover:border-indigo-500/40 shadow-lg flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">{p.sponsor}</span>
                  <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {p.difficulty}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{p.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{p.deliverable}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#1E293B] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1E293B] flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold">{p.spotsLeft} Open Spots</span>
                <button
                  onClick={() => {
                    addToast('Project Selected', `Enrolled in ${p.title}. Milestone tracker initialized.`, 'success');
                    setActiveTab('interventions');
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
                >
                  Join Project →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Targeted Learning Modules */}
      {activeTab === 'learning' && (
        <div className="space-y-3.5">
          {curatedLearning.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-[#0D1527] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Targets Gap: {item.targetedGap}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono">{item.duration}</span>
                </div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#1E293B] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  addToast('Lab Opened', `Launching interactive environment for ${item.title}`, 'info');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 whitespace-nowrap transition-colors"
              >
                Launch Hands-On Lab →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: AI Team Formation */}
      {activeTab === 'team' && (
        <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Skill-Balanced Capstone Team Synthesizer</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Multi-Disciplinary Team Formation</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Autonomous AI analyzes candidate Skill DNA to match you with peers whose strengths complement your gaps.
              </p>
            </div>

            <button
              onClick={handleFormTeam}
              disabled={formingTeam}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md transition-all shrink-0"
            >
              {formingTeam ? 'Synthesizing Team...' : 'Form Optimal Team with AI'}
            </button>
          </div>

          {teamFormed && (
            <div className="p-5 rounded-2xl bg-[#091122] border border-cyan-500/40 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">Recommended Project Team: &ldquo;VectorScale AI&rdquo;</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  96% Skill Complementarity Score
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                  <div className="text-[10px] uppercase font-mono text-indigo-400">You (Lead AI Engineer)</div>
                  <div className="font-bold text-white mt-0.5">Aarav Sharma</div>
                  <div className="text-[11px] text-slate-400 mt-1">Strengths: Python, GenAI, LangChain, RAG</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                  <div className="text-[10px] uppercase font-mono text-cyan-400">Peer 1 (Backend Systems)</div>
                  <div className="font-bold text-white mt-0.5">Priya Patel</div>
                  <div className="text-[11px] text-slate-400 mt-1">Strengths: Node.js (91%), Redis, SSE Streaming</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                  <div className="text-[10px] uppercase font-mono text-purple-400">Peer 2 (Cloud / DevOps)</div>
                  <div className="font-bold text-white mt-0.5">Vikram Iyer</div>
                  <div className="text-[11px] text-slate-400 mt-1">Strengths: Kubernetes (88%), Docker, CI/CD</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    addToast('Invitation Sent', 'Team collaboration workspace created in Project Studio.', 'success');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors"
                >
                  Send Team Collaboration Invites →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
