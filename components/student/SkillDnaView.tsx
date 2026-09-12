'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import { Skill, SkillStatus, SkillCategory } from '@/lib/types';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Filter,
  CheckCircle2,
  Clock,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Plus,
  Network,
} from 'lucide-react';

export default function SkillDnaView() {
  const { student, setActiveTab, addToast } = useCareerOS();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(student.skills[0] || null);

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'ai-ml', label: 'AI & Machine Learning' },
    { id: 'languages', label: 'Languages' },
    { id: 'backend-systems', label: 'Backend & Systems' },
    { id: 'databases', label: 'Databases & Cloud' },
    { id: 'core-cs', label: 'Core Computer Science' },
    { id: 'soft-skills', label: 'Professional Skills' },
  ];

  const statuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'verified', label: 'Verified (Evidence+Test)', color: 'text-emerald-400' },
    { id: 'demonstrated', label: 'Demonstrated (Project)', color: 'text-cyan-400' },
    { id: 'developing', label: 'Developing (Learning)', color: 'text-amber-400' },
    { id: 'claimed', label: 'Claimed (Self)', color: 'text-slate-400' },
  ];

  const filteredSkills = student.skills.filter((sk) => {
    const matchCat = selectedCategory === 'all' || sk.category === selectedCategory;
    const matchStat = selectedStatus === 'all' || sk.status === selectedStatus;
    return matchCat && matchStat;
  });

  const getStatusBadge = (status: SkillStatus) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Verified
          </span>
        );
      case 'demonstrated':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Award className="w-3 h-3" /> Demonstrated
          </span>
        );
      case 'developing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3" /> Developing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-400">
            Claimed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              Granular Capability Ledger
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{student.skills.length} Tracked Skills</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-cyan-400 shrink-0" />
            <span>Skill DNA & Capability Graph</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Every capability in CareerOS is classified into 4 evidence tiers: Claimed, Developing, Demonstrated, and
            Verified. Only verified and demonstrated skills pass through to enterprise recruiting pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">Skill Trust Score</div>
            <div className="text-xl font-bold text-cyan-400 font-mono">{student.skillTrust}%</div>
          </div>
          <button
            onClick={() => setActiveTab('assessments')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all flex items-center gap-1.5 shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Next Skill</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-nowrap -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#131E35]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0D1527] border border-[#1E293B] text-xs font-medium text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Skills Matrix + Detailed Skill Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skills Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredSkills.map((sk) => {
            const isSelected = activeSkill?.id === sk.id;
            return (
              <div
                key={sk.id}
                onClick={() => setActiveSkill(sk)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-[#121D35] border-cyan-500/50 shadow-lg'
                    : 'bg-[#0D1527] border-[#1E293B] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] font-mono uppercase text-slate-400">{sk.category}</div>
                  {getStatusBadge(sk.status)}
                </div>

                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white tracking-tight">{sk.name}</h4>
                  <span className="text-sm font-bold font-mono text-cyan-300">{sk.currentScore}%</span>
                </div>

                {/* Score Bar */}
                <div className="w-full h-1.5 rounded-full bg-[#1E293B] overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full ${
                      sk.status === 'verified'
                        ? 'bg-emerald-400'
                        : sk.status === 'demonstrated'
                        ? 'bg-cyan-400'
                        : sk.status === 'developing'
                        ? 'bg-amber-400'
                        : 'bg-slate-500'
                    }`}
                    style={{ width: `${sk.currentScore}%` }}
                  />
                </div>

                <div className="mt-3 pt-2 border-t border-[#1E293B]/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{sk.evidenceCount} Verified Artifacts</span>
                  <span className="font-mono">Trust: {sk.trustScore}%</span>
                </div>
              </div>
            );
          })}

          {filteredSkills.length === 0 && (
            <div className="col-span-2 py-12 text-center text-slate-500 text-xs">
              No skills match the selected filters.
            </div>
          )}
        </div>

        {/* Detailed Inspector Panel for Selected Skill */}
        <div className="lg:col-span-4 rounded-3xl bg-[#0D1527] border border-[#1E293B] p-6 shadow-lg flex flex-col justify-between">
          {activeSkill ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-cyan-400">{activeSkill.category}</span>
                  {getStatusBadge(activeSkill.status)}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{activeSkill.name}</h3>
                <p className="text-xs text-slate-400 mt-1">UUID: {activeSkill.id}</p>
              </div>

              {/* Capability Meter */}
              <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Current Measured Proficiency:</span>
                  <span className="font-mono font-bold text-cyan-300">{activeSkill.currentScore}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Internal Trust Score:</span>
                  <span className="font-mono font-bold text-emerald-400">{activeSkill.trustScore}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Evidence Count:</span>
                  <span className="font-mono text-slate-200">{activeSkill.evidenceCount} Artifacts</span>
                </div>
                {activeSkill.lastVerifiedDate && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Last Verified:</span>
                    <span className="font-mono text-slate-300">{activeSkill.lastVerifiedDate}</span>
                  </div>
                )}
              </div>

              {/* Related Project Artifacts */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2">Associated Projects in Career DNA:</div>
                <div className="space-y-1.5">
                  {student.projects
                    .filter((p) => p.skills.includes(activeSkill.name))
                    .map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded-xl bg-[#090F1E] border border-[#1E293B] text-xs"
                      >
                        <div className="font-semibold text-slate-200 truncate">{p.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Role: {p.role}</div>
                      </div>
                    ))}
                  {student.projects.filter((p) => p.skills.includes(activeSkill.name)).length === 0 && (
                    <div className="text-xs text-slate-500 italic">No direct project links yet.</div>
                  )}
                </div>
              </div>

              {/* Verification & Action Trigger */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (activeSkill.status === 'verified') {
                      addToast('Already Verified', `${activeSkill.name} is cryptographically anchored.`, 'info');
                    } else {
                      setActiveTab('assessments');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors text-center"
                >
                  {activeSkill.status === 'verified' ? 'View Cryptographic Certificate' : 'Take Skill Benchmark Exam →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">Select a skill to inspect its DNA.</div>
          )}

          <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] text-slate-400 flex items-center justify-between">
            <span>Graph Ontology</span>
            <span className="font-mono text-indigo-400">CareerOS v3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
