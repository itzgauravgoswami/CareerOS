'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Briefcase,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Clock,
  Layers,
  Flame,
} from 'lucide-react';

export default function CareerTwinView() {
  const { student, skillGaps, setActiveTab } = useCareerOS();

  const [selectedRole, setSelectedRole] = useState(student.targetRole);
  const [customScenario, setCustomScenario] = useState('');
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const predefinedScenarios = [
    'What happens if I master production Node.js & Streaming APIs?',
    'What if I switch from AI Engineer to Full Stack ML Developer?',
    'What happens if I complete the Kubernetes Cluster deployment lab?',
    'Which single skill gives me the highest ROI in 4 weeks?',
  ];

  const handleRunSimulation = async (queryText?: string) => {
    const query = queryText || customScenario;
    if (!query.trim()) return;

    setSimulating(true);
    try {
      const res = await fetch('/api/ai/career-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioQuery: query,
          targetRole: selectedRole,
          currentReadiness: student.careerReadiness,
        }),
      });
      const data = await res.json();
      setSimulationResult(data);
    } catch {
      setSimulationResult({
        scenario: query,
        projectedReadiness: Math.min(95, student.careerReadiness + 12),
        readinessDelta: +12,
        estimatedEffortWeeks: 4,
        newOpportunitiesUnlocked: 7,
        marketImpact: 'High',
        analysis: 'Accelerates qualification for production AI infrastructure engineering roles.',
        keySkillChanges: [
          { skill: 'Target Capability', before: 54, after: 85, delta: +31 },
          { skill: 'Overall Trust Score', before: student.skillTrust, after: student.skillTrust + 8, delta: +8 },
        ],
        risksAndTradeoffs: ['Requires sustained hands-on coding dedication.'],
        recommendedNextStep: 'Start priority intervention in the Project Studio.',
      });
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 font-mono">
              Dynamic Simulation & Twin Engine
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Career Vector Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Cpu className="w-7 h-7 text-purple-400" />
            <span>Career Digital Twin</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            A real-time predictive model of your capabilities projected against target industry roles. Simulate career
            pivots, calculate learning effort, and anticipate market value before writing a single line of code.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Target Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-[#090F1E] border border-[#1E293B] text-xs font-semibold text-slate-100 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="AI Engineer">AI Engineer</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Full Stack ML Developer">Full Stack ML Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Backend Infrastructure Engineer">Backend Infrastructure Engineer</option>
          </select>
        </div>
      </div>

      {/* Digital Twin State Transition Ribbon: Current -> Gap -> Target */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#090F1E] via-[#0E172A] to-[#090F1E] border border-[#1E293B] shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Transformation Vector: Current State → Target State</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Current State */}
          <div className="p-5 rounded-2xl bg-[#090F1E] border border-[#1E293B] relative">
            <div className="text-[10px] font-mono uppercase text-slate-400">Current Vector</div>
            <div className="text-lg font-bold text-white mt-1">Aarav Sharma</div>
            <div className="text-xs text-slate-400 mt-0.5">B.Tech CS (7th Semester)</div>
            <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Readiness:</span>
                <span className="font-bold text-emerald-400 font-mono">{student.careerReadiness}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Skill Trust:</span>
                <span className="font-bold text-cyan-400 font-mono">{student.skillTrust}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Key Strength:</span>
                <span className="text-slate-200">Python & GenAI (90%)</span>
              </div>
            </div>
          </div>

          {/* Gap & Transformation Path */}
          <div className="p-5 rounded-2xl bg-[#0E172A] border border-amber-500/30 flex flex-col justify-between relative">
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Transformation Delta</div>
              <div className="text-lg font-bold text-slate-100 mt-1">4 Priority Skill Gaps</div>
              <div className="text-xs text-slate-400 mt-0.5">Estimated effort: 6-8 weeks sprint</div>
              <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-red-300">
                  <span>• Node.js & Streaming APIs (-31%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <span>• Kubernetes Cluster Ops (-27%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <span>• Distributed System Design (-28%)</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setActiveTab('roadmap')}
                className="w-full py-2 rounded-xl text-xs font-semibold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-center transition-colors"
              >
                View Transformation Roadmap →
              </button>
            </div>
          </div>

          {/* Target Role Requirement */}
          <div className="p-5 rounded-2xl bg-[#090F1E] border border-indigo-500/30 relative">
            <div className="text-[10px] font-mono uppercase text-indigo-400 font-bold">Target State</div>
            <div className="text-lg font-bold text-white mt-1">{selectedRole}</div>
            <div className="text-xs text-slate-400 mt-0.5">Tier-1 Enterprise Benchmark</div>
            <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Required Benchmark:</span>
                <span className="font-bold text-indigo-300 font-mono">85% Readiness</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hiring Probability:</span>
                <span className="font-bold text-emerald-400">High (&gt;90th percentile)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Market Roles:</span>
                <span className="text-slate-200 font-mono">42 Open Roles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Scenario Simulator Section */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">AI Career Scenario Simulator</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Test hypothetical learning paths and see how AI simulations project your readiness delta, effort, and unlocked
            opportunities.
          </p>
        </div>

        {/* Predefined Quick Scenarios */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Preset Simulations
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {predefinedScenarios.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setCustomScenario(q);
                  handleRunSimulation(q);
                }}
                className="p-3 rounded-xl bg-[#090F1E] hover:bg-[#131E35] border border-[#1E293B] hover:border-indigo-500/40 text-left text-xs text-slate-200 flex items-center justify-between transition-all group gap-2"
              >
                <span className="leading-snug">&ldquo;{q}&rdquo;</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Scenario Prompt Input */}
        <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Ask anything: e.g. What if I learn Rust and WebAssembly for AI inference?"
            value={customScenario}
            onChange={(e) => setCustomScenario(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunSimulation();
            }}
            className="w-full bg-[#0D1527] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleRunSimulation()}
            disabled={simulating || !customScenario.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-40 shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
          >
            {simulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Simulate Scenario</span>
              </>
            )}
          </button>
        </div>

        {/* Simulation Output Card */}
        {simulationResult && (
          <div className="p-6 rounded-2xl bg-[#091122] border border-cyan-500/40 space-y-5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Simulated Projection</span>
                <h4 className="text-base font-bold text-white mt-0.5">&ldquo;{simulationResult.scenario}&rdquo;</h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                  {student.careerReadiness}% → {simulationResult.projectedReadiness}% (+{simulationResult.readinessDelta}%)
                </div>
              </div>
            </div>

            {/* Metrics Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Effort Required</div>
                <div className="text-base font-bold text-white mt-0.5">
                  ~{simulationResult.estimatedEffortWeeks} Weeks
                </div>
                <div className="text-[11px] text-slate-400">12-15 hours/week focused sprint</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                <div className="text-slate-400 text-[10px] uppercase font-mono">New Opportunities</div>
                <div className="text-base font-bold text-cyan-400 mt-0.5">
                  +{simulationResult.newOpportunitiesUnlocked} Enterprise Roles
                </div>
                <div className="text-[11px] text-slate-400">Satisfies minimum criteria</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Market Impact</div>
                <div className="text-base font-bold text-purple-400 mt-0.5">
                  {simulationResult.marketImpact} Value
                </div>
                <div className="text-[11px] text-slate-400">Lifts candidate to 90th percentile</div>
              </div>
            </div>

            {/* AI Analysis Narrative */}
            <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E293B]">
              <div className="text-xs font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Market Dynamics & Skill Transferability</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{simulationResult.analysis}</p>
            </div>

            {/* Skill Score Changes Table */}
            {simulationResult.keySkillChanges && (
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2">Projected Skill DNA Trajectory:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {simulationResult.keySkillChanges.map((sk: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#0D1527] border border-[#1E293B] flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-200">{sk.skill}</span>
                      <div className="font-mono text-right">
                        <span className="text-slate-400">{sk.before}%</span>
                        <span className="text-slate-600 mx-1.5">→</span>
                        <span className="font-bold text-emerald-400">{sk.after}%</span>
                        <span className="text-emerald-400 text-[10px] ml-1.5 font-bold">({sk.delta > 0 ? `+${sk.delta}` : sk.delta}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risks & Recommended Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#1E293B] text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px]">{simulationResult.risksAndTradeoffs?.[0]}</span>
              </div>
              <button
                onClick={() => setActiveTab('interventions')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all shrink-0"
              >
                Execute Recommended Action →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
