'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import { Opportunity } from '@/lib/types';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  Send,
  RefreshCw,
  ExternalLink,
  Zap,
} from 'lucide-react';

export default function OpportunityEngineView() {
  const { opportunities, applyToOpportunity, student, addToast, setActiveTab } = useCareerOS();

  const [filterType, setFilterType] = useState<'all' | 'job' | 'internship' | 'project'>('all');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(opportunities[0] || null);
  const [optimizerOpen, setOptimizerOpen] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState<any | null>(null);

  const filtered = opportunities.filter((o) => (filterType === 'all' ? true : o.type === filterType));

  const handleOptimizeApplication = async () => {
    if (!selectedOpp) return;
    setOptimizing(true);
    setOptimizerOpen(true);
    try {
      const res = await fetch('/api/ai/application-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: selectedOpp.title,
          company: selectedOpp.company,
          jobDescription: `${selectedOpp.title} at ${selectedOpp.company}. Required skills: ${(selectedOpp.skillsRequired || []).join(
            ', '
          )}`,
          studentProfile: {
            name: student.name,
            targetRole: student.targetRole,
            careerReadiness: student.careerReadiness,
            verifiedSkills: student.skills
              .filter((s) => s.status === 'verified')
              .map((s) => s.name),
            projects: student.projects.map((p) => p.title),
          },
        }),
      });
      const data = await res.json();
      setOptimizedResult(data);
      addToast('Application Optimized', 'AI generated tailored bullet points and portfolio hooks.', 'success');
    } catch {
      setOptimizedResult({
        optimizedHeadline: `AI Systems Engineer | Production GenAI & High-Throughput Streaming Architect`,
        tailoredBulletPoints: [
          'Engineered Agentic RAG microservice with hybrid BM25 + dense retrieval, delivering sub-180ms p95 latency.',
          'Developed Node.js streaming proxy gateway with SSE backpressure handling and automated token rate limiting.',
          'Containerized microservices with Docker and deployed with Prometheus telemetry health checks.',
        ],
        keywordsToHighlight: ['Streaming APIs', 'Vector Retrieval', 'Backpressure', 'Agentic RAG'],
        portfolioProjectToFeature: 'Multi-Agent RAG Knowledge Assistant',
      });
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 font-mono">
              Intelligent Capability Matchmaker
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Semantic Matching Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400 shrink-0" />
            <span>Opportunity Engine &amp; Matching Matrix</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Roles matched to your sovereign Skill DNA. View satisfied vs missing requirements with mathematical
            transparency, or optimize your application with Autonomous AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('applications')}
            className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#090F1E] border border-[#1E293B] text-slate-200 hover:border-slate-600 transition-colors"
          >
            <span>View Kanban Pipeline →</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-1 text-xs overflow-x-auto scrollbar-none flex-nowrap -mx-3 px-3 sm:mx-0 sm:px-0">
        {[
          { id: 'all', label: 'All Opportunities' },
          { id: 'job', label: 'Full-Time Roles' },
          { id: 'internship', label: 'Internships' },
          { id: 'project', label: 'Industry Challenges' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id as any)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all shrink-0 whitespace-nowrap ${
              filterType === f.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E172A]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Opportunities Layout: List + Selected Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Opportunities List */}
        <div className="lg:col-span-7 space-y-3.5">
          {filtered.map((opp) => {
            const isSelected = selectedOpp?.id === opp.id;
            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpp(opp)}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#131E35] border-indigo-500/60 shadow-xl'
                    : 'bg-[#0D1527] border-[#1E293B] hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white tracking-tight">{opp.title}</h3>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {opp.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-indigo-300 mt-1 font-medium flex-wrap">
                      <span className="flex items-center gap-1 text-slate-200">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {opp.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {opp.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base sm:text-lg font-extrabold font-mono text-emerald-400">{opp.matchScore}% Fit</div>
                    <div className="text-[11px] font-mono text-slate-400">{opp.stipendOrSalary}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">{opp.matchReason}</p>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(opp.skillsRequired || []).map((sk) => {
                    const isSatisfied = opp.satisfiedRequirements.includes(sk);
                    return (
                      <span
                        key={sk}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                          isSatisfied
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                            : 'bg-red-950/50 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {isSatisfied ? '✓' : '✗'} {sk}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Opportunity Detailed Inspector & Application Action */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl flex flex-col justify-between">
          {selectedOpp ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-cyan-400 uppercase font-bold">{selectedOpp.company}</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{selectedOpp.matchScore}% Match</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{selectedOpp.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                  <span>{selectedOpp.location}</span>
                  <span>•</span>
                  <span>{selectedOpp.stipendOrSalary}</span>
                </div>
              </div>

              {/* Match Diagnostics */}
              <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] space-y-2.5 text-xs">
                <div>
                  <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Satisfied Capabilities ({selectedOpp.satisfiedRequirements.length})
                  </div>
                  <div className="text-slate-300">{selectedOpp.satisfiedRequirements.join(', ')}</div>
                </div>

                <div className="pt-2 border-t border-[#1E293B]">
                  <div className="text-[10px] font-mono uppercase text-red-400 font-bold mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Missing Capabilities ({selectedOpp.missingRequirements.length})
                  </div>
                  <div className="text-slate-300">
                    {selectedOpp.missingRequirements.length > 0
                      ? selectedOpp.missingRequirements.join(', ')
                      : 'None! 100% matched.'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleOptimizeApplication}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>AI Application Optimizer</span>
                </button>

                <button
                  onClick={() => applyToOpportunity(selectedOpp.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Fast-Track Apply with Skill Passport</span>
                </button>
              </div>

              {/* Optimizer Output Modal / Section */}
              {optimizerOpen && optimizedResult && (
                <div className="p-4 rounded-2xl bg-[#091122] border border-cyan-500/40 text-xs space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Optimized Application Profile
                    </span>
                    <button onClick={() => setOptimizerOpen(false)} className="text-slate-400 hover:text-white">
                      ✕
                    </button>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Targeted Resume Hook</div>
                    <div className="font-semibold text-slate-100 mt-0.5">{optimizedResult.optimizedHeadline}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Tailored Impact Bullets:</div>
                    {optimizedResult.tailoredBulletPoints?.map((b: string, idx: number) => (
                      <div key={idx} className="text-slate-300 pl-2 border-l border-indigo-500/40 leading-relaxed">
                        • {b}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">Select a role to inspect match diagnostics.</div>
          )}

          <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Verified Candidate Matching</span>
            <span className="text-emerald-400">Top 5% Fit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
