import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenarioQuery, currentRole = 'Undergraduate CS', targetRole = 'AI Engineer', currentReadiness = 78 } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      return NextResponse.json({
        scenario: scenarioQuery,
        projectedReadiness: Math.min(96, (currentReadiness || 78) + 12),
        readinessDelta: +12,
        estimatedEffortWeeks: 5,
        newOpportunitiesUnlocked: 8,
        marketImpact: 'High',
        analysis: `Simulating: "${scenarioQuery}". Closing your Node.js and Kubernetes gaps directly satisfies the missing requirements for NovaTech's AI Platform Engineer role and lifts overall candidate percentile from 78th to 90th across national applicant cohorts.`,
        keySkillChanges: [
          { skill: 'Node.js Streaming APIs', before: 54, after: 85, delta: +31 },
          { skill: 'Kubernetes Container Ops', before: 48, after: 75, delta: +27 },
          { skill: 'Overall Trust Score', before: 68, after: 80, delta: +12 },
        ],
        risksAndTradeoffs: [
          'Requires 12-15 hours/week of practical container orchestration and cloud lab practice.',
          'Must balance with ongoing 7th semester academic coursework.',
        ],
        recommendedNextStep: 'Start the SSE Streaming Gateway project intervention in CareerOS Project Studio.',
        modelUsed: 'fallback',
      });
    }

    const prompt = `You are the CareerOS Scenario Simulation Engine.
The student is currently at:
- Target Role: "${targetRole}"
- Current Readiness: ${currentReadiness}%
- User's hypothetical question: "${scenarioQuery}"

Simulate the technical, employability, and market implications:
1. Projected new readiness score (0-100) and delta.
2. Estimated weeks of focused effort.
3. Number of new high-match job/internship opportunities unlocked.
4. Comprehensive 2-3 sentence market analysis.
5. 2-3 specific skill score changes (before vs after).
6. Risks or tradeoffs.
7. Immediate recommended next step.

Return ONLY valid JSON matching this schema:
{
  "scenario": "${scenarioQuery}",
  "projectedReadiness": 90,
  "readinessDelta": 12,
  "estimatedEffortWeeks": 5,
  "newOpportunitiesUnlocked": 8,
  "marketImpact": "Very High | High | Medium",
  "analysis": "string",
  "keySkillChanges": [
    { "skill": "string", "before": 50, "after": 80, "delta": 30 }
  ],
  "risksAndTradeoffs": ["string"],
  "recommendedNextStep": "string"
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
    console.error('Error in /api/ai/career-scenario:', error);
    return NextResponse.json(
      {
        scenario: 'Career Simulation',
        projectedReadiness: 88,
        readinessDelta: 10,
        estimatedEffortWeeks: 4,
        newOpportunitiesUnlocked: 6,
        marketImpact: 'High',
        analysis: 'Significant positive impact on role readiness and matched opportunities.',
        keySkillChanges: [{ skill: 'Target Capability', before: 50, after: 82, delta: 32 }],
        risksAndTradeoffs: ['Requires sustained hands-on implementation time.'],
        recommendedNextStep: 'Begin priority project intervention.',
        error: error.message,
      },
      { status: 200 }
    );
  }
}
