'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Dna,
  Zap,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionSuggestions?: { label: string; tab: string }[];
}

export default function CopilotDrawer() {
  const msgSeqRef = useRef(100);
  const {
    copilotOpen,
    setCopilotOpen,
    student,
    skillGaps,
    setActiveTab,
  } = useCareerOS();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: `Good day, **${student.name}**. I have loaded your Career DNA.

Your target role is **${student.targetRole}** with an overall readiness of **${student.careerReadiness}%** and an internal Skill Trust score of **${student.skillTrust}%**.

Your biggest current blocker is **Node.js & Streaming Backend APIs** (Current 54% vs 85% required by 88% of target postings). Would you like me to guide you through closing this gap or simulate an alternate role trajectory?`,
      actionSuggestions: [
        { label: 'Analyze Priority Gap', tab: 'skill-gaps' },
        { label: 'Start Streaming Project', tab: 'interventions' },
        { label: 'Simulate Career Path', tab: 'career-twin' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!copilotOpen) return null;

  const handleSend = async (userPrompt?: string) => {
    const textToSend = userPrompt || input;
    if (!textToSend.trim() || loading) return;

    msgSeqRef.current += 1;
    const userMessage: ChatMessage = {
      id: `usr_${msgSeqRef.current}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            name: student.name,
            targetRole: student.targetRole,
            careerReadiness: student.careerReadiness,
            industryAlignment: student.industryAlignment,
            skillTrust: student.skillTrust,
            priorityGapsCount: student.priorityGapsCount,
            criticalGaps: skillGaps.map((g) => `${g.skillName} (${g.currentLevel}%)`).join(', '),
            verifiedSkills: student.skills
              .filter((s) => s.status === 'verified')
              .map((s) => `${s.name} (${s.currentScore}%)`)
              .join(', '),
          },
        }),
      });

      const data = await res.json();
      msgSeqRef.current += 1;
      const aiReply: ChatMessage = {
        id: `ai_${msgSeqRef.current}`,
        sender: 'ai',
        text: data.reply,
        actionSuggestions: data.actionSuggestions,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch {
      msgSeqRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_err_${msgSeqRef.current}`,
          sender: 'ai',
          text: 'CareerOS Copilot encountered a connection issue. Your saved Career DNA and verified data remain intact.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What is my single biggest blocker for AI Engineer roles?',
    'What happens if I learn React and Node.js?',
    'Prepare me for a technical interview on Vector Databases',
    'Recommend high-impact projects to raise my Skill Trust',
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setCopilotOpen(false)}
        aria-label="Close Copilot Backdrop"
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] max-w-[100vw] bg-black/95 border-l border-blue-900/40 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col text-white animate-in slide-in-from-right duration-300 backdrop-blur-md">
        {/* Header */}
      <div className="p-4 border-b border-blue-900/40 bg-black/90 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-600/30">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">AI Career Copilot</h3>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30 font-mono">
                Autonomous Core
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Context-Aware Career Operating System Advisor</p>
          </div>
        </div>
        <button
          onClick={() => setCopilotOpen(false)}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Close Copilot"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Live Context Banner */}
      <div className="px-4 py-2.5 bg-blue-950/25 border-b border-blue-900/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Target:</span>
          <span className="font-semibold text-white">{student.targetRole}</span>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <span className="text-slate-400 text-[11px]">Readiness: </span>
            <span className="font-bold text-blue-400">{student.careerReadiness}%</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Trust: </span>
            <span className="font-bold text-cyan-400">{student.skillTrust}%</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/60">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';
          return (
            <div key={m.id} className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                {isAi ? (
                  <>
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-300 font-medium">CareerOS Intelligence</span>
                  </>
                ) : (
                  <span>You</span>
                )}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[92%] whitespace-pre-wrap ${
                  isAi
                    ? 'bg-[#060b18] border border-blue-900/50 text-white shadow-md'
                    : 'bg-blue-600 text-white rounded-br-sm shadow-md shadow-blue-600/30'
                }`}
              >
                {m.text}
              </div>

              {/* Action suggestions rendered as quick buttons */}
              {m.actionSuggestions && m.actionSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[92%]">
                  {m.actionSuggestions.map((act) => (
                    <button
                      key={act.label}
                      onClick={() => {
                        setActiveTab(act.tab);
                        setCopilotOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 text-blue-200 hover:text-white transition-colors"
                    >
                      <span>{act.label}</span>
                      <ArrowRight className="w-3 h-3 text-blue-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-300 w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
            <span>Analyzing Career DNA with AI...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="p-3 border-t border-blue-900/40 bg-black/80">
        <div className="text-[10px] text-blue-400 uppercase font-semibold mb-2 flex items-center gap-1">
          <Zap className="w-3 h-3 text-blue-400" /> Contextual Prompts
        </div>
        <div className="flex flex-col gap-1.5">
          {quickPrompts.slice(0, 2).map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-left text-[11px] text-slate-300 hover:text-white p-1.5 rounded bg-black/60 hover:bg-blue-950/40 border border-blue-900/40 hover:border-blue-500/40 truncate transition-colors"
            >
              &ldquo;{q}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-blue-900/40 bg-black flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask Copilot about skills, roadmaps, or jobs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className="flex-1 bg-black/80 border border-blue-900/50 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white shadow-md shadow-blue-600/30 transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
    </>
  );
}
