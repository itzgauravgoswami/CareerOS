'use client';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCareerOS } from '@/context/CareerOSContext';
import { UserRole } from '@/lib/types';
import {
  Compass,
  Dna,
  Cpu,
  Target,
  Sparkles,
  GitMerge,
  Layers,
  Users,
  GraduationCap,
  Award,
  Video,
  Briefcase,
  FolderGit2,
  TrendingUp,
  Building2,
  ShieldCheck,
  Bot,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  PieChart,
  UserCheck,
  Building,
  RotateCcw,
  X,
  Home,
  LogOut,
  ArrowRight,
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    student,
    setCopilotOpen,
    setDemoJourneyOpen,
    resetAllData,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useCareerOS();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setActiveTab('dashboard');
    navigate(`/app/dashboard`);
    setMobileSidebarOpen(false);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/app/${tabId}`);
    setMobileSidebarOpen(false);
  };

  const studentNav = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'career-dna', label: 'Career DNA', icon: Dna },
    { id: 'career-twin', label: 'Career Twin & Simulator', icon: Cpu },
    { id: 'skill-dna', label: 'Skill DNA & Graph', icon: Sparkles },
    { id: 'skill-gaps', label: 'Skill Gaps & ROI', icon: Target },
    { id: 'interventions', label: 'Intervention Engine', icon: ShieldCheck },
    { id: 'roadmap', label: 'Personalized Roadmap', icon: GitMerge },
    { id: 'learning-projects', label: 'Projects & Learning', icon: FolderGit2 },
    { id: 'mentors', label: 'Mentor Discovery', icon: Users },
    { id: 'assessments', label: 'Assessments', icon: Award },
    { id: 'interview', label: 'AI Interview Simulator', icon: Video },
    { id: 'opportunities', label: 'Opportunity Engine', icon: Briefcase },
    { id: 'applications', label: 'Application Tracker', icon: CheckCircle2 },
    { id: 'skill-passport', label: 'Verified Skill Passport', icon: GraduationCap },
    { id: 'market-intelligence', label: 'Market Intelligence', icon: TrendingUp },
  ];

  const academicianNav = [
    { id: 'dashboard', label: 'Faculty Command Center', icon: Compass },
    { id: 'students-drilldown', label: 'Student Cohort & DNA', icon: Users },
    { id: 'mentoring', label: 'Mentoring Requests', icon: GraduationCap },
    { id: 'projects-review', label: 'Project Verification', icon: FolderGit2 },
    { id: 'curriculum-alignment', label: 'Curriculum & Industry', icon: BookOpen },
    { id: 'industry-collab', label: 'Industry Opportunities', icon: Briefcase },
  ];

  const institutionNav = [
    { id: 'dashboard', label: 'Institution Overview', icon: Building2 },
    { id: 'placement-readiness', label: 'Placement Readiness', icon: PieChart },
    { id: 'skill-heatmap', label: 'Cohort Skill Heatmap', icon: Target },
    { id: 'curriculum-intelligence', label: 'Curriculum Intelligence', icon: BookOpen },
    { id: 'early-interventions', label: 'Early Intervention System', icon: ShieldCheck },
    { id: 'industry-partnerships', label: 'Industry Partnerships', icon: Building },
  ];

  const industryNav = [
    { id: 'dashboard', label: 'Talent Intelligence', icon: Building },
    { id: 'talent-search', label: 'Reverse Talent Search', icon: Target },
    { id: 'candidate-pipeline', label: 'Candidate Pipeline', icon: UserCheck },
    { id: 'post-opportunities', label: 'Roles & Challenges', icon: Briefcase },
    { id: 'industry-feedback', label: 'Submit Talent Feedback', icon: Award },
  ];

  const currentNav =
    role === 'student'
      ? studentNav
      : role === 'academician'
      ? academicianNav
      : role === 'institution'
      ? institutionNav
      : industryNav;

  const renderSidebarBody = (isMobile = false) => (
    <div className="flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-blue-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">CareerOS</span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  AI-V3
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono leading-none mt-0.5">Skill Intelligence OS</p>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          {isMobile && (
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-950/50 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Role Selector Badge Bar */}
        <div className="mt-3.5 bg-black/80 p-1 rounded-lg border border-blue-900/40 grid grid-cols-2 gap-1 text-[11px]">
          {(['student', 'academician', 'institution', 'industry'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={`py-1 px-2 rounded font-medium capitalize text-center transition-all ${
                role === r
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-blue-950/40'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        {/* Return to Public Home Landing Link */}
        <Link
          to="/"
          className="w-full flex items-center justify-between px-2.5 py-2 mb-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/40 border border-blue-900/30 hover:border-blue-500/40 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Home className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Home Landing Page</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <div className="px-2 py-1 text-[10px] uppercase font-semibold tracking-wider text-slate-400">
          {role} Workspace
        </div>
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-white border border-blue-500/40 font-semibold shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                  : 'text-slate-400 hover:text-white hover:bg-blue-950/30'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 shadow-[0_0_6px_#60a5fa]" />}
            </button>
          );
        })}

        {/* Interactive Demo Loop Section */}
        <div className="pt-3 mt-3 border-t border-blue-900/40">
          <div className="px-2 py-1 text-[10px] uppercase font-semibold tracking-wider text-blue-400">
            Showcase Mode
          </div>
          <button
            onClick={() => {
              setDemoJourneyOpen(true);
              setMobileSidebarOpen(false);
            }}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-blue-200 bg-blue-950/30 border border-blue-500/30 hover:bg-blue-900/40 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Interactive Demo Tour</span>
            </div>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1 rounded font-mono">9 Steps</span>
          </button>
        </div>
      </div>

      {/* Bottom Profile / Utility Section */}
      <div className="p-3 border-t border-blue-900/40 bg-black/90 space-y-2">
        {/* Quick Copilot Trigger Button */}
        <button
          onClick={() => {
            setCopilotOpen(true);
            setMobileSidebarOpen(false);
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-950/70 to-blue-900/50 border border-blue-500/40 text-blue-100 hover:border-blue-400 hover:text-white transition-all shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            <span>AI Career Copilot</span>
          </div>
          <span className="text-[10px] font-mono bg-blue-500/30 px-1.5 py-0.5 rounded text-blue-200">
            Ask AI
          </span>
        </button>

        {/* Student Quick Status */}
        {role === 'student' && (
          <div className="px-2.5 py-2 rounded-lg bg-black/70 border border-blue-900/40 flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-white truncate">{student.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{student.targetRole}</div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-blue-400">{student.careerReadiness}%</span>
              <div className="text-[9px] text-slate-400 uppercase">Readiness</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Sign In / Switch Role"
          >
            <LogOut className="w-3 h-3 text-blue-400" />
            <span>Switch Role</span>
          </Link>
          <button
            onClick={resetAllData}
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Reset prototype state to initial demo seeds"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
          <span className="text-[10px] font-mono text-slate-400">v3.8-Flash</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-black/95 border-r border-blue-900/40 flex-col h-screen sticky top-0 z-20 select-none backdrop-blur-md">
        {renderSidebarBody(false)}
      </aside>

      {/* Mobile Off-Canvas Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />

          {/* Drawer container */}
          <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-black/95 border-r border-blue-900/40 flex flex-col h-full shadow-2xl z-50 animate-in slide-in-from-left duration-200 select-none backdrop-blur-md">
            {renderSidebarBody(true)}
          </aside>
        </div>
      )}
    </>
  );
}
