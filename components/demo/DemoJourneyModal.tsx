'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  X,
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Dna,
  Building,
  Target,
  ShieldCheck,
  Award,
  Briefcase,
  TrendingUp,
  Cpu,
} from 'lucide-react';

export default function DemoJourneyModal() {
  const {
    demoJourneyOpen,
    setDemoJourneyOpen,
    demoJourneyStep,
    setDemoJourneyStep,
    completeIntervention,
    submitIndustryFeedback,
    student,
    setActiveTab,
    setRole,
  } = useCareerOS();

  const [simulatedComplete, setSimulatedComplete] = useState(false);

  if (!demoJourneyOpen) return null;

  const stages = [
    {
      step: 1,
      tag: '01 Curriculum Intelligence',
      title: 'Institution Syllabus Mapped to Industry',
      actor: 'Institution',
      icon: BookOpen,
      desc: 'National Institute of Technology uploads CS704 Cloud & Distributed Computing syllabus. Autonomous AI analyzes concepts and discovers that legacy virtualization theory has a Critical Lab Gap against 2026 Kubernetes orchestration requirements.',
      actionLabel: 'View Curriculum Gap',
      targetTab: 'curriculum-intelligence',
      targetRole: 'institution',
      dataSnapshot: {
        'Syllabus Code': 'CS704',
        'Theory Alignment': '88% Aligned',
        'Practical Exposure': 'Low (Gap: Kubernetes & Streaming)',
        'Recommendation': 'Deploy Cloud Native lab & streaming API practicum',
      },
    },
    {
      step: 2,
      tag: '02 Student Capability',
      title: 'Resume Parsed into Verifiable Career DNA',
      actor: 'Student',
      icon: Dna,
      desc: 'Aarav Sharma uploads GitHub & academic resume. Autonomous AI extracts structured skill proficiency, verifies his Agentic RAG capstone project, and logs initial Career Readiness at 78%.',
      actionLabel: 'Inspect Career DNA',
      targetTab: 'career-dna',
      targetRole: 'student',
      dataSnapshot: {
        'Candidate': 'Aarav Sharma (B.Tech CS)',
        'Target Role': 'AI Engineer',
        'Initial Readiness': '78%',
        'Verified Skills': 'Python (92%), GenAI (88%), SQL (80%)',
      },
    },
    {
      step: 3,
      tag: '03 Industry Demand',
      title: 'Enterprise Job Requirements Ingested',
      actor: 'Industry',
      icon: Building,
      desc: 'NovaTech Labs posts "Junior AI Platform Engineer" role. Real-time NLP parsing reveals 88% of requirements demand Node.js streaming APIs, token meter caching, and Kubernetes deployment evidence.',
      actionLabel: 'View Matched Role',
      targetTab: 'opportunities',
      targetRole: 'student',
      dataSnapshot: {
        'Enterprise': 'NovaTech Labs (Demo)',
        'Open Role': 'Junior AI Platform Engineer',
        'Compensation': '₹14L – ₹18L / annum',
        'Key Mandates': 'High-throughput Node.js streaming & Kubernetes',
      },
    },
    {
      step: 4,
      tag: '04 Skill Gap Detection',
      title: 'Precision Gap & ROI Calculated',
      actor: 'Intelligence Engine',
      icon: Target,
      desc: 'CareerOS runs semantic differential between Aarav\'s Career DNA and NovaTech requirements. Detects Critical Gap: Node.js & Streaming APIs (Current 54% vs Required 85%, Gap: 31%).',
      actionLabel: 'Analyze Skill Gap',
      targetTab: 'skill-gaps',
      targetRole: 'student',
      dataSnapshot: {
        'Top Blocker': 'Node.js & Streaming Backend APIs',
        'Current Level': '54%',
        'Target Benchmark': '85%',
        'Priority': 'Critical (Impact Score: 92/100)',
      },
    },
    {
      step: 5,
      tag: '05 Targeted Intervention',
      title: 'Actionable Studio Project Assigned',
      actor: 'Intervention Engine',
      icon: ShieldCheck,
      desc: 'Instead of assigning generic courses, CareerOS prescribes building a production-grade "Server-Sent Events / WebSocket Inference Gateway" with automated token rate limiting.',
      actionLabel: 'Review Intervention',
      targetTab: 'interventions',
      targetRole: 'student',
      dataSnapshot: {
        'Intervention': 'SSE Streaming Inference Proxy Gateway',
        'Evidence Type': 'GitHub Repository + Live Endpoint',
        'Duration': '2 Weeks Focused Sprint',
        'Verification': 'Automated Static Analyzer & Faculty Review',
      },
    },
    {
      step: 6,
      tag: '06 Assessment & Verification',
      title: 'Evidence Verified by Faculty Evaluator',
      actor: 'Academician',
      icon: Award,
      desc: 'Prof. R. Sundaram reviews the streaming gateway code and approves the verified artifact. Aarav passes the 92% benchmark test, lifting his Node.js score from 54% to 82%!',
      actionLabel: 'Trigger Verification Live',
      triggerAction: () => {
        completeIntervention('int_1');
        setSimulatedComplete(true);
      },
      dataSnapshot: {
        'Evaluator': 'Dr. R. Sundaram (NIT Faculty)',
        'Score Awarded': '94% Technical Architecture',
        'Skill Status Change': 'Developing → Verified (82%)',
        'Trust Boost': '+7% Internal Skill Trust Score',
      },
    },
    {
      step: 7,
      tag: '07 Opportunity Match Surge',
      title: 'Match Score Escalates to 97%',
      actor: 'Opportunity Engine',
      icon: Briefcase,
      desc: 'Because the ecosystem is unified, closing the Node.js gap directly recalculates NovaTech job matching from 92% to 97%! NovaTech recruiter receives an instant verified candidate alert.',
      actionLabel: 'View Unlocked Opportunity',
      targetTab: 'opportunities',
      targetRole: 'student',
      dataSnapshot: {
        'New Match Score': '97% (Top 1% Cohort)',
        'Missing Requirements': 'Resolved (0 blockers)',
        'Application Status': 'Fast-Track Interview Ready',
      },
    },
    {
      step: 8,
      tag: '08 Industry Practicum Feedback',
      title: 'Enterprise Supervisor Logs 4.8/5 Review',
      actor: 'Industry Partner',
      icon: Building,
      desc: 'NovaTech supervisor submits performance evaluation praising streaming pipeline ownership and schema resilience. The system integrates feedback into Aarav\'s profile.',
      actionLabel: 'Log Industry Feedback Live',
      triggerAction: () => {
        submitIndustryFeedback(
          'NovaTech Labs',
          'Junior AI Platform Engineer',
          4.8,
          'Aarav demonstrated exemplary ownership of streaming gateways and low-latency token caching.'
        );
      },
      dataSnapshot: {
        'Supervisor Rating': '4.8 / 5.0 Composite',
        'Problem Solving': '5.0 / 5.0 (Schema Drift Triage)',
        'Endorsement': 'Strong hire recommendation',
      },
    },
    {
      step: 9,
      tag: '09 Closed-Loop Career Evolution',
      title: 'Full Loop Complete: 78% → 86% Readiness',
      actor: 'Ecosystem Intelligence',
      icon: TrendingUp,
      desc: 'The closed loop concludes: Curriculum aligned, skill built, evidence verified, opportunity unlocked, and industry feedback recorded. The institutional Skill Heatmap and placement metrics automatically elevate.',
      actionLabel: 'View Evolved Skill Passport',
      targetTab: 'skill-passport',
      targetRole: 'student',
      dataSnapshot: {
        'Starting Readiness': '78%',
        'Current Readiness': `${student.careerReadiness}%`,
        'Skill Trust Score': `${student.skillTrust}%`,
        'Employability State': 'Placed / Tier-1 Ready',
      },
    },
  ];

  const activeStage = stages[demoJourneyStep - 1] || stages[0];
  const Icon = activeStage.icon;

  const handleNext = () => {
    if (demoJourneyStep < stages.length) {
      setDemoJourneyStep(demoJourneyStep + 1);
    }
  };

  const handlePrev = () => {
    if (demoJourneyStep > 1) {
      setDemoJourneyStep(demoJourneyStep - 1);
    }
  };

  const handleExecuteAction = () => {
    if (activeStage.triggerAction) {
      activeStage.triggerAction();
    }
    if (activeStage.targetTab) {
      if (activeStage.targetRole) {
        setRole(activeStage.targetRole as any);
      }
      setActiveTab(activeStage.targetTab);
      setDemoJourneyOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl rounded-3xl bg-black/95 border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.25)] overflow-hidden text-white flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-3 sm:p-5 border-b border-blue-900/40 bg-black/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-lg font-bold text-white tracking-tight truncate">
                  Interactive Ecosystem Tour
                </h2>
                <span className="text-[10px] sm:text-xs bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full border border-blue-500/30 shrink-0">
                  Step {demoJourneyStep} of 9
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-400 font-mono truncate">
                Curriculum → Capability → Evidence → Opportunity → Feedback → Career Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={() => setDemoJourneyOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-950/50 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 9-Step Progress Ribbon */}
        <div className="p-3 bg-black/80 border-b border-blue-900/40 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[760px] px-2">
            {stages.map((st) => {
              const isCurrent = st.step === demoJourneyStep;
              const isPast = st.step < demoJourneyStep;
              return (
                <button
                  key={st.step}
                  onClick={() => setDemoJourneyStep(st.step)}
                  className={`flex flex-col items-center gap-1 group transition-all ${
                    isCurrent
                      ? 'scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                      isCurrent
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 ring-2 ring-blue-300'
                        : isPast
                        ? 'bg-blue-800 text-white'
                        : 'bg-black/60 border border-blue-900/50 text-slate-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4 text-white" /> : st.step}
                  </div>
                  <span
                    className={`text-[10px] font-medium whitespace-nowrap ${
                      isCurrent ? 'text-blue-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {st.tag.split(' ')[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Content Card */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-black/60">
          {/* Left Column: Narrative & Action */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400 font-mono">
                  {activeStage.tag}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Actor: {activeStage.actor}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Icon className="w-6 h-6 text-blue-400 shrink-0" />
                <span>{activeStage.title}</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                {activeStage.desc}
              </p>
            </div>

            {/* Stage Live Interaction Trigger */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/80 border border-blue-900/50 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Interactive Action for this Stage</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Jump directly to this module or execute live state change.</div>
              </div>
              <button
                onClick={handleExecuteAction}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all shrink-0"
              >
                <span>{activeStage.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Data Snapshot Telemetry */}
          <div className="lg:col-span-5 rounded-2xl bg-black/80 border border-blue-500/30 p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>CareerOS Telemetry Snapshot</span>
                <span className="text-[10px] font-mono text-blue-400">Live State</span>
              </div>

              <div className="space-y-3">
                {Object.entries(activeStage.dataSnapshot).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-black border border-blue-900/40">
                    <div className="text-[10px] font-mono uppercase text-slate-400">{key}</div>
                    <div className="text-xs font-semibold text-white mt-0.5">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-900/40 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span className="text-blue-300">Readiness: {student.careerReadiness}%</span>
              <span className="text-cyan-300">Trust Score: {student.skillTrust}%</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-3 sm:p-4 bg-black/90 border-t border-blue-900/40 flex items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            disabled={demoJourneyStep === 1}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-blue-950/40 disabled:opacity-30 transition-colors shrink-0"
          >
            <span className="hidden sm:inline">← Previous Stage</span>
            <span className="sm:hidden">← Prev</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Stage {demoJourneyStep} of {stages.length}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={demoJourneyStep === stages.length}
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30 shadow-md shadow-blue-600/30 transition-all shrink-0"
          >
            <span className="hidden sm:inline">Next Stage</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
