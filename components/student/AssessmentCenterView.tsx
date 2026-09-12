'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  X,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  FileCode2,
} from 'lucide-react';

export default function AssessmentCenterView() {
  const { student, updateSkillScore, addToast } = useCareerOS();

  const [activeTest, setActiveTest] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [scoreResult, setScoreResult] = useState<number | null>(null);

  const tests = [
    {
      id: 'test_node_streaming',
      title: 'Node.js Streaming, Backpressure & Async Systems',
      targetSkill: 'Node.js',
      durationMinutes: 15,
      questionsCount: 3,
      difficulty: 'Advanced',
      passingScore: 75,
      questions: [
        {
          question: 'How do you prevent memory exhaustion when piping a high-volume readable stream into a slow writable stream in Node.js?',
          options: [
            'Use standard .pipe() or pipeline() which handles backpressure automatically by respecting stream drain events.',
            'Increase process.env.NODE_OPTIONS to 8GB of heap memory.',
            'Buffer all incoming chunks in a global Array and setInterval flush.',
            'Set stream.readableHighWaterMark to 0 to bypass memory limits.',
          ],
          correct: 0,
          explanation: 'Node.js pipeline() and .pipe() monitor the return value of writable.write(). When false is returned, readable.pause() is triggered until the drain event fires.',
        },
        {
          question: 'When streaming token outputs from an LLM server to client browsers using Server-Sent Events (SSE), which HTTP header is REQUIRED to prevent intermediary proxy buffering?',
          options: [
            'Content-Type: application/json',
            'X-Accel-Buffering: no with Cache-Control: no-cache',
            'Transfer-Encoding: identity',
            'Access-Control-Max-Age: 86400',
          ],
          correct: 1,
          explanation: 'Nginx and cloud load balancers will buffer small SSE chunks unless X-Accel-Buffering: no is set along with Cache-Control: no-cache and Content-Type: text/event-stream.',
        },
        {
          question: 'In Node.js Event Loop architecture, which phase processes Promise microtasks?',
          options: [
            'Only inside the Check (setImmediate) phase.',
            'Immediately after the current operation finishes, before transitioning to the next phase of the event loop.',
            'Inside the Poll phase after I/O callbacks are drained.',
            'At the start of the next process tick in Timers.',
          ],
          correct: 1,
          explanation: 'The microtask queue (Promises, queueMicrotask) drains immediately after any synchronous callback completes, before the event loop advances to the next phase.',
        },
      ],
    },
    {
      id: 'test_rag_vectors',
      title: 'Vector Databases, HNSW Indexing & RAG Retrieval',
      targetSkill: 'Vector Databases',
      durationMinutes: 20,
      questionsCount: 3,
      difficulty: 'Advanced',
      passingScore: 80,
      questions: [
        {
          question: 'In HNSW (Hierarchical Navigable Small World) vector indexing, what is the primary purpose of the multi-layer skip-list hierarchy?',
          options: [
            'To compress high-dimensional float32 vectors to 1-bit binary representations.',
            'To enable logarithmic search time O(log N) by traversing coarse clusters at top layers before descending to fine-grained nodes.',
            'To encrypt embeddings for zero-knowledge cloud compliance.',
            'To sort embeddings chronologically by insertion timestamp.',
          ],
          correct: 1,
          explanation: 'Similar to skip lists, HNSW navigates upper sparse layers to quickly jump near the target vector before descending to denser layers for exact nearest-neighbor refinement.',
        },
        {
          question: 'When evaluating RAG hallucination, what metric measures whether the generated answer is directly attributable to the retrieved context?',
          options: [
            'BM25 Recall@K',
            'Faithfulness / Groundedness Metric',
            'Cosine Angle Similarity',
            'Perplexity Loss',
          ],
          correct: 1,
          explanation: 'Faithfulness verifies that every claim made in the generated synthesis can be traced back directly to facts present in the retrieved reference context.',
        },
        {
          question: 'Why is hybrid search (combining dense embeddings with sparse BM25) preferred in production enterprise retrieval?',
          options: [
            'Dense embeddings capture semantic nuance while BM25 handles exact keyword matches (e.g. part numbers, error codes) where embeddings often fail.',
            'Hybrid search completely eliminates the need for vector indexes.',
            'BM25 consumes zero CPU cycles during query time.',
            'Dense embeddings are only compatible with English text.',
          ],
          correct: 0,
          explanation: 'Hybrid retrieval with Reciprocal Rank Fusion (RRF) combines semantic conceptual understanding with lexical precision for rare terms and IDs.',
        },
      ],
    },
  ];

  const handleStartTest = (test: any) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTestCompleted(false);
    setScoreResult(null);
  };

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;
    let correctCount = 0;
    activeTest.questions.forEach((q: any, idx: number) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / activeTest.questions.length) * 100);
    setScoreResult(calculatedScore);
    setTestCompleted(true);

    if (calculatedScore >= activeTest.passingScore) {
      updateSkillScore(activeTest.targetSkill, Math.max(82, calculatedScore), 'verified');
      addToast(
        'Assessment Passed!',
        `Scored ${calculatedScore}%. ${activeTest.targetSkill} is now officially Verified (+5% Trust)!`,
        'success'
      );
    } else {
      addToast('Assessment Submitted', `Scored ${calculatedScore}%. Passing grade is ${activeTest.passingScore}%.`, 'warning');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 font-mono">
              Cryptographic Assessment Center
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Target Role: {student.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Award className="w-7 h-7 text-purple-400" />
            <span>Benchmark Assessments &amp; Certification</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Pass standardized architectural evaluations to upgrade skills from &ldquo;Developing&rdquo; to
            &ldquo;Verified&rdquo;. Verified skills permanently anchor to your public Skill Passport.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-right">
          <div className="text-[10px] font-mono uppercase text-slate-400">Verified Credentials</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            {student.skills.filter((s) => s.status === 'verified').length} Verified
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tests.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] hover:border-indigo-500/40 shadow-lg flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Skill: {t.targetSkill}</span>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {t.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{t.title}</h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {t.durationMinutes} Mins
                </span>
                <span>•</span>
                <span>{t.questionsCount} Architectural Questions</span>
                <span>•</span>
                <span>Pass: {t.passingScore}%</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1E293B] flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Earn Verified Status
              </span>
              <button
                onClick={() => handleStartTest(t)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Begin Assessment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Interactive Assessment Modal */}
      {activeTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0D1527] border border-cyan-500/40 shadow-2xl p-4 sm:p-6 text-white flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Standardized Benchmark</span>
                <h3 className="text-base font-bold text-white">{activeTest.title}</h3>
              </div>
              <button
                onClick={() => setActiveTest(null)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Body */}
            {!testCompleted ? (
              <div className="flex-1 overflow-y-auto py-5 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Question {currentQuestionIndex + 1} of {activeTest.questions.length}</span>
                  <span>Target: {activeTest.targetSkill}</span>
                </div>

                {/* Question Prompt */}
                <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B]">
                  <p className="text-sm text-slate-100 font-semibold leading-relaxed">
                    {activeTest.questions[currentQuestionIndex].question}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {activeTest.questions[currentQuestionIndex].options.map((opt: string, optIdx: number) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectAnswer(currentQuestionIndex, optIdx)}
                        className={`p-3.5 rounded-2xl border cursor-pointer text-xs transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                            : 'bg-[#090F1E] border-[#1E293B] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 border mt-0.5 ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-400 text-white'
                              : 'border-slate-600 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="leading-relaxed">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Question Nav */}
                <div className="flex items-center justify-between pt-3 border-t border-[#1E293B]">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    ← Previous
                  </button>

                  {currentQuestionIndex < activeTest.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitTest}
                      disabled={Object.keys(selectedAnswers).length < activeTest.questions.length}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 shadow-md"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Test Evaluation Results */
              <div className="py-6 space-y-5 text-center">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Assessment Score</div>
                  <div className="text-4xl font-extrabold text-emerald-400 font-mono mt-1">
                    {scoreResult}%
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Passing Threshold: {activeTest.passingScore}%. Status:{' '}
                    <strong className="text-emerald-400">
                      {scoreResult! >= activeTest.passingScore ? 'PASSED (Skill Verified)' : 'Needs Revision'}
                    </strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-left text-xs space-y-2">
                  <div className="font-semibold text-slate-200">Cryptographic Outcome:</div>
                  <p className="text-slate-400 leading-relaxed">
                    {activeTest.targetSkill} proficiency recorded at {scoreResult}%. Skill Passport verified stamp
                    issued.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTest(null)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
                >
                  Return to Assessment Center
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
