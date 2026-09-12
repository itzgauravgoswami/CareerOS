'use client';

import React from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  GitMerge,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';

export default function RoadmapView() {
  const { student, roadmap, toggleRoadmapMilestone, setActiveTab } = useCareerOS();

  const totalPhases = roadmap.length;
  const currentPhase = roadmap.find((p) => p.status === 'in_progress')?.phaseNumber || 1;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 font-mono">
              Continuous Career Navigation
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Target Role: {student.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <GitMerge className="w-7 h-7 text-indigo-400" />
            <span>Personalized Career Roadmap</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            A dynamic, competency-based progression roadmap that adapts in real-time as you verify new skills,
            complete interventions, and clear assessments.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-right">
          <div className="text-[10px] font-mono uppercase text-slate-400">Roadmap Progress</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            Phase {currentPhase} of {totalPhases}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Competency Sprint</div>
        </div>
      </div>

      {/* Multi-Phase Timeline */}
      <div className="space-y-6">
        {roadmap.map((phase) => {
          const isCompleted = phase.status === 'completed';
          const isInProgress = phase.status === 'in_progress';
          const completedTasks = phase.tasks.filter((t) => t.completed).length;

          return (
            <div
              key={phase.phaseNumber}
              className={`p-4 sm:p-6 rounded-3xl border transition-all ${
                isCompleted
                  ? 'bg-[#091122]/70 border-emerald-500/30 shadow-sm'
                  : isInProgress
                  ? 'bg-[#0E172A] border-indigo-500/50 shadow-xl ring-1 ring-indigo-500/20'
                  : 'bg-[#090F1E] border-[#1E293B]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isInProgress
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-[#1E293B] text-slate-400'
                    }`}
                  >
                    0{phase.phaseNumber}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{phase.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{phase.timeframe}</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-indigo-300 font-medium">Milestone: {phase.milestone}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isInProgress
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? 'Phase Completed' : isInProgress ? 'In Progress Sprint' : 'Upcoming Phase'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {completedTasks}/{phase.tasks.length} Tasks
                  </span>
                </div>
              </div>

              {/* Skills Involved */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {phase.skills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#131E35] border border-slate-700/60 text-slate-300"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              {/* Tasks Checkbox List */}
              <div className="mt-4 pt-3 border-t border-[#1E293B]/80 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Competency Milestones (Click to toggle completion)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleRoadmapMilestone(phase.phaseNumber, task.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        task.completed
                          ? 'bg-[#080E1B] border-emerald-500/30 text-slate-300'
                          : 'bg-[#0D1527] border-[#1E293B] hover:border-slate-600 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            task.completed
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'border-slate-600 hover:border-indigo-400'
                          }`}
                        >
                          {task.completed && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span
                          className={`text-xs ${
                            task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase font-semibold text-slate-500">
                        {task.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {isInProgress && (
                <div className="mt-4 pt-3 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-indigo-300 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Current Focus: Completing SSE inference gateway &amp; streaming endpoints</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('interventions')}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto shrink-0"
                  >
                    <span>Jump to Intervention</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
