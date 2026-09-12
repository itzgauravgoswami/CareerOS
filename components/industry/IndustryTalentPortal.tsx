'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Building,
  Target,
  Users,
  Search,
  CheckCircle2,
  ShieldCheck,
  Star,
  ExternalLink,
  Sparkles,
  Award,
  Send,
  X,
  FileCode2,
} from 'lucide-react';

export default function IndustryTalentPortal() {
  const { student, submitIndustryFeedback, addToast } = useCareerOS();

  const [activeTab, setActiveTab] = useState<'search' | 'pipeline' | 'feedback'>('pipeline');
  const [searchSkill, setSearchSkill] = useState('Python');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(student);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Feedback form state
  const [rating, setRating] = useState(4.8);
  const [feedbackNotes, setFeedbackNotes] = useState(
    'Aarav demonstrated exceptional engineering maturity during the SSE inference proxy challenge. Excellent handling of stream backpressure and schema resilience under load.'
  );

  const candidates = [
    {
      id: student.id,
      name: student.name,
      avatar: student.avatarUrl,
      institution: student.institution,
      targetRole: student.targetRole,
      matchScore: 97,
      verifiedSkills: ['Python (92%)', 'GenAI (88%)', 'Node.js (82%)', 'Vector DBs (86%)'],
      trustScore: student.skillTrust,
      status: 'Ready for Fast-Track Offer',
    },
    {
      id: 'c_02',
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      institution: 'NIT Trichy',
      targetRole: 'Backend Systems Architect',
      matchScore: 91,
      verifiedSkills: ['Node.js (91%)', 'Redis (88%)', 'PostgreSQL (85%)'],
      trustScore: 84,
      status: 'Interview Scheduled',
    },
  ];

  const handleSubmitFeedback = () => {
    submitIndustryFeedback('NovaTech Labs', 'Junior AI Platform Engineer', rating, feedbackNotes);
    addToast('Feedback Submitted', 'Enterprise endorsement added to student sovereign Career DNA.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              Enterprise Talent Acquisition
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">NovaTech Labs Talent Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Building className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 shrink-0" />
            <span>Enterprise Talent Intelligence Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Eliminate resume fraud. Hire pre-vetted engineering candidates filtered by cryptographically verified code
            evidence, test benchmarks, and faculty signatures.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-left md:text-right shrink-0">
          <div className="text-[10px] font-mono uppercase text-slate-400">Verified Pipeline</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">24 Top-Tier Matches</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-1 text-xs overflow-x-auto scrollbar-none flex-nowrap -mx-3 px-3 sm:mx-0 sm:px-0">
        {[
          { id: 'pipeline', label: 'Candidate Pipeline (97% Match)', icon: Target },
          { id: 'search', label: 'Reverse Talent Search', icon: Search },
          { id: 'feedback', label: 'Submit Practicum Feedback (Closed-Loop)', icon: Award },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all shrink-0 whitespace-nowrap ${
                isActive
                  ? 'bg-[#152038] text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E172A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          {candidates.map((c) => (
            <div
              key={c.id}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] hover:border-indigo-500/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-white tracking-tight">{c.name}</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Skill Passport Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {c.targetRole} • <span className="text-slate-400">{c.institution}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.verifiedSkills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#090F1E] border border-cyan-500/30 text-cyan-300 font-semibold"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 sm:gap-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400 font-mono">Role Match Fit</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">{c.matchScore}%</div>
                  <div className="text-[10px] text-slate-400 font-mono">Trust: {c.trustScore}%</div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedCandidate(c);
                      setDrawerOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all text-center"
                  >
                    Inspect Verified Evidence
                  </button>
                  <button
                    onClick={() => {
                      addToast('Fast-Track Interview Sent', `Direct interview invitation sent to ${c.name}.`, 'success');
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#090F1E] hover:bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-center transition-colors"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Reverse Talent Search */}
      {activeTab === 'search' && (
        <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Capability Query Search</h3>
            <p className="text-xs text-slate-400 mt-0.5">Filter the national talent pool by verified code artifacts rather than keyword resumes</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                placeholder="Search verified skills: e.g. Node.js, PyTorch, Kubernetes..."
                className="w-full bg-[#090F1E] border border-[#1E293B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all">
              Filter Verified Cohort
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-xs space-y-1">
            <span className="font-semibold text-slate-200">Matching Candidate Found:</span>
            <div className="text-slate-300">
              Aarav Sharma &mdash; Verified score in {searchSkill} with passing benchmark test and faculty endorsement.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Submit Industry Feedback Form (Closing the loop!) */}
      {activeTab === 'feedback' && (
        <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-5">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase font-mono mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Step 08: The Closed-Loop Practicum Feedback</span>
            </div>
            <h3 className="text-lg font-bold text-white">Submit Candidate Practicum Feedback</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Your evaluation directly mutates the student&apos;s sovereign Career DNA and updates the institution&apos;s curriculum
              readiness scores.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E293B]">
                <span className="text-[10px] uppercase font-mono text-slate-400">Candidate</span>
                <div className="font-bold text-white mt-0.5">Aarav Sharma (B.Tech CS)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E293B]">
                <span className="text-[10px] uppercase font-mono text-slate-400">Practicum Project</span>
                <div className="font-bold text-cyan-300 mt-0.5">SSE Streaming Inference Gateway</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Enterprise Supervisor Composite Rating:</label>
              <div className="flex flex-wrap items-center gap-2">
                {[4.0, 4.5, 4.8, 5.0].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRating(r)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      rating === r
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 ring-1 ring-amber-400'
                        : 'bg-[#090F1E] text-slate-400 border border-[#1E293B]'
                    }`}
                  >
                    ★ {r} / 5.0
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Detailed Feedback &amp; Verification Observations:</label>
              <textarea
                rows={4}
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                className="w-full bg-[#090F1E] border border-[#1E293B] rounded-2xl p-3 sm:p-4 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <button
              onClick={handleSubmitFeedback}
              className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Enterprise Feedback to Ecosystem</span>
            </button>
          </div>
        </div>
      )}

      {/* Candidate Detail Modal / Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-cyan-500/40 shadow-2xl p-4 sm:p-6 text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="text-base font-bold text-white">Cryptographic Capability Evidence Audit</h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] space-y-2 text-xs">
              <div className="font-bold text-white text-sm">{selectedCandidate.name} &mdash; Sovereign Record</div>
              <p className="text-slate-300 leading-relaxed">
                All 17 tracked capabilities have been cross-checked against raw Git commits, test run outputs, and
                faculty timestamps.
              </p>
              <div className="pt-2 font-mono text-cyan-400 text-[11px]">
                Target Role Match: 97% • Internal Skill Trust: {student.skillTrust}%
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
