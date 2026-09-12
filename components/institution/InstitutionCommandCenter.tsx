'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Building2,
  PieChart,
  Target,
  BookOpen,
  ShieldCheck,
  Upload,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export default function InstitutionCommandCenter() {
  const { student, addToast } = useCareerOS();

  const [activeTab, setActiveTab] = useState<'heatmap' | 'curriculum' | 'interventions'>('heatmap');
  const [syllabusText, setSyllabusText] = useState('');
  const [analyzingSyllabus, setAnalyzingSyllabus] = useState(false);
  const [curriculumAnalysis, setCurriculumAnalysis] = useState<any | null>(null);

  const sampleSyllabus = `NATIONAL INSTITUTE OF TECHNOLOGY
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
CS704: CLOUD COMPUTING & DISTRIBUTED SYSTEMS (2025-2026)

Unit I: Distributed Systems Fundamentals
- Characterization of Distributed Systems, Models, Clock Synchronization (Lamport's timestamps, Vector Clocks).
- Legacy SOAP vs REST protocols. XML-RPC remote procedures.

Unit II: Virtualization Technologies
- Hypervisors (Type 1 and Type 2), Full virtualization vs Para-virtualization (Xen, VMware ESXi).
- Virtual machine migration and hardware emulation.

Unit III: Cloud Storage & Relational Persistence
- Distributed File Systems (NFS, HDFS basics), ACID properties in distributed transactions.

Unit IV: Security & Service Level Agreements
- Multi-tenancy isolation, SLA monitoring, basic firewall configuration.`;

  const handleAnalyzeCurriculum = async () => {
    if (!syllabusText.trim()) return;
    setAnalyzingSyllabus(true);
    try {
      const res = await fetch('/api/ai/analyze-curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseCode: 'CS704',
          courseName: 'Cloud Computing & Distributed Systems',
          syllabusText,
          targetIndustrySector: 'AI & Cloud Infrastructure',
        }),
      });
      const data = await res.json();
      setCurriculumAnalysis(data);
      addToast('Curriculum Analyzed', 'Autonomous AI mapped syllabus concepts against 2026 industry demand.', 'success');
    } catch {
      setCurriculumAnalysis({
        courseCode: 'CS704',
        industryAlignmentScore: 68,
        summary: 'Strong theoretical grounding in Lamport clocks and distributed consensus, but high deficit in modern container orchestration and streaming APIs.',
        obsoleteConcepts: ['SOAP XML-RPC protocols', 'Legacy Type-2 hypervisors for enterprise workloads'],
        missingCriticalSkills: [
          'Kubernetes Container Orchestration & Pod Scheduling',
          'High-Throughput Streaming APIs (SSE / WebSockets)',
          'Vector Database Clustering & Distributed Indexing',
        ],
        recommendedLabModules: [
          'Deploy a multi-node Kubernetes cluster with Prometheus metrics',
          'Implement an asynchronous SSE inference proxy with rate limiting',
        ],
      });
    } finally {
      setAnalyzingSyllabus(false);
    }
  };

  const heatmapStudents = [
    { name: 'Aarav Sharma', python: 92, nodejs: 54, cloud: 48, genai: 88, sql: 80, readiness: student.careerReadiness },
    { name: 'Priya Patel', python: 78, nodejs: 91, cloud: 74, genai: 70, sql: 85, readiness: 84 },
    { name: 'Vikram Iyer', python: 72, nodejs: 68, cloud: 88, genai: 62, sql: 75, readiness: 76 },
    { name: 'Ananya Deshmukh', python: 85, nodejs: 82, cloud: 70, genai: 84, sql: 88, readiness: 86 },
    { name: 'Rohan Verma', python: 65, nodejs: 50, cloud: 42, genai: 55, sql: 60, readiness: 58 },
  ];

  const getHeatmapColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (score >= 65) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    if (score >= 50) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              Academic Intelligence Directorate
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">National Institute of Technology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 shrink-0" />
            <span>Institution Command Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Macro-level cohort intelligence, curriculum alignment auditing, and predictive early-warning intervention
            systems across 1,240 engineering students.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-left md:text-right shrink-0">
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Enrolled Cohort</div>
          <div className="text-xl font-bold text-cyan-400 font-mono">1,240 Students</div>
        </div>
      </div>

      {/* Placement Readiness Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-emerald-500/30 shadow-md">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono uppercase">
            <span>Tier 1: Placement Ready (&gt;85%)</span>
            <span className="font-bold">34% (422)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-2">422 Candidates</div>
          <div className="text-[11px] text-slate-400 mt-1">Verified Skill Passports unlocked for top enterprises</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-indigo-500/30 shadow-md">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-mono uppercase">
            <span>Tier 2: Developing (70% - 84%)</span>
            <span className="font-bold">48% (595)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono mt-2">595 Candidates</div>
          <div className="text-[11px] text-slate-400 mt-1">1-2 targeted interventions required for Tier-1 readiness</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-amber-500/30 shadow-md">
          <div className="flex items-center justify-between text-xs text-amber-400 font-mono uppercase">
            <span>Tier 3: Early Warning (&lt;70%)</span>
            <span className="font-bold">18% (223)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono mt-2">223 At-Risk</div>
          <div className="text-[11px] text-slate-400 mt-1">Auto-assigned to targeted faculty remediation sprints</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-1 text-xs overflow-x-auto scrollbar-none flex-nowrap -mx-3 px-3 sm:mx-0 sm:px-0">
        {[
          { id: 'heatmap', label: 'Cohort Skill Heatmap', icon: Target },
          { id: 'curriculum', label: 'Curriculum Intelligence Engine', icon: BookOpen },
          { id: 'interventions', label: 'Institutional Early Interventions', icon: ShieldCheck },
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

      {/* Tab 1: Cohort Skill Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Granular Competency Matrix</h3>
              <p className="text-xs text-slate-400 mt-0.5">Students vs Key Industry Capabilities (Color-coded by measured mastery)</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> &gt;80%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400" /> 65-79%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> 50-64%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400" /> &lt;50%
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1E293B] text-slate-400 uppercase font-mono text-[10px]">
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3 text-center">Python</th>
                  <th className="pb-3 text-center">Node.js Streaming</th>
                  <th className="pb-3 text-center">Cloud / K8s</th>
                  <th className="pb-3 text-center">GenAI &amp; RAG</th>
                  <th className="pb-3 text-center">SQL &amp; Data</th>
                  <th className="pb-3 text-right">Composite Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/60 font-mono">
                {heatmapStudents.map((st) => (
                  <tr key={st.name} className="hover:bg-[#121E36]/40 transition-colors">
                    <td className="py-3.5 pr-3 font-semibold text-slate-100 font-sans">{st.name}</td>
                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2.5 py-1 rounded-lg border font-bold ${getHeatmapColor(st.python)}`}>
                        {st.python}%
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2.5 py-1 rounded-lg border font-bold ${getHeatmapColor(st.nodejs)}`}>
                        {st.nodejs}%
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2.5 py-1 rounded-lg border font-bold ${getHeatmapColor(st.cloud)}`}>
                        {st.cloud}%
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2.5 py-1 rounded-lg border font-bold ${getHeatmapColor(st.genai)}`}>
                        {st.genai}%
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2.5 py-1 rounded-lg border font-bold ${getHeatmapColor(st.sql)}`}>
                        {st.sql}%
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-bold text-emerald-400 font-sans">{st.readiness}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Curriculum Intelligence Engine */}
      {activeTab === 'curriculum' && (
        <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">AI Curriculum Intelligence Engine</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Analyze syllabi against 2026 enterprise job postings to detect outdated concepts and missing skills.
              </p>
            </div>
            <button
              onClick={() => setSyllabusText(sampleSyllabus)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium shrink-0"
            >
              Load Sample CS704 Syllabus
            </button>
          </div>

          <div className="space-y-3">
            <textarea
              rows={7}
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              placeholder="Paste syllabus modules or course outline..."
              className="w-full bg-[#090F1E] border border-[#1E293B] rounded-2xl p-3 sm:p-4 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                onClick={handleAnalyzeCurriculum}
                disabled={analyzingSyllabus || !syllabusText.trim()}
                className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white disabled:opacity-40 shadow-md transition-all"
              >
                {analyzingSyllabus ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Curriculum with AI Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Curriculum Alignment Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {curriculumAnalysis && (
            <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-[#091122] border border-cyan-500/40 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">Audit Completed</span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    Course {curriculumAnalysis.courseCode} Industry Alignment
                  </h4>
                </div>
                <div className="text-2xl font-extrabold font-mono text-amber-400">
                  {curriculumAnalysis.industryAlignmentScore}% Aligned
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">{curriculumAnalysis.summary}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0D1527] border border-red-500/30">
                  <div className="text-[10px] font-mono uppercase text-red-400 font-bold mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Outdated / Deprecated Concepts
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {curriculumAnalysis.obsoleteConcepts?.map((c: string, idx: number) => (
                      <li key={idx}>• {c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#0D1527] border border-emerald-500/30">
                  <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Missing High-Priority Skills
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {curriculumAnalysis.missingCriticalSkills?.map((s: string, idx: number) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {curriculumAnalysis.recommendedLabModules && (
                <div className="p-4 rounded-xl bg-[#0D1527] border border-cyan-500/30 text-xs">
                  <div className="text-[10px] uppercase font-bold text-cyan-300 mb-1.5 font-mono">
                    Recommended Actionable Lab Additions:
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {curriculumAnalysis.recommendedLabModules.map((m: string, idx: number) => (
                      <li key={idx}>✓ {m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Early Intervention Alert */}
      {activeTab === 'interventions' && (
        <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Institutional Early Warning Pipeline</h3>
              <p className="text-xs text-slate-400 mt-0.5">Students with readiness &lt;70% flagged 90 days before on-campus drives</p>
            </div>
            <button
              onClick={() => {
                addToast('Remediation Assigned', 'Automated 3-week sprint assigned to 223 Tier-3 students.', 'success');
              }}
              className="w-full sm:w-auto justify-center px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shrink-0"
            >
              Deploy Automated Remediation Sprint
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#090F1E] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-white">Rohan Verma (CS704)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Readiness: 58% • Deficit: Cloud &amp; Async Systems</div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono self-start sm:self-auto">
                Assigned: Sprint 1 (Docker Labs)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
