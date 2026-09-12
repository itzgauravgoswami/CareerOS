'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  GraduationCap,
  Users,
  Award,
  CheckCircle2,
  FolderGit2,
  BookOpen,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
  X,
} from 'lucide-react';

export default function AcademicianDashboard() {
  const { student, updateSkillScore, addToast } = useCareerOS();

  const [selectedStudent, setSelectedStudent] = useState<any>(student);
  const [verifyingProject, setVerifyingProject] = useState<string | null>(null);

  const cohort = [
    {
      id: student.id,
      name: student.name,
      roll: '106121045',
      branch: 'Computer Science & Engineering',
      targetRole: student.targetRole,
      careerReadiness: student.careerReadiness,
      skillTrust: student.skillTrust,
      pendingVerifications: 1,
    },
    {
      id: 'std_02',
      name: 'Priya Patel',
      roll: '106121062',
      branch: 'Computer Science & Engineering',
      targetRole: 'Backend Systems Architect',
      careerReadiness: 84,
      skillTrust: 79,
      pendingVerifications: 0,
    },
    {
      id: 'std_03',
      name: 'Vikram Iyer',
      roll: '106121088',
      branch: 'Computer Science & Engineering',
      targetRole: 'DevOps & Cloud Engineer',
      careerReadiness: 76,
      skillTrust: 72,
      pendingVerifications: 2,
    },
  ];

  const handleApproveProject = (projId: string) => {
    updateSkillScore('Node.js', 85, 'verified');
    setVerifyingProject(null);
    addToast(
      'Faculty Verification Approved',
      `Dr. Sundaram verified Aarav Sharma's streaming API gateway artifact. Skill updated to Verified!`,
      'success'
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 font-mono">
              Faculty Command &amp; Audit Workspace
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">NIT Computer Science Department</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400 shrink-0" />
            <span>Faculty Mentorship &amp; Verification Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Welcome, <strong className="text-white">Prof. R. Sundaram</strong>. Audit student project artifacts,
            cryptographically certify competencies for the Skill Passport, and align laboratory curricula to industry
            demands.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-left md:text-right shrink-0">
            <div className="text-[10px] font-mono uppercase text-slate-400">Mentored Students</div>
            <div className="text-xl font-bold text-indigo-400 font-mono">48 Assigned</div>
          </div>
        </div>
      </div>

      {/* Cohort Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-md">
          <div className="text-xs text-slate-400 uppercase font-mono">Average Cohort Readiness</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono mt-1">79.3%</div>
          <div className="text-[11px] text-slate-400 mt-1">Up 4.2% following streaming lab module</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-md">
          <div className="text-xs text-slate-400 uppercase font-mono">Pending Artifact Audits</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono mt-1">3 Projects</div>
          <div className="text-[11px] text-slate-400 mt-1">Requires faculty review &amp; signature</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-md sm:col-span-2 lg:col-span-1">
          <div className="text-xs text-slate-400 uppercase font-mono">Industry Placements Ready</div>
          <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono mt-1">82% of Cohort</div>
          <div className="text-[11px] text-slate-400 mt-1">Eligible for Tier-1 recruitment drives</div>
        </div>
      </div>

      {/* Student Cohort List & Inspection */}
      <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Student Mentorship Cohort</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click a student to inspect Career DNA and verify pending deliverables</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Class of 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cohort.map((s) => {
            const isSelected = selectedStudent.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#121E36] border-indigo-500 shadow-lg'
                    : 'bg-[#090F1E] border-[#1E293B] hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">{s.roll}</span>
                  {s.pendingVerifications > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {s.pendingVerifications} Pending Audit
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white">{s.name}</h4>
                <div className="text-xs text-indigo-300 font-medium mt-0.5">{s.targetRole}</div>

                <div className="mt-4 pt-3 border-t border-[#1E293B]/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Readiness</span>
                    <span className="font-bold text-emerald-400 font-mono">{s.careerReadiness}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] block uppercase">Skill Trust</span>
                    <span className="font-bold text-cyan-400 font-mono">{s.skillTrust}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Artifact Verification Studio (Aarav Sharma's Project) */}
      <div className="rounded-2xl sm:rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Pending Capstone Artifact Audit</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              SSE Streaming Inference Proxy Gateway &mdash; Aarav Sharma
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Submitted via Intervention Engine to resolve Node.js Streaming deficit</p>
          </div>

          <button
            onClick={() => handleApproveProject('proj_streaming')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all shrink-0 w-full sm:w-auto"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Approve &amp; Certify to Skill Passport</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] space-y-2">
            <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold">Repository &amp; Telemetry</div>
            <div className="text-slate-200">
              Artifact URL:{' '}
              <a
                href="https://github.com/aaravsharma/sse-inference-proxy"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 underline break-all"
              >
                github.com/aaravsharma/sse-inference-proxy
              </a>
            </div>
            <div className="text-slate-400">Automated Static Analysis: 0 Vulnerabilities • 98% Test Coverage</div>
            <div className="text-slate-400">Performance Benchmark: 2,400 concurrent streams at &lt;8ms jitter</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] space-y-2">
            <div className="text-[10px] uppercase font-mono text-indigo-400 font-bold">Faculty Rubric Notes</div>
            <textarea
              defaultValue="Exceptional implementation of Transform stream backpressure and client disconnect lifecycle handling. Full adherence to production-grade distributed gateway patterns."
              className="w-full bg-[#0D1527] border border-[#1E293B] rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
