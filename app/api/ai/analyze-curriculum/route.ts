import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { curriculumText, department = 'Computer Science & Engineering' } = body;

    const gemini = getGeminiClient();

    if (!gemini) {
      return NextResponse.json({
        department,
        overallAlignmentScore: 68,
        summary: 'Strong theoretical rigor in core computing foundations (DBMS, Algorithms, OS). Substantial gap identified in modern cloud containerization, vector indexing, and production LLMOps practices.',
        extractedSubjects: [
          {
            subjectCode: 'CS502',
            name: 'Database Management Systems',
            academicConcepts: ['Relational Normalization', 'ACID Transactions', 'B+ Trees', 'Relational Calculus'],
            mappedIndustrySkills: ['PostgreSQL', 'PgVector Hybrid Search', 'Query Optimization', 'Connection Pooling'],
            industryDemand: 'Very High',
            gapStatus: 'Needs Workshop',
            recommendedIntervention: 'Integrate PgVector and unstructured embeddings indexing lab module into existing SQL practicals.',
          },
          {
            subjectCode: 'CS704',
            name: 'Cloud Computing & Distributed Services',
            academicConcepts: ['Hypervisors', 'IaaS/PaaS Models', 'MapReduce Paradigms'],
            mappedIndustrySkills: ['Kubernetes Cluster Ops', 'Docker Multi-stage Builds', 'Helm Charts', 'Microservice Ingress'],
            industryDemand: 'Very High',
            gapStatus: 'Critical Lab Gap',
            recommendedIntervention: 'Upgrade legacy virtualization theory with real hands-on Kubernetes orchestration clusters.',
          },
        ],
        industryAlignmentStats: {
          coreTheoryAligned: 88,
          practicalToolsAligned: 54,
          industryExposureScore: 62,
        },
        modelUsed: 'fallback',
      });
    }

    const prompt = `You are the CareerOS Institutional Curriculum Intelligence Engine.
Analyze the following university syllabus/curriculum for the "${department}" department against current 2026 industry demand (AI, Cloud, Distributed Systems, Modern Web).

Extract:
1. Academic subjects with concepts taught.
2. Direct mapping from academic concept to industry required skills (e.g., Relational Algebra -> SQL Indexing & PgVector).
3. Industry demand level (Very High, High, Medium, Low).
4. Curriculum gap status (Aligned, Needs Workshop, Critical Lab Gap).
5. Concrete academic intervention to modernize learning.

Return ONLY valid JSON matching this schema:
{
  "department": "${department}",
  "overallAlignmentScore": 72,
  "summary": "string",
  "extractedSubjects": [
    {
      "subjectCode": "string",
      "name": "string",
      "academicConcepts": ["string"],
      "mappedIndustrySkills": ["string"],
      "industryDemand": "Very High | High | Medium | Low",
      "gapStatus": "Aligned | Needs Workshop | Critical Lab Gap",
      "recommendedIntervention": "string"
    }
  ],
  "industryAlignmentStats": {
    "coreTheoryAligned": 85,
    "practicalToolsAligned": 58,
    "industryExposureScore": 65
  }
}

Curriculum Content:
"""
${curriculumText || 'Department of Computer Science: CS502 DBMS, CS503 Operating Systems, CS704 Cloud Computing, CS706 Machine Learning'}
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
    console.error('Error in /api/ai/analyze-curriculum:', error);
    return NextResponse.json(
      {
        department: 'Computer Science & Engineering',
        overallAlignmentScore: 68,
        summary: 'Curriculum analysis processed with fallback benchmarks. Core foundations remain high with targeted practical modernizations needed.',
        extractedSubjects: [],
        industryAlignmentStats: { coreTheoryAligned: 85, practicalToolsAligned: 55, industryExposureScore: 60 },
        error: error.message,
      },
      { status: 200 }
    );
  }
}
