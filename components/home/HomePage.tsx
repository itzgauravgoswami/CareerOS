'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Dna,
  Layers,
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  Target,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Bot,
  Lock,
  ExternalLink,
  Search,
  Database,
  Activity,
  BarChart3,
  HelpCircle,
  Fingerprint,
  Code2,
  FileCode2,
  Terminal,
  BookOpen,
  Check,
  ArrowUp,
} from 'lucide-react';
import { useCareerOS } from '@/context/CareerOSContext';

// Glowing Cyber Horizontal Divider Component
function CyberDivider() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-6 sm:my-10">
      <div className="relative flex items-center justify-center">
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { setRole, setActiveTab } = useCareerOS();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleLaunchRole = (role: 'student' | 'academician' | 'institution' | 'industry') => {
    setRole(role);
    setActiveTab('dashboard');
    navigate('/app');
  };

  const faqs = [
    {
      q: 'How is CareerOS different from traditional LMS platforms or LinkedIn?',
      a: 'Traditional platforms rely on static self-reported claims, buzzwords, and outdated GPA metrics. CareerOS constructs a live, multi-dimensional Career Digital Twin backed by GitHub commit verification, faculty audit signatures, live AI interview benchmarks, and automated curriculum-market parity audits.',
    },
    {
      q: 'How does the Autonomous AI Intelligence Engine power the ecosystem?',
      a: 'Our autonomous AI engine powers real-time multimodal resume parsing, zero-day syllabus gap discovery against current live tech hiring vacancies, Monte Carlo career scenario simulations, and personalized early intervention remediation roadmaps.',
    },
    {
      q: 'How do universities and colleges adopt CareerOS without replacing existing ERPs?',
      a: 'CareerOS functions as an intelligence overlay. Institutions upload department course syllabi and student registry data via standard APIs or bulk CSV/PDF upload. CareerOS immediately returns actionable NAAC/NBA alignment matrices and student readiness heatmaps.',
    },
    {
      q: 'How does the Cryptographic Skill Passport guarantee credential integrity?',
      a: 'Every verified milestone (project commit, assessment score, faculty endorsement) is cryptographically signed and encoded into a public verification QR token that external recruiters can validate in real-time with zero friction.',
    },
    {
      q: 'What is the Reverse Talent Search Engine for industry recruiters?',
      a: 'Instead of screening thousands of keyword-stuffed resumes, recruiters query by verifiable execution parameters (e.g. "Candidate must possess verified Node.js streaming APIs, minimum 80% code trust score, and faculty-approved capstone"). Instant matched candidates are returned.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-clip selection:bg-blue-600 selection:text-white">
      {/* Background Cyber Gridlines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-grid-cyber opacity-75"
        aria-hidden="true"
      />
      {/* Ambient Blue Radial Glows */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.24),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(30,64,175,0.15),transparent_60%)]"
        aria-hidden="true"
      />

      {/* Navigation Bar (Sticky Top) */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-900/40 bg-black/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.85)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white">CareerOS</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                  v3.8 Enterprise
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">Skill Intelligence Network</p>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors">Core Architecture</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum AI</a>
            <a href="#reverse-hiring" className="hover:text-white transition-colors">Reverse Talent</a>
            <a href="#personas" className="hover:text-white transition-colors">Ecosystem</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-blue-950/40 border border-blue-900/50 hover:border-blue-500/40 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/app"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="relative z-10 pt-6 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Top Innovation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs font-medium mb-5 shadow-[0_0_25px_rgba(59,130,246,0.2)] mx-auto">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Workforce Readiness & Skill Verification</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="font-mono text-blue-200 text-xs">Autonomous AI Intelligence Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-tight">
          Transform Academic Learning into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
            Verifiable Career Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          The autonomous academia-to-industry skill intelligence network. Connecting student capabilities, faculty mentorship, university curriculum agility, and reverse talent recruitment into a single, closed-loop operating system.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/35 hover:shadow-blue-500/55 transition-all flex items-center justify-center gap-2.5 group"
          >
            <span>Enter CareerOS Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-semibold bg-black/80 hover:bg-blue-950/40 border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Sign In / Create Account</span>
          </Link>
        </div>

        {/* Quick Launch Personas */}
        <div className="mt-12 pt-8 border-t border-blue-900/30 flex flex-wrap items-center justify-center gap-2.5 text-xs">
          <span className="text-slate-400 mr-2 font-medium">Quick Evaluator Jump:</span>
          <button
            onClick={() => handleLaunchRole('student')}
            className="px-3.5 py-2 rounded-xl bg-blue-950/40 border border-blue-900/50 hover:border-blue-400 text-blue-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Dna className="w-3.5 h-3.5 text-blue-400" />
            <span>Student (Aarav Sharma)</span>
          </button>
          <button
            onClick={() => handleLaunchRole('academician')}
            className="px-3.5 py-2 rounded-xl bg-blue-950/40 border border-blue-900/50 hover:border-blue-400 text-blue-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            <span>Faculty (Prof. Sundaram)</span>
          </button>
          <button
            onClick={() => handleLaunchRole('institution')}
            className="px-3.5 py-2 rounded-xl bg-blue-950/40 border border-blue-900/50 hover:border-blue-400 text-blue-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Institution (NIT Director)</span>
          </button>
          <button
            onClick={() => handleLaunchRole('industry')}
            className="px-3.5 py-2 rounded-xl bg-blue-950/40 border border-blue-900/50 hover:border-blue-400 text-blue-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>Industry (Talent Recruiter)</span>
          </button>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 2: LIVE INDUSTRY TELEMETRY & METRIC STRIP
          ========================================================================= */}
      <section id="metrics" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[60vh] flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Real-Time Telemetry
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Measurable Acceleration in Career Readiness
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Continuously benchmarking student skill vectors against 2026 hiring standards across top tech enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-black/85 border border-blue-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-mono text-blue-400 uppercase">Verification Trust</span>
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">98.4%</div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Multi-factor cryptographic consensus replacing fraudulent unverified resume claims.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
              +14.2% over standard GPA screening
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/85 border border-blue-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-mono text-blue-400 uppercase">Curriculum Gap Discovery</span>
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 font-mono">0-Day</div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Automated syllabus audits flag obsolete theory within 24 hours of industry labor shifts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
              Tested on 120+ syllabus modules
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/85 border border-blue-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-mono text-blue-400 uppercase">Placement Velocity</span>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">3.4x</div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Faster time-to-offer driven by targeted early interventions and AI interview simulations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
              Average 18 days vs 62 days industry avg
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/85 border border-blue-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-mono text-blue-400 uppercase">Standardized Ontology</span>
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 font-mono">400+</div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Normalized skill nodes mapped to O*NET, ESCO, and current Cloud/AI industry taxonomies.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
              Live semantic graph indexing
            </div>
          </div>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 3: HOW CAREEROS WORKS (THE 4-STAGE PIPELINE)
          ========================================================================= */}
      <section id="how-it-works" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh] flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            System Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            How CareerOS Closes the Capability Loop
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            From raw academic coursework to verified cryptographic credentials and reverse industry hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-black/80 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono font-bold text-lg mb-6 shadow-md">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Source Ingestion</h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Students connect GitHub repositories, academic transcripts, and project portfolios. Autonomous AI extracts granular code proficiencies and problem-solving velocity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center gap-1.5 text-xs text-blue-300 font-mono">
              <Dna className="w-3.5 h-3.5 text-blue-400" />
              <span>Career DNA Generated</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/80 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono font-bold text-lg mb-6 shadow-md">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Zero-Day Gap Analysis</h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                The skill vector is evaluated against target roles. Missing proficiencies (e.g. streaming APIs, cloud native orchestration) are flagged with ROI rankings.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center gap-1.5 text-xs text-blue-300 font-mono">
              <Target className="w-3.5 h-3.5 text-blue-400" />
              <span>Priority Matrix Calculated</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/80 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono font-bold text-lg mb-6 shadow-md">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Intervention & Twin Simulator</h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Autonomous intervention protocols deliver guided capstones and AI mock interviews with automated rubric scoring to close gaps before final placements.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center gap-1.5 text-xs text-blue-300 font-mono">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Dynamic Trajectory Simulation</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/80 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono font-bold text-lg mb-6 shadow-md">
                04
              </div>
              <h3 className="text-lg font-bold text-white">Reverse Talent Placement</h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Industry recruiters query verified milestone proof directly. Students receive interview invitations with 0 intermediate spam applications.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center gap-1.5 text-xs text-blue-300 font-mono">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Cryptographic Passport Issued</span>
            </div>
          </div>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 4: CORE ARCHITECTURAL CAPABILITIES (BENTO GRID)
          ========================================================================= */}
      <section id="features" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh] flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Core Engine Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Engineered for Deep Verification
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Eliminating guesswork with mathematically grounded skill ontologies and AI reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Digital Twin */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-black/85 border border-blue-500/30 backdrop-blur-md shadow-2xl flex flex-col justify-between relative group hover:border-blue-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-[10px] font-mono uppercase text-blue-300 font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                Predictive Vector Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                Career Digital Twin & What-If Scenario Lab
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed max-w-2xl">
                Run Monte Carlo projections before committing hundreds of study hours. Test scenarios like &ldquo;What if I master PyTorch and Kubernetes over the next 6 weeks?&rdquo; to calculate predicted readiness jumps, salary benchmarks, and newly unlocked opportunities.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-300 font-mono">Dynamic Vector Calculus</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono">Neural Scenario Engine</span>
              </div>
              <Link to="/app" className="text-xs font-semibold text-white hover:text-blue-300 flex items-center gap-1.5">
                <span>Simulate Your Trajectory</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: Skill DNA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-black/85 border border-blue-900/40 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-5 shadow-lg shadow-blue-600/20">
                <Dna className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-[10px] font-mono uppercase text-blue-300 font-semibold px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                Capability Graph
              </span>
              <h3 className="text-2xl font-bold text-white mt-3">
                Multi-Factor Skill DNA
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                Constructs a rich multidimensional competency profile across languages, frameworks, architecture paradigms, and problem-solving habits.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-blue-900/40">
              <Link to="/app" className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1.5">
                <span>Inspect DNA Graph</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: Early Interventions */}
          <div className="p-8 sm:p-10 rounded-3xl bg-black/85 border border-blue-900/40 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-5 shadow-lg shadow-blue-600/20">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-[10px] font-mono uppercase text-blue-300 font-semibold px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                Proactive Remediation
              </span>
              <h3 className="text-2xl font-bold text-white mt-3">
                Early Intervention Engine
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                Automated risk triggers identify students falling behind campus drive readiness thresholds 6-9 months early, assigning tailored remedial micro-projects.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-blue-900/40">
              <Link to="/app" className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1.5">
                <span>View Risk Protocols</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Cryptographic Passport */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-black/85 border border-blue-500/40 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-5 shadow-lg shadow-blue-600/20">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-[10px] font-mono uppercase text-blue-300 font-semibold px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                Tamper-Proof Verification
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                Cryptographic Skill Passport & Reverse Matching
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed max-w-2xl">
                Every verified competency is hashed and signed by institutional mentors and AI evaluation benchmarks. Public QR verification endpoints allow tech recruiters to validate real candidate code execution proof in seconds.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-300 font-mono">SHA-256 Milestone Hashing</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono">Instant QR Authentication</span>
              </div>
              <Link to="/app" className="text-xs font-semibold text-white hover:text-blue-300 flex items-center gap-1.5">
                <span>View Passport Preview</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 5: CURRICULUM INTELLIGENCE & SYLLABUS MODERNIZATION
          ========================================================================= */}
      <section id="curriculum" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              For Universities & Autonomous Colleges
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Zero-Day Curriculum Modernization
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Curriculum committees usually update syllabi every 3-4 years, while tech industry hiring stacks evolve every 6 months. CareerOS resolves this lag with automated labor market parity audits.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/80 border border-blue-900/40 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-400 shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Automated Syllabus PDF Parsing</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Upload course syllabi (e.g. CS704 Distributed Systems). Autonomous AI cross-checks concept depth against live enterprise job descriptions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/80 border border-blue-900/40 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-400 shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">NAAC & NBA Accreditation Alignment</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Export industry-advisory board evidence documents, Course Outcome (CO) mappings, and student skill attainment rubrics with 1 click.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/80 border border-blue-900/40 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-400 shrink-0 mt-0.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Actionable Practical Lab Upgrades</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Replaces legacy simulation experiments with contemporary production tasks (e.g. replacing socket programming theory with Kafka streaming practicums).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Telemetry Box */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-black/90 border border-blue-500/40 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/40 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                <span className="text-xs font-mono font-bold text-white uppercase">Live Audit: CS704 Cloud Computing</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                NIT Academic Board
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black border border-blue-900/50 flex items-center justify-between">
                <span className="text-slate-400">Theoretical Foundations:</span>
                <span className="font-bold text-blue-400 font-mono">88% Aligned</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black border border-blue-900/50 flex items-center justify-between">
                <span className="text-slate-400">Hands-on Industry Practicum:</span>
                <span className="font-bold text-amber-400 font-mono">Critical Gap Discovered</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-2">
                <span className="text-[11px] font-bold text-blue-300 uppercase font-mono block">
                  AI Modernization Recommendation:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  &ldquo;Replace legacy virtual machine hypervisor lab with 2026 Kubernetes microservices orchestration and gRPC streaming APIs to lift graduate hireability by +38%.&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Curriculum Intelligence Engine</span>
              <button
                onClick={() => handleLaunchRole('institution')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                <span>Launch Institution Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 6: REVERSE TALENT SEARCH (FOR ENTERPRISE RECRUITERS)
          ========================================================================= */}
      <section id="reverse-hiring" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh] flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            For Tech Enterprises & Recruiters
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Reverse Talent Search & Bounties
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Stop filtering thousands of resume buzzwords. Query candidates by mathematical skill vectors, verified code execution, and faculty endorsements.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-black/90 border border-blue-500/40 backdrop-blur-md shadow-2xl max-w-5xl mx-auto w-full">
          {/* Mock Search Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-black border border-blue-900/60 flex items-center gap-3 shadow-inner mb-6">
            <Search className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="text-xs sm:text-sm font-mono text-white flex-1 truncate">
              ROLE: &ldquo;AI Engineer&rdquo; AND SKILL: &ldquo;Agentic RAG &gt; 80%&rdquo; AND &ldquo;Verified GitHub Commits&rdquo;
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-blue-500/20 text-blue-300 font-bold hidden sm:inline">
              Vector Query
            </span>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-black/80 border border-blue-900/50 hover:border-blue-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white">Aarav Sharma</span>
                <span className="text-[10px] font-mono font-bold text-blue-400">84% Match</span>
              </div>
              <div className="text-[11px] text-slate-400">B.Tech CS (7th Sem) • NIT</div>
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  Python (90%)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  Agentic RAG (88%)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  FastAPI (82%)
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-900/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Trust Score: 92%</span>
                <span className="text-blue-400 font-semibold cursor-pointer hover:underline">Direct Invite</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border border-blue-900/50 hover:border-blue-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white">Priya Patel</span>
                <span className="text-[10px] font-mono font-bold text-blue-400">89% Match</span>
              </div>
              <div className="text-[11px] text-slate-400">B.Tech CS (7th Sem) • IIT-B</div>
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  PyTorch (94%)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  Transformers (90%)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  Docker (85%)
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-900/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Trust Score: 95%</span>
                <span className="text-blue-400 font-semibold cursor-pointer hover:underline">Direct Invite</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border border-blue-900/50 hover:border-blue-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white">Rohan Kulkarni</span>
                <span className="text-[10px] font-mono font-bold text-blue-400">79% Match</span>
              </div>
              <div className="text-[11px] text-slate-400">M.Tech AI • IIIT-H</div>
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  LangChain (86%)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  Vector DB (84%)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-blue-300">
                  Python (88%)
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-900/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Trust Score: 88%</span>
                <span className="text-blue-400 font-semibold cursor-pointer hover:underline">Direct Invite</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              Over <span className="text-white font-bold">1,400+ students</span> indexed with cryptographically verifiable milestones.
            </div>
            <button
              onClick={() => handleLaunchRole('industry')}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <span>Explore Industry Talent Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 7: STAKEHOLDER ECOSYSTEM MATRIX (4 PORTALS)
          ========================================================================= */}
      <section id="personas" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh] flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Multi-Stakeholder Framework
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            One Operating System. Four Specialized Portals.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Every persona receives a tailored command center designed specifically for their mandate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-black/85 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5 shadow-md">
                <Dna className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Students</h4>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Adaptive learning roadmaps, AI mock interview simulator, Career Digital Twin what-if modeling, and verified skill passports.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Dynamic Vector Roadmaps
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> AI Mock Interviews
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Opportunity Recommendations
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleLaunchRole('student')}
              className="mt-6 pt-4 border-t border-blue-900/40 text-xs font-semibold text-blue-300 hover:text-white flex items-center justify-between w-full"
            >
              <span>Launch Student View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-7 rounded-3xl bg-black/85 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Academicians</h4>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Student cohort drilldowns, capstone project verification, mentoring requests queue, and course syllabus alignment.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Cohort Competency Heatmap
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Mentorship Request Inbox
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Capstone Verification Signoff
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleLaunchRole('academician')}
              className="mt-6 pt-4 border-t border-blue-900/40 text-xs font-semibold text-blue-300 hover:text-white flex items-center justify-between w-full"
            >
              <span>Launch Faculty View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-7 rounded-3xl bg-black/85 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5 shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Institutions</h4>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Placement readiness heatmaps, curriculum-industry parity audits, and institutional early alerts for accreditation bodies.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Placement Cliff Alerts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Syllabus Parity Telemetry
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> NAAC / NBA Export Reports
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleLaunchRole('institution')}
              className="mt-6 pt-4 border-t border-blue-900/40 text-xs font-semibold text-blue-300 hover:text-white flex items-center justify-between w-full"
            >
              <span>Launch Institution View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-7 rounded-3xl bg-black/85 border border-blue-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5 shadow-md">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Industry</h4>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Reverse talent search engine, capstone challenge posting, candidate pipeline tracker, and curriculum feedback submissions.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Parameterized Vector Search
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Post Capstone Challenges
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" /> Submit Syllabus Feedback
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleLaunchRole('industry')}
              className="mt-6 pt-4 border-t border-blue-900/40 text-xs font-semibold text-blue-300 hover:text-white flex items-center justify-between w-full"
            >
              <span>Launch Industry View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 8: ENTERPRISE SECURITY & VERIFICATION PROTOCOLS
          ========================================================================= */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh] flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Trust & Security Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Cryptographic Integrity at Every Touchpoint
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Eliminating credential inflation and fraudulent certificates through decentralized consensus algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-black/85 border border-blue-900/50 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5">
                <Fingerprint className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Immutable Milestone Signatures</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                Every code submission and verified assessment generates an SHA-256 hash combined with faculty authority signatures, preventing post-facto alteration.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
              Proof-of-Competence Protocol
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-black/85 border border-blue-900/50 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Interview Anti-Cheating</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                Live AI interview simulator runs conversational response latency tracking, gaze alignment detection, and multi-turn technical interrogation to verify independent mastery.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
              Autonomous Behavioral Diagnostics
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-black/85 border border-blue-900/50 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Zero-Knowledge Verification</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                Third-party recruiters can confirm candidate capability without exposing personal identification, contact details, or sensitive student records prior to consent.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
              Privacy-Preserving Verification
            </div>
          </div>
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section id="faq" className="relative z-10 py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[75vh] flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Insights & Implementation Details
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Everything judges and institutional decision-makers need to know about CareerOS.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={f.q}
                className="rounded-2xl cyber-card overflow-hidden shadow-lg relative group"
              >
                <div className="specular-top" />
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">{f.q}</span>
                  <div className={`p-1.5 rounded-lg bg-blue-950/60 border border-blue-900/50 text-cyan-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-blue-900/30 bg-black/50">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <CyberDivider />

      {/* =========================================================================
          SECTION 10: PRE-FOOTER CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="relative z-10 py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[60vh] flex flex-col justify-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#060c20]/90 via-[#020510] to-[#060c20]/90 border border-blue-500/50 text-center relative overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.35)]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          <div className="relative z-10">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Enterprise Production Ready
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-5">
              Deploy CareerOS in Your Institution Today
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              Experience the full interactive demonstration loop connecting students, faculty, institutions, and enterprise recruiters with zero friction.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app"
                className="w-full sm:w-auto px-9 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-blue-600/40 hover:shadow-cyan-500/60 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Interactive Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-medium bg-black/80 hover:bg-blue-950/40 border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white transition-all flex items-center justify-center shadow-md"
              >
                Sign In / Switch Role
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HIGH-IMPACT ULTRA-PREMIUM FOOTER
          ========================================================================= */}
      <footer className="relative z-10 border-t border-blue-500/20 bg-[#01030a] text-slate-400 overflow-hidden">
        {/* Subtle Cyber Grid & Ambient Top Glow */}
        <div className="absolute inset-0 bg-grid-cyber-fine opacity-20 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          {/* Top Row: System Telemetry & Quick Sandbox Persona Picker */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#040816]/80 border border-blue-900/50 backdrop-blur-xl mb-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>SYSTEM ONLINE</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="text-slate-300">Autonomous Neural Core Active</span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="text-blue-400">SHA-256 Consensus Validated</span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="text-cyan-400">Latency: 24ms</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px] uppercase mr-1">Evaluator Jump:</span>
              <button
                onClick={() => handleLaunchRole('student')}
                className="px-3 py-1.5 rounded-lg bg-black/60 border border-blue-900/60 hover:border-blue-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Dna className="w-3 h-3 text-blue-400" />
                <span>Student</span>
              </button>
              <button
                onClick={() => handleLaunchRole('academician')}
                className="px-3 py-1.5 rounded-lg bg-black/60 border border-blue-900/60 hover:border-blue-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3 h-3 text-blue-400" />
                <span>Faculty</span>
              </button>
              <button
                onClick={() => handleLaunchRole('institution')}
                className="px-3 py-1.5 rounded-lg bg-black/60 border border-blue-900/60 hover:border-blue-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Building2 className="w-3 h-3 text-blue-400" />
                <span>Institution</span>
              </button>
              <button
                onClick={() => handleLaunchRole('industry')}
                className="px-3 py-1.5 rounded-lg bg-black/60 border border-blue-900/60 hover:border-blue-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="w-3 h-3 text-blue-400" />
                <span>Industry</span>
              </button>
            </div>
          </div>

          {/* Main 4-Column Navigation Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-blue-900/40">
            {/* Column 1 & 2: Brand, Identity & Accreditations */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <div className="w-full h-full bg-[#020510] rounded-[10px] flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xl tracking-tight text-white">CareerOS</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30 font-semibold">
                      v3.8
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Autonomous Skill Intelligence Network</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                Transforming academic engineering coursework into mathematically verifiable competency vectors, multi-agent AI simulations, and zero-spam reverse talent matching.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-md bg-blue-950/50 border border-blue-900/60 text-cyan-300">
                  Enterprise v3.8
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-950/50 border border-blue-900/60 text-blue-300">
                  NAAC A++ Alignment
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-950/50 border border-blue-900/60 text-emerald-300">
                  NBA Outcome Metrics
                </span>
              </div>
            </div>

            {/* Column 3: Platform Architecture */}
            <div className="space-y-3 text-xs">
              <div className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Architecture</span>
              </div>
              <ul className="space-y-2.5 text-slate-300">
                <li>
                  <a href="#preview" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Live Interactive Console
                  </a>
                </li>
                <li>
                  <Link to="/app/career-twin" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Career Digital Twin Lab
                  </Link>
                </li>
                <li>
                  <Link to="/app/skill-dna" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Multi-Factor Skill DNA
                  </Link>
                </li>
                <li>
                  <a href="#curriculum" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> 0-Day Curriculum Parity
                  </a>
                </li>
                <li>
                  <a href="#reverse-hiring" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Reverse Talent Engine
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: 4-Portal Ecosystem */}
            <div className="space-y-3 text-xs">
              <div className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Portals</span>
              </div>
              <ul className="space-y-2.5 text-slate-300">
                <li>
                  <button onClick={() => handleLaunchRole('student')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Student Acceleration
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLaunchRole('academician')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Faculty Mentorship Board
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLaunchRole('institution')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Institutional Director Radar
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLaunchRole('industry')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Enterprise Talent Sourcing
                  </button>
                </li>
                <li>
                  <Link to="/login" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-blue-500" /> Switch Demo Evaluator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Compliance & Cryptography */}
            <div className="space-y-3 text-xs">
              <div className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Trust & Standards</span>
              </div>
              <ul className="space-y-2.5 text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>SHA-256 Milestone Proof</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Zero-Knowledge Privacy</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>O*NET & ESCO Ontologies</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Autonomous Neural Engine</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>AICTE Guidelines Ready</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Sub-Footer Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-slate-400 text-center sm:text-left">
              <span>&copy; 2026 CareerOS Intelligence Ecosystem. All Rights Reserved.</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="font-mono text-[11px]">React Router DOM • Pure Black & Cyber Blue</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-900/60 hover:border-blue-400 text-cyan-300 hover:text-white transition-all flex items-center gap-1 font-mono text-[11px] cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

