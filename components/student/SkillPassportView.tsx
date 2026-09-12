'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  Share2,
  Download,
  Copy,
  Sparkles,
  QrCode,
  Lock,
  Building,
  Eye,
  X,
} from 'lucide-react';

export default function SkillPassportView() {
  const { student, addToast } = useCareerOS();

  const [publicModalOpen, setPublicModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified' | 'demonstrated'>('verified');

  const verifiedSkills = student.skills.filter((s) =>
    selectedFilter === 'all' ? true : selectedFilter === 'verified' ? s.status === 'verified' : s.status === 'demonstrated'
  );

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('Link Copied', 'Public cryptographically anchored credential link copied to clipboard.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0D1527] via-[#101F3B] to-[#0A1224] border border-cyan-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              The Sovereign Capability Record
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">UUID: {student.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-cyan-400" />
            <span>Verified Skill Passport</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            The core decentralized credential of CareerOS. Replaces static resumes with tamper-proof, evidence-anchored
            skill verifications, faculty evaluations, and industry endorsements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setPublicModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-black font-bold shadow-md shadow-cyan-600/20 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Employer Verification View</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="p-2.5 rounded-xl bg-[#090F1E] border border-[#1E293B] text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            title="Share Public Passport Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Passport Identity Header Card */}
      <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shrink-0">
              <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{student.name}</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Identity Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {student.department} • {student.institution}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                <span>Target: <strong className="text-cyan-300">{student.targetRole}</strong></span>
                <span>•</span>
                <span>CGPA: {student.cgpa}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#1E293B] pt-4 md:pt-0 md:pl-6">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Composite Readiness</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">{student.careerReadiness}%</div>
            </div>
            <div className="text-right pl-4 border-l border-[#1E293B]">
              <div className="text-[10px] uppercase font-mono text-slate-400">Skill Trust Score</div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">{student.skillTrust}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Skills Ledger */}
      <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Verified Capability Ledger</h3>
            <p className="text-xs text-slate-400 mt-0.5">Backed by code artifacts, benchmark exams, and faculty audits</p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090F1E] p-1 rounded-xl border border-[#1E293B] text-xs overflow-x-auto scrollbar-none flex-nowrap -mx-1 px-1">
            <button
              onClick={() => setSelectedFilter('verified')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedFilter === 'verified'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Verified ({student.skills.filter((s) => s.status === 'verified').length})
            </button>
            <button
              onClick={() => setSelectedFilter('demonstrated')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedFilter === 'demonstrated'
                  ? 'bg-cyan-600 text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Demonstrated ({student.skills.filter((s) => s.status === 'demonstrated').length})
            </button>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Skills ({student.skills.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {verifiedSkills.map((sk) => (
            <div
              key={sk.id}
              className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-[10px] uppercase text-slate-400">{sk.category}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                    <ShieldCheck className="w-3 h-3" /> {sk.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">{sk.name}</h4>

                <div className="mt-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Score:</span>
                  <span className="font-mono font-bold text-cyan-300">{sk.currentScore}%</span>
                </div>

                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Trust Rating:</span>
                  <span className="font-mono font-bold text-emerald-400">{sk.trustScore}%</span>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-[#1E293B]/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{sk.evidenceCount} Artifacts</span>
                <span>{sk.lastVerifiedDate || 'Spring 2026'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Employer Verification Modal */}
      {publicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl bg-[#090F1E] border border-cyan-500/50 shadow-2xl p-6 sm:p-8 text-white flex flex-col max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Public Recruiter Verification View</h3>
                  <p className="text-xs text-slate-400 font-mono">CarrierOS Cryptographic Anchor: SHA-256 Validated</p>
                </div>
              </div>
              <button
                onClick={() => setPublicModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-5">
              <div className="p-5 rounded-2xl bg-[#0D1527] border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{student.name}</div>
                  <div className="text-xs text-slate-300">{student.institution} • B.Tech CS (Grad 2026)</div>
                  <div className="text-xs text-cyan-300 font-mono mt-1">
                    Verified Target Role: {student.targetRole}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">Composite Fit</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">{student.careerReadiness}%</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Cryptographically Audited Skills
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {student.skills
                    .filter((s) => s.status === 'verified')
                    .map((s) => (
                      <div
                        key={s.id}
                        className="p-2.5 rounded-xl bg-[#0D1527] border border-[#1E293B] flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-200">{s.name}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400">{s.currentScore}%</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B1324] border border-[#1E293B] text-xs font-mono text-slate-400 space-y-1">
                <div className="break-all">Audit Fingerprint: 0x9f8b72c1a4e5d6789123456789abcdef0123456789</div>
                <div>Faculty Signature: Prof. R. Sundaram (NIT Trichy)</div>
                <div>Industry Endorsement: NovaTech Labs (4.8/5.0 Supervisor Rating)</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Verifier URL</span>
              </button>

              <button
                onClick={() => setPublicModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
