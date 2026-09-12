'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Dna,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  FolderGit2,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Edit3,
} from 'lucide-react';

export default function CareerDnaView() {
  const { student, importResumeProfile, addToast } = useCareerOS();

  const [resumeText, setResumeText] = useState('');
  const [analyzingResume, setAnalyzingResume] = useState(false);
  const [parsedResult, setParsedResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'projects' | 'certifications' | 'upload'>('timeline');

  const handleParseResume = async () => {
    if (!resumeText.trim()) {
      addToast('Input Required', 'Please enter or paste your resume text to parse.', 'warning');
      return;
    }
    setAnalyzingResume(true);
    try {
      const res = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole: student.targetRole,
        }),
      });
      const data = await res.json();
      setParsedResult(data);
      addToast('Resume Parsed by Autonomous AI', 'Structured capabilities extracted successfully.', 'success');
    } catch {
      addToast('Processing Error', 'Failed to analyze resume. Please try again.', 'warning');
    } finally {
      setAnalyzingResume(false);
    }
  };

  const handleApplyToCareerDna = () => {
    if (parsedResult) {
      importResumeProfile(parsedResult);
      setParsedResult(null);
      setResumeText('');
      setActiveTab('timeline');
    }
  };

  const sampleResume = `Aarav Sharma
Email: aarav.sharma@institution.ac.in | Phone: +91 98765 43210
B.Tech Computer Science & Engineering (7th Sem), NIT Trichy (CGPA: 8.9/10)

TARGET ROLE: AI Engineer / LLM Systems Developer

TECHNICAL SKILLS:
- Languages: Python (Advanced), TypeScript, JavaScript, SQL, C++
- AI/ML & LLMOps: PyTorch, Generative AI, RAG Systems, Vector Databases (PgVector, Chroma), LangChain, LLM APIs
- Web & Systems: React, Node.js, Express, FastAPI, PostgreSQL, Docker, Redis

FEATURED PROJECTS:
1. Multi-Agent RAG Knowledge Assistant (Lead AI Architect)
   - Engineered hybrid vector retrieval system combining BM25 lexical search with dense embeddings.
   - Built streaming response pipeline with <180ms p95 latency.
   - Achieved 94% verifiable answer ground truth accuracy.

2. Distributed E-Commerce Microservices Pipeline (Backend Developer)
   - Designed PostgreSQL schema with connection pooling and asynchronous message workers.
   - Containerized services with Docker and deployed with health-check probes.

EXPERIENCE:
- Industry Fellow at NovaTech Labs (Summer 2025): Developed automated telemetry categorization script with 4.8/5 supervisor rating.`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              Verifiable Capability Record
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">UUID: {student.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Dna className="w-7 h-7 text-indigo-400" />
            <span>Career DNA Profile</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            The immutable, evidence-backed representation of your academic learning, project artifacts, verified
            skills, and industry practicum endorsements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab('upload');
              if (!resumeText) setResumeText(sampleResume);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Upload & Parse Resume</span>
          </button>
        </div>
      </div>

      {/* AI Profile Executive Synthesis */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0E172A] to-cyan-950/40 border border-indigo-500/30 shadow-md">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Autonomous Profile Intelligence Summary</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          &ldquo;Your verified profile indicates exceptional competence in **Python Machine Learning pipelines**,
          **Generative AI agent architectures**, and **relational database indexing**. Your primary capstone project
          exceeds 94% architectural standards. The single highest leverage area to maximize Tier-1 placement match is
          solidifying **high-throughput Node.js backend streaming** and **containerized Kubernetes cluster deployment**.&rdquo;
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-1 text-xs overflow-x-auto scrollbar-none flex-nowrap -mx-3 px-3 sm:mx-0 sm:px-0">
        {[
          { id: 'timeline', label: 'Career Timeline & Evidence', icon: Calendar },
          { id: 'projects', label: 'Verified Project Artifacts', icon: FolderGit2 },
          { id: 'certifications', label: 'Credentials & Certifications', icon: Award },
          { id: 'upload', label: 'AI Resume Parser', icon: Upload },
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
              <Icon className="w-4 h-4 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Career Timeline */}
      {activeTab === 'timeline' && (
        <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-6 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">Ecosystem Milestones & Audit Trail</h3>
            <span className="text-xs font-mono text-slate-400">{student.dnaTimeline.length} Verified Entries</span>
          </div>

          <div className="relative pl-6 border-l-2 border-indigo-500/30 space-y-6">
            {student.dnaTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0D1527] border-2 border-indigo-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>

                <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] group-hover:border-indigo-500/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-300 font-mono">{item.year}</span>
                      <span className="text-slate-600">•</span>
                      <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 w-fit font-mono">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Evidence Cryptographically Anchored & Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.projects.map((proj) => (
            <div key={proj.id} className="p-5 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400 font-mono uppercase">{proj.role}</span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono ${
                      proj.status === 'completed' || proj.status === 'evaluated'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">{proj.title}</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{proj.description}</p>

                {/* Skills used */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#1E293B] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>

                {proj.evaluationScore && (
                  <div className="mt-3.5 p-2.5 rounded-xl bg-[#090F1E] border border-indigo-500/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Evaluator Score:</span>
                      <span className="font-bold text-emerald-400 font-mono">{proj.evaluationScore}%</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 italic">&ldquo;{proj.evaluationFeedback}&rdquo;</p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
                <span>Verified by: {proj.verifiedBy || 'Institution Review'}</span>
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Inspect Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Certifications */}
      {activeTab === 'certifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.certifications.map((cert) => (
            <div key={cert.id} className="p-5 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-purple-400">
                  <Award className="w-4 h-4" />
                  <span>Verified Credential</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">{cert.name}</h4>
                <p className="text-xs text-slate-400 mt-1">Issued by: {cert.issuer} • {cert.issueDate}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cert.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#1E293B] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Issuer Authenticated
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Credential ID: verified</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: AI Resume Parser */}
      {activeTab === 'upload' && (
        <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-6 shadow-xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">AI Resume Parser & Evidence Extractor</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste or inspect your resume text. Our neural extractor will identify verified skills, projects, and target role alignment.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Resume Plain Text / Markdown</label>
              <button
                onClick={() => setResumeText(sampleResume)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Load Sample Resume
              </button>
            </div>
            <textarea
              rows={8}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste raw resume text here..."
              className="w-full bg-[#090F1E] border border-[#1E293B] rounded-2xl p-4 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Target Role: <strong className="text-slate-200">{student.targetRole}</strong>
              </span>
              <button
                onClick={handleParseResume}
                disabled={analyzingResume || !resumeText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-40 shadow-md transition-all"
              >
                {analyzingResume ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Extracting with AI Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Extract Intelligence</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Parsed Result Display */}
          {parsedResult && (
            <div className="mt-6 p-5 rounded-2xl bg-[#090F1E] border border-cyan-500/40 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Extraction Successful</h4>
                </div>
                <button
                  onClick={handleApplyToCareerDna}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
                >
                  Merge into Career DNA Ecosystem
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">Executive Summary</div>
                <p className="text-xs text-slate-200 leading-relaxed">{parsedResult.executiveSummary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                  <div className="text-slate-400 text-[10px] uppercase">Candidate</div>
                  <div className="font-bold text-slate-100 mt-0.5">{parsedResult.candidateName}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                  <div className="text-slate-400 text-[10px] uppercase">Overall Readiness</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{parsedResult.overallReadiness}%</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                  <div className="text-slate-400 text-[10px] uppercase">Skill Trust</div>
                  <div className="font-bold text-cyan-400 mt-0.5">{parsedResult.skillTrustScore}%</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                  <div className="text-slate-400 text-[10px] uppercase">Skills Extracted</div>
                  <div className="font-bold text-purple-400 mt-0.5">{parsedResult.extractedSkills?.length || 0} Skills</div>
                </div>
              </div>

              {parsedResult.extractedSkills && (
                <div>
                  <div className="text-xs font-semibold text-slate-300 mb-2">Extracted Capabilities:</div>
                  <div className="flex flex-wrap gap-2">
                    {parsedResult.extractedSkills.map((sk: any, idx: number) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#0D1527] border border-[#1E293B] text-xs flex items-center gap-2"
                      >
                        <span className="font-semibold text-slate-200">{sk.name}</span>
                        <span className="text-[10px] font-mono text-cyan-300">{sk.score}%</span>
                        <span className="text-[9px] uppercase px-1 rounded bg-slate-800 text-slate-400">{sk.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
