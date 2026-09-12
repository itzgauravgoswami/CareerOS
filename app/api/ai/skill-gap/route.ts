import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skillName, currentLevel, requiredLevel, targetRole } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      return NextResponse.json({
        skillName: skillName || 'Node.js & Async Runtimes',
        gap: Math.max(0, (requiredLevel || 85) - (currentLevel || 54)),
        priority: 'critical',
        industryDemandExplanation: `In 2026 enterprise AI architectures, over 88% of target ${targetRole || 'AI Engineer'} positions require high-concurrency Node.js or Go middleware to manage streaming token responses (SSE), WebSocket lifecycles, and resilient client-side state synchronization.`,
        evidenceMissingExplanation: 'Current profile only lists self-reported coursework. Hiring managers look for verifiable GitHub repositories with automated test suites, connection pooling, and live deployed APIs.',
        recommendedIntervention: 'Construct a resilient streaming middleware gateway that proxies requests to LLM inference endpoints with token-bucket rate limiting and structured logging.',
        estimatedWeeks: 3,
        careerImpactScore: 92,
        transferabilityScore: 88,
        modelUsed: 'fallback',
      });
    }

    const prompt = `You are the CareerOS Skill Gap & Market Intelligence Engine.
Analyze the following skill gap for a student targeting the role of "${targetRole || 'AI Engineer'}":

Skill: "${skillName}"
Student's Current Score: ${currentLevel || 50}/100
Required Role Benchmark: ${requiredLevel || 85}/100

Explain:
1. Why this is a priority gap based on concrete industry hiring data and technical requirements.
2. What evidence is missing to establish verifiable Skill Trust.
3. The recommended intervention (project, lab, or assessment) to close this gap.
4. Estimated weeks of focused effort.
5. Impact scores (0-100) for Career Impact and Transferability.

Return ONLY valid JSON matching this schema:
{
  "skillName": "${skillName}",
  "gap": ${Math.max(0, (requiredLevel || 85) - (currentLevel || 50))},
  "priority": "critical | high | medium | low",
  "industryDemandExplanation": "string",
  "evidenceMissingExplanation": "string",
  "recommendedIntervention": "string",
  "estimatedWeeks": 3,
  "careerImpactScore": 90,
  "transferabilityScore": 85
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
    console.error('Error in /api/ai/skill-gap:', error);
    return NextResponse.json(
      {
        skillName: 'Skill Gap',
        gap: 25,
        priority: 'high',
        industryDemandExplanation: 'High demand across modern cloud and engineering teams.',
        evidenceMissingExplanation: 'Needs verified project artifact or standardized assessment.',
        recommendedIntervention: 'Build hands-on production project and submit for verification.',
        estimatedWeeks: 3,
        careerImpactScore: 85,
        transferabilityScore: 80,
        error: error.message,
      },
      { status: 200 }
    );
  }
}
