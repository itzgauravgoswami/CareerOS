import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      candidateName = 'Aarav Sharma',
      companyName = 'NovaTech Labs',
      role = 'AI Engineering Intern',
      technicalRating = 4.8,
      communicationRating = 4.5,
      problemSolvingRating = 4.7,
      specificFeedback = 'Aarav displayed outstanding technical rigor during the 8-week telemetry intelligence practicum. He took proactive ownership of the streaming data pipeline and demonstrated exemplary problem-solving when handling schema drift.',
      skillsDemonstrated = ['Python', 'Generative AI', 'PostgreSQL', 'System Architecture'],
    } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      return NextResponse.json({
        candidateName,
        companyName,
        verifiedTrustBoost: 5,
        newOverallReadiness: 83,
        industryEndorsementSummary: `Industry supervisor at ${companyName} submitted a 4.7/5 composite evaluation for ${candidateName} in the ${role} position. Highlights include exceptional ownership of streaming pipelines, rapid debugging of schema drifts, and clean modular code.`,
        careerDnaEvent: {
          year: '2026',
          title: `Industry Practicum Endorsement (${companyName})`,
          category: 'Feedback',
          description: `Supervised by Engineering Lead. Rated 4.7/5 across technical depth, system resilience, and cross-functional communication.`,
          badge: 'Industry Verified Credential',
          verified: true,
        },
        skillImpacts: [
          { skill: 'Python', trustDelta: +5, newStatus: 'verified' },
          { skill: 'Generative AI', trustDelta: +4, newStatus: 'verified' },
          { skill: 'System Architecture', trustDelta: +6, newStatus: 'demonstrated' },
        ],
        modelUsed: 'fallback',
      });
    }

    const prompt = `You are the CareerOS Industry Intelligence Verifier.
An industry partner has submitted professional performance feedback for a student.

Candidate: "${candidateName}"
Company: "${companyName}"
Role: "${role}"
Ratings: Technical: ${technicalRating}/5, Communication: ${communicationRating}/5, Problem Solving: ${problemSolvingRating}/5
Supervisor Feedback:
"""
${specificFeedback}
"""
Skills Demonstrated: ${skillsDemonstrated.join(', ')}

Analyze this industry feedback and return:
1. Recommended CareerOS Skill Trust boost percentage (between 3% and 7%).
2. Synthesized 2-sentence Industry Endorsement Summary.
3. Structured Career DNA timeline event item to add to the student's verified profile.
4. Specific skill trust score impacts for each demonstrated skill.

Return ONLY valid JSON:
{
  "candidateName": "${candidateName}",
  "companyName": "${companyName}",
  "verifiedTrustBoost": 5,
  "newOverallReadiness": 83,
  "industryEndorsementSummary": "string",
  "careerDnaEvent": {
    "year": "2026",
    "title": "string",
    "category": "Feedback",
    "description": "string",
    "badge": "string",
    "verified": true
  },
  "skillImpacts": [
    { "skill": "string", "trustDelta": 5, "newStatus": "verified" }
  ]
}`;

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
    console.error('Error in /api/ai/industry-feedback:', error);
    return NextResponse.json(
      {
        candidateName: 'Aarav Sharma',
        companyName: 'NovaTech Labs',
        verifiedTrustBoost: 4,
        newOverallReadiness: 82,
        industryEndorsementSummary: 'Positive industry evaluation recorded with verified skill trust enhancements.',
        careerDnaEvent: {
          year: '2026',
          title: 'Industry Practicum Endorsement',
          category: 'Feedback',
          description: 'High ratings awarded for technical execution and teamwork.',
          badge: 'Industry Endorsed',
          verified: true,
        },
        skillImpacts: [{ skill: 'Python', trustDelta: 4, newStatus: 'verified' }],
        error: error.message,
      },
      { status: 200 }
    );
  }
}
