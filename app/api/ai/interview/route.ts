import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode = 'Technical', targetRole = 'AI Engineer', questionIndex = 1, previousResponses = [] } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      const fallbackQuestions: Record<string, string[]> = {
        Technical: [
          'How would you architect a hybrid retrieval system combining dense vector search (e.g. pgvector) with BM25 lexical search, and how do you handle reciprocal rank fusion (RRF) in production?',
          'Explain how you prevent prompt injection and data exfiltration when building multi-agent LLM systems with access to external tools and database execution.',
          'Suppose your LLM streaming endpoint experiences high p99 latency spikes during concurrent requests. How would you diagnose, cache, and optimize the Node.js / FastAPI inference pipeline?',
        ],
        'System Design': [
          'Design an enterprise semantic document search and Q&A platform serving 50,000 active users with real-time permissions and sub-200ms latency guarantees.',
          'Design a distributed rate-limiter and credit metering gateway for multi-tenant LLM API endpoints.',
        ],
        Behavioral: [
          'Tell me about a time you encountered a significant technical conflict with a teammate or project supervisor regarding architectural direction. How did you arrive at an evidence-based consensus?',
          'Describe a situation where a deployed project or model degraded in performance unexpectedly. What was your systematic triage and root-cause analysis process?',
        ],
        HR: [
          'What specifically attracts you to enterprise AI platform engineering over traditional consumer web application development?',
          'How do you manage your continuous learning strategy to stay ahead of rapidly evolving model architectures and research papers while delivering dependable production code?',
        ],
      };

      const questionsList = fallbackQuestions[mode] || fallbackQuestions['Technical'];
      const question = questionsList[(questionIndex - 1) % questionsList.length];

      return NextResponse.json({
        question,
        mode,
        targetRole,
        questionIndex,
        totalQuestions: 3,
        rubric: ['Technical Precision', 'Architectural Soundness', 'Communication Clarity', 'Failure-Case Awareness'],
        modelUsed: 'fallback',
      });
    }

    const prompt = `You are the CareerOS Enterprise Technical Interviewer.
You are conducting a "${mode}" interview for a candidate targeting the role of "${targetRole}".
Current Question Number: ${questionIndex} of 3.

Generate a realistic, challenging, high-signal interview question appropriate for modern 2026 industry standards.
If there are previous responses, ask a natural follow-up or pivot to test another core competency (e.g., streaming architectures, security/guardrails, latency optimization, or distributed systems).

Return ONLY valid JSON:
{
  "question": "string",
  "mode": "${mode}",
  "targetRole": "${targetRole}",
  "questionIndex": ${questionIndex},
  "totalQuestions": 3,
  "rubric": ["string", "string", "string", "string"]
}`;

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json({ ...parsed, modelUsed: GEMINI_MODEL });
  } catch (error: any) {
    console.error('Error in /api/ai/interview:', error);
    return NextResponse.json(
      {
        question: 'Explain how you design a resilient streaming API for large language model inference with token caching and connection management.',
        mode: 'Technical',
        targetRole: 'AI Engineer',
        questionIndex: 1,
        totalQuestions: 3,
        rubric: ['Technical Depth', 'Streaming Protocol Understanding', 'Error Handling'],
        error: error.message,
      },
      { status: 200 }
    );
  }
}
