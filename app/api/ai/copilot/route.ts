import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, context } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      // Intelligent fallback when API key is not yet set in environment
      return NextResponse.json({
        reply: `Based on your Career DNA for **${context?.targetRole || 'AI Engineer'}** (Current Readiness: **${context?.careerReadiness || 78}%**), your single biggest priority is closing your **Node.js & Streaming Backend** gap (Current: 54% vs Required: 85%). Industry demand shows 88% of AI platforms require production-grade inference streaming APIs.

I recommend:
1. Starting your **Streaming SSE Gateway** intervention in the Project Studio.
2. Completing the **Distributed Node.js Assessment** once built to raise your verified trust score from 68% to 74%.
3. Applying to the **Aether Labs Research Internship** where you already have a 95% semantic match.`,
        actionSuggestions: [
          { label: 'View Node.js Gap Details', tab: 'skill-gaps' },
          { label: 'Start Streaming Project', tab: 'interventions' },
          { label: 'Simulate Career Switch', tab: 'career-twin' },
        ],
        modelUsed: 'fallback',
      });
    }

    const systemInstruction = `You are CareerOS Copilot, an enterprise-grade AI Career Intelligence Agent.
You are embedded inside CareerOS, an AI-powered Academia-Industry Skill Intelligence Network that connects Students, Academicians, Institutions, and Industry.
Core philosophy: "From Curriculum to Capability. From Capability to Opportunity."
"Measure → Map → Build → Verify → Connect → Improve."

The current student context is:
- Name: ${context?.name || 'Aarav Sharma'}
- Target Role: ${context?.targetRole || 'AI Engineer'}
- Career Readiness: ${context?.careerReadiness || 78}%
- Industry Alignment: ${context?.industryAlignment || 74}%
- Skill Trust Score: ${context?.skillTrust || 68}% (CareerOS Internal Metric)
- Priority Gaps: ${context?.priorityGapsCount || 4}
- Key Verified Skills: ${context?.verifiedSkills || 'Python (92%), GenAI (88%), PyTorch (84%), SQL (80%), React (78%)'}
- Critical Skill Gaps: ${context?.criticalGaps || 'Node.js & Async (54%), Kubernetes & Cloud (48%), Distributed System Design (52%)'}

Guidelines for responses:
1. Speak in a confident, highly competent, professional enterprise advisor voice.
2. Never give vague or generic platitudes like "work hard" or "practice makes perfect". Cite concrete metrics, technical skills, and actionable next steps.
3. Be structured and concise: Insight → Root Cause/Industry Context → Actionable Recommendations.
4. Format with markdown bolding, lists, and clear hierarchy.
5. Suggest 2-3 specific CareerOS navigation actions (e.g. tabs: 'skill-gaps', 'roadmap', 'interventions', 'assessments', 'interview', 'opportunities', 'career-twin', 'curriculum').`;

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'CareerOS Copilot processed your request successfully.';

    return NextResponse.json({
      reply: replyText,
      actionSuggestions: [
        { label: 'Analyze Skill Gaps', tab: 'skill-gaps' },
        { label: 'View Roadmap', tab: 'roadmap' },
        { label: 'Take Assessment', tab: 'assessments' },
      ],
      modelUsed: GEMINI_MODEL,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/copilot:', error);
    return NextResponse.json(
      {
        reply: 'CareerOS Copilot encountered a temporary processing delay. Your Career DNA and verified credentials remain securely loaded. You can continue accessing all modules from the sidebar.',
        error: error.message,
        actionSuggestions: [{ label: 'Open Skill Gaps', tab: 'skill-gaps' }],
      },
      { status: 200 }
    );
  }
}
