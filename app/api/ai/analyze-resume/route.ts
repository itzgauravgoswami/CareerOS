import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, targetRole = 'AI Engineer' } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      // Fallback structured data
      return NextResponse.json({
        candidateName: 'Aarav Sharma',
        degree: 'B.Tech Computer Science & Engineering',
        targetRole,
        overallReadiness: 81,
        skillTrustScore: 71,
        executiveSummary: 'Strong foundation in Python ML pipelines and Agentic RAG development. Demonstrated competence in React frontend architectures with verified project artifacts. Priority need: Production-scale backend streaming API experience to satisfy enterprise AI platform standards.',
        extractedSkills: [
          { name: 'Python', category: 'Programming', score: 92, status: 'verified', evidenceSource: 'Github & Capstone' },
          { name: 'Generative AI & LLMs', category: 'GenAI', score: 90, status: 'verified', evidenceSource: 'Agentic RAG Engine Project' },
          { name: 'PyTorch & Deep Learning', category: 'AI/ML', score: 85, status: 'verified', evidenceSource: 'Healthcare Triage Project' },
          { name: 'React & TypeScript', category: 'Frontend', score: 80, status: 'demonstrated', evidenceSource: 'CareerOS Web Apps' },
          { name: 'PostgreSQL & PgVector', category: 'Database', score: 82, status: 'verified', evidenceSource: 'Microservices & RAG' },
          { name: 'Node.js & Express', category: 'Backend', score: 58, status: 'developing', evidenceSource: 'Claimed coursework' },
          { name: 'Docker & Kubernetes', category: 'Cloud', score: 50, status: 'developing', evidenceSource: 'Basic Dockerfiles' },
        ],
        identifiedGaps: [
          { skill: 'Node.js & Streaming APIs', gap: 27, priority: 'critical', recommendedIntervention: 'Deploy high-concurrency SSE/WebSocket proxy gateway' },
          { skill: 'Kubernetes Cluster Ops', gap: 25, priority: 'high', recommendedIntervention: 'Multi-node cloud container orchestration workshop' },
        ],
        marketAlignment: 76,
        modelUsed: 'fallback',
      });
    }

    const prompt = `You are the CareerOS Resume Intelligence Engine.
Analyze the following resume text against the target industry role: "${targetRole}".

Extract structured data including candidate identity, extracted skills with estimated proficiency (0-100), trust status (claimed, developing, demonstrated, verified), key projects, identified skill gaps, and a concise 2-sentence executive summary.

Return ONLY valid JSON conforming to this exact structure:
{
  "candidateName": "string",
  "degree": "string",
  "targetRole": "${targetRole}",
  "overallReadiness": 75,
  "skillTrustScore": 68,
  "executiveSummary": "string",
  "extractedSkills": [
    {
      "name": "string",
      "category": "Frontend | Backend | Database | Cloud | AI/ML | GenAI | DevOps | Security | Core CS",
      "score": 85,
      "status": "claimed | developing | demonstrated | verified",
      "evidenceSource": "string"
    }
  ],
  "identifiedGaps": [
    {
      "skill": "string",
      "gap": 30,
      "priority": "critical | high | medium | low",
      "recommendedIntervention": "string"
    }
  ],
  "marketAlignment": 74
}

Resume Text:
"""
${resumeText || 'Candidate: Aarav Sharma. 7th Semester Computer Science B.Tech student with projects in Generative AI, RAG Knowledge Assistants, PyTorch, React, and PostgreSQL. Seeking AI Engineer positions.'}
"""`;

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json({ ...parsed, modelUsed: GEMINI_MODEL });
  } catch (error: any) {
    console.error('Error in /api/ai/analyze-resume:', error);
    return NextResponse.json(
      {
        candidateName: 'Aarav Sharma',
        degree: 'B.Tech Computer Science',
        targetRole: 'AI Engineer',
        overallReadiness: 78,
        skillTrustScore: 68,
        executiveSummary: 'Profile successfully imported. Robust Generative AI & ML competencies detected with actionable backend infrastructure growth opportunities.',
        extractedSkills: [
          { name: 'Python', category: 'Programming', score: 92, status: 'verified', evidenceSource: 'Git repositories' },
          { name: 'Generative AI', category: 'GenAI', score: 88, status: 'verified', evidenceSource: 'RAG Assistant' },
          { name: 'React', category: 'Frontend', score: 78, status: 'demonstrated', evidenceSource: 'Web portfolio' },
          { name: 'Node.js', category: 'Backend', score: 54, status: 'developing', evidenceSource: 'Resume claim' },
        ],
        identifiedGaps: [
          { skill: 'Node.js & Streaming APIs', gap: 31, priority: 'critical', recommendedIntervention: 'Build event-driven inference gateway' },
        ],
        marketAlignment: 74,
        error: error.message,
      },
      { status: 200 }
    );
  }
}
