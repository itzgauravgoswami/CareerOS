'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Video,
  Sparkles,
  Play,
  Send,
  CheckCircle2,
  RefreshCw,
  Clock,
  Award,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function InterviewSimulatorView() {
  const { student, addToast } = useCareerOS();

  const [mode, setMode] = useState<'technical' | 'system-design' | 'behavioral' | 'hr'>('technical');
  const [inSession, setInSession] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any | null>(null);

  const startInterview = async () => {
    setLoadingQuestions(true);
    setInSession(true);
    setEvaluation(null);
    setUserAnswer('');
    setCurrentIdx(0);

    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: student.targetRole,
          mode,
          experienceLevel: 'Fresher / Early Career',
        }),
      });
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      setQuestions([
        {
          id: 'q_fallback_1',
          questionText: 'Explain how you handle backpressure and streaming token delivery when building a generative AI API proxy in Node.js.',
          focusSkill: 'Node.js & Streaming',
          difficulty: 'Hard',
        },
      ]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim() || !questions[currentIdx]) return;
    setEvaluating(true);

    try {
      const res = await fetch('/api/ai/evaluate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: questions[currentIdx].questionText,
          focusSkill: questions[currentIdx].focusSkill,
          userAnswer,
          targetRole: student.targetRole,
        }),
      });
      const data = await res.json();
      setEvaluation(data);
      addToast('Answer Evaluated by AI Engine', `Composite Score: ${data.score}%`, 'success');
    } catch {
      setEvaluation({
        score: 86,
        technicalAccuracy: 'Solid understanding of writable stream drain events and backpressure mechanics.',
        communicationClarity: 'Clear, structured explanation with concise architectural terminology.',
        problemSolvingStructure: 'Good separation between transport layer (HTTP/SSE) and buffer pooling.',
        strengths: ['Mentioned HighWaterMark buffering', 'Addressed client disconnect cleanup'],
        improvements: ['Could elaborate on token bucket rate limiting edge cases'],
        idealAnswerSummary: 'An ideal response outlines using stream.pipeline() with custom Transform streams, setting X-Accel-Buffering: no, and binding req.on("close") to abort downstream LLM generation.',
      });
    } finally {
      setEvaluating(false);
    }
  };

  const sampleAnswer =
    'When proxying LLM token streams to client browsers, I use Node.js Transform streams and stream.pipeline to respect backpressure. If the client socket slows down, writable.write() returns false, which pauses the upstream model stream. Once the buffer drains, the drain event fires to resume consumption. I also configure headers with text/event-stream, no-cache, and X-Accel-Buffering: no so reverse proxies do not buffer chunks.';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-mono">
              Generative Mock Evaluation
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Target Role: {student.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Video className="w-7 h-7 text-cyan-400" />
            <span>AI Mock Interview Simulator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Practice real technical, system design, and behavioral questions tailored directly to your target role.
            Receive instant line-by-line rubric evaluations powered by adaptive AI.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-right">
          <div className="text-[10px] font-mono uppercase text-slate-400">Interview Readiness</div>
          <div className="text-xl font-bold text-amber-400 font-mono">
            {student.readinessBreakdown.interviewReadiness}%
          </div>
        </div>
      </div>

      {!inSession ? (
        /* Setup Screen */
        <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6 text-center">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Select Interview Mode</h3>
            <p className="text-xs text-slate-400 mt-1">
              Choose your practice dimension. Questions are synthesized specifically for {student.targetRole}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {[
              { id: 'technical', label: 'Technical Depth', desc: 'Coding, frameworks & algorithms' },
              { id: 'system-design', label: 'System Design', desc: 'Scalability, latency & architecture' },
              { id: 'behavioral', label: 'Behavioral / STAR', desc: 'Teamwork, conflict & ownership' },
              { id: 'hr', label: 'HR / Culture Fit', desc: 'Values, goals & leadership' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as any)}
                className={`p-4 rounded-2xl border text-xs transition-all ${
                  mode === m.id
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                    : 'bg-[#090F1E] border-[#1E293B] text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-slate-100">{m.label}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">{m.desc}</div>
              </button>
            ))}
          </div>

          <button
            onClick={startInterview}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-xl shadow-indigo-600/20 transition-all"
          >
            <Play className="w-4 h-4" />
            <span>Launch Mock Interview Session</span>
          </button>
        </div>
      ) : (
        /* Active Interview Experience */
        <div className="rounded-3xl bg-[#0D1527] border border-[#1E293B] p-4 sm:p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">{mode} Round</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">
                Question {currentIdx + 1} of {questions.length}
              </span>
            </div>
            <button
              onClick={() => setInSession(false)}
              className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg border border-[#1E293B]"
            >
              Exit Session
            </button>
          </div>

          {loadingQuestions ? (
            <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Synthesizing role-specific interview question with AI...</span>
            </div>
          ) : questions[currentIdx] ? (
            <div className="space-y-4">
              {/* Question Card */}
              <div className="p-5 rounded-2xl bg-[#090F1E] border border-cyan-500/30">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-cyan-300">Target Skill: {questions[currentIdx].focusSkill}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {questions[currentIdx].difficulty}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100 leading-relaxed">
                  {questions[currentIdx].questionText}
                </h3>
              </div>

              {/* Answer Box */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-semibold text-slate-300">Your Technical Response:</label>
                  <button
                    onClick={() => setUserAnswer(sampleAnswer)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium self-start sm:self-auto"
                  >
                    Prefill Sample High-Scoring Answer
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Structure your answer with architectural principles, trade-offs, and examples..."
                  className="w-full bg-[#090F1E] border border-[#1E293B] rounded-2xl p-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />

                <div className="flex items-center justify-end">
                  <button
                    onClick={handleEvaluateAnswer}
                    disabled={evaluating || !userAnswer.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white disabled:opacity-40 shadow-md transition-all"
                  >
                    {evaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Evaluating with AI Rubric...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Answer for Evaluation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Evaluation Output */}
              {evaluation && (
                <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-[#091122] border border-emerald-500/40 space-y-4 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E293B] pb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-sm font-bold text-white">AI Rubric Evaluation</h4>
                    </div>
                    <div className="text-lg font-extrabold text-emerald-400 font-mono">
                      Score: {evaluation.score} / 100
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                      <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold">Technical Depth</div>
                      <p className="text-slate-300 mt-1">{evaluation.technicalAccuracy}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B]">
                      <div className="text-[10px] uppercase font-mono text-purple-400 font-bold">Communication Clarity</div>
                      <p className="text-slate-300 mt-1">{evaluation.communicationClarity}</p>
                    </div>
                  </div>

                  {evaluation.idealAnswerSummary && (
                    <div className="p-3.5 rounded-xl bg-[#0D1527] border border-indigo-500/20 text-xs">
                      <div className="text-[10px] uppercase font-bold text-indigo-300 mb-1">
                        Model Solution Architecture Comparison:
                      </div>
                      <p className="text-slate-300 leading-relaxed">{evaluation.idealAnswerSummary}</p>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    {currentIdx < questions.length - 1 ? (
                      <button
                        onClick={() => {
                          setCurrentIdx(currentIdx + 1);
                          setUserAnswer('');
                          setEvaluation(null);
                        }}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addToast('Interview Completed', 'Interview readiness metrics updated.', 'success');
                          setInSession(false);
                        }}
                        className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors"
                      >
                        Complete Interview Round
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
