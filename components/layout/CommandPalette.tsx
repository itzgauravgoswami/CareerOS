'use client';

import React, { useState, useEffect } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Search,
  Dna,
  Cpu,
  Target,
  GitMerge,
  Video,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  Bot,
  PlayCircle,
  Building2,
  Building,
  X,
  ArrowRight,
} from 'lucide-react';

export default function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setActiveTab,
    setRole,
    setCopilotOpen,
    setDemoJourneyOpen,
  } = useCareerOS();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const commands = [
    {
      category: 'Intelligence Workflows',
      items: [
        {
          title: 'Analyze Priority Skill Gaps',
          desc: 'Inspect Node.js, Cloud, and System Design gaps',
          icon: Target,
          action: () => {
            setActiveTab('skill-gaps');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Simulate Career Switch (AI Scenario Engine)',
          desc: 'Simulate "What happens if I learn React and Node.js?"',
          icon: Cpu,
          action: () => {
            setActiveTab('career-twin');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Start AI Mock Interview',
          desc: 'Practice Technical, Behavioral, or System Design rounds',
          icon: Video,
          action: () => {
            setActiveTab('interview');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Launch Interactive Demo Tour',
          desc: 'Experience 9-step ecosystem from curriculum to feedback',
          icon: PlayCircle,
          action: () => {
            setDemoJourneyOpen(true);
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Open AI Career Copilot',
          desc: 'Consult your embedded AI Career Advisor',
          icon: Bot,
          action: () => {
            setCopilotOpen(true);
            setCommandPaletteOpen(false);
          },
        },
      ],
    },
    {
      category: 'Core Modules',
      items: [
        {
          title: 'Career DNA & Resume Intelligence',
          desc: 'View unified timeline and upload updated resume',
          icon: Dna,
          action: () => {
            setActiveTab('career-dna');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Verified Skill Passport',
          desc: 'Public shareable credential with evidence stamps',
          icon: GraduationCap,
          action: () => {
            setActiveTab('skill-passport');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'High-Match Opportunity Engine',
          desc: 'NovaTech, Aether Labs, and VertexWorks job matching',
          icon: Briefcase,
          action: () => {
            setActiveTab('opportunities');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Assessments & Certifications',
          desc: 'Take standardized coding and MCQ benchmark tests',
          icon: Award,
          action: () => {
            setActiveTab('assessments');
            setCommandPaletteOpen(false);
          },
        },
      ],
    },
    {
      category: 'Role Switcher',
      items: [
        {
          title: 'Switch to Student View',
          desc: 'Aarav Sharma · B.Tech CS · Target: AI Engineer',
          icon: Dna,
          action: () => {
            setRole('student');
            setActiveTab('dashboard');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Switch to Institution Command Center',
          desc: 'Curriculum intelligence, cohort heatmap & early interventions',
          icon: Building2,
          action: () => {
            setRole('institution');
            setActiveTab('dashboard');
            setCommandPaletteOpen(false);
          },
        },
        {
          title: 'Switch to Industry Talent Intelligence',
          desc: 'Reverse candidate search, applicant pipeline, and feedback',
          icon: Building,
          action: () => {
            setRole('industry');
            setActiveTab('dashboard');
            setCommandPaletteOpen(false);
          },
        },
      ],
    },
  ];

  const filtered = commands
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (i) =>
          i.title.toLowerCase().includes(query.toLowerCase()) ||
          i.desc.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl bg-black/95 border border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.2)] overflow-hidden text-white flex flex-col max-h-[85vh]">
        {/* Search Input */}
        <div className="p-3 sm:p-4 border-b border-blue-900/40 flex items-center gap-2.5 sm:gap-3 bg-blue-950/20">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command, skill, opportunity, or question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {filtered.map((group) => (
            <div key={group.category} className="space-y-1">
              <div className="px-2 text-[10px] uppercase font-semibold text-blue-400 tracking-wider">
                {group.category}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-950/40 border border-transparent hover:border-blue-500/30 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-black text-blue-400 border border-blue-900/50 group-hover:border-blue-500/50 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching commands found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-3 sm:px-4 py-2 bg-black border-t border-blue-900/40 text-[10px] text-slate-400 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-blue-950/60 font-mono text-blue-300 border border-blue-900/50">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-blue-950/60 font-mono text-blue-300 border border-blue-900/50">↵</kbd> Select
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-blue-950/60 font-mono text-blue-300 border border-blue-900/50">esc</kbd> Dismiss
            </span>
          </div>
          <span className="sm:hidden text-[10px] text-slate-400">Tap item to execute action</span>
          <span className="font-mono text-blue-400 text-[10px]">Command Engine</span>
        </div>
      </div>
    </div>
  );
}
