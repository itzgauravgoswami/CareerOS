import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeSnippet, jobDescription, targetRole = 'AI Engineer' } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      return NextResponse.json({
        matchPercentage: 88,
        matchSummary: 'Strong alignment with core ML and Generative AI requirements. Highlighting your Agentic RAG capstone project and framing your microservices background will significantly enhance ATS keyword density.',
        missingKeywords: ['Kubernetes Helm Charts', 'OpenTelemetry Tracing', 'Async Task Queues', 'SLA Latency Benchmarks'],
        resumeImprovements: [
          'Quantify retrieval accuracy in project description: "Engineered hybrid vector search using PgVector & LLMs, achieving 94% retrieval accuracy and <180ms p95 latency."',
          'Highlight distributed database connection pooling and schema migrations under the PostgreSQL experience section.',
          'Add a dedicated "Verifiable Evidence" link to the live demo and GitHub repository with CI/CD passing badges.',
        ],
        roleSpecificSummary: 'AI Systems Engineer with demonstrated experience architecting multi-agent RAG pipelines, optimizing vector databases, and building full-stack reactive interfaces. Proven track record in ground truth evaluation, prompt optimization, and production-grade software delivery.',
        coverLetterSnippet: 'Dear Hiring Team at NovaTech Labs,\n\nI am writing to express my strong enthusiasm for the Junior AI Platform Engineer role. Having engineered an autonomous multi-agent knowledge engine powered by advanced LLMs and PostgreSQL vector indexes, I specialize in bridging machine learning models with reliable backend architectures.\n\nMy verified work directly matches your team\'s focus on high-throughput inference pipelines, context window optimization, and observable service design. I look forward to contributing to NovaTech\'s mission.\n\nSincerely,\nAarav Sharma',
        applicationStrategy: '1. Emphasize ground truth citations and hallucination prevention in your initial technical screen.\n2. Prepare to walk through your hybrid lexical + dense vector search architecture diagram.\n3. Be transparent that you are currently containerizing the pipeline with Kubernetes.',
        modelUsed: 'fallback',
      });
    }

    const prompt = `You are the CareerOS Application Optimizer.
Analyze the candidate's resume against the provided Job Description.

Target Role: "${targetRole}"

Resume Context:
"""
${resumeSnippet || 'Aarav Sharma. B.Tech Computer Science student with projects in Generative AI, Agentic RAG, React, and PostgreSQL.'}
"""

Job Description:
"""
${jobDescription || 'Junior AI Platform Engineer at NovaTech Labs. Requirements: Python, Generative AI, Vector DBs, Node.js or Go, Docker, Kubernetes, CI/CD.'}
"""

Generate an actionable, high-precision optimization report:
1. Realistic Match Percentage (0-100).
2. Match Summary (2 sentences).
3. 3-4 Missing Keywords / ATS terms.
4. 3 specific bullet-point Resume Improvements (bullet points with concrete metric phrasing).
5. Role-Specific 3-sentence Summary for the top of the resume.
6. Tailored professional Cover Letter snippet.
7. 3-step Application Strategy.
(Never promise or guarantee hiring outcomes).

Return ONLY valid JSON:
{
  "matchPercentage": 88,
  "matchSummary": "string",
  "missingKeywords": ["string"],
  "resumeImprovements": ["string"],
  "roleSpecificSummary": "string",
  "coverLetterSnippet": "string",
  "applicationStrategy": "string"
}`;

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json({ ...parsed, modelUsed: GEMINI_MODEL });
  } catch (error: any) {
    console.error('Error in /api/ai/application-optimizer:', error);
    return NextResponse.json(
      {
        matchPercentage: 85,
        matchSummary: 'Good technical overlap with room to highlight production infrastructure credentials.',
        missingKeywords: ['Container Orchestration', 'Telemetry', 'Observability'],
        resumeImprovements: ['Add quantifiable performance metrics to capstone projects.'],
        roleSpecificSummary: 'Proactive AI Engineer specializing in LLM systems, full stack integration, and scalable data architectures.',
        coverLetterSnippet: 'I am thrilled to submit my application for this role, bringing verified hands-on experience in Generative AI and production system architecture.',
        applicationStrategy: 'Highlight verified project artifacts and code repositories.',
        error: error.message,
      },
      { status: 200 }
    );
  }
}
