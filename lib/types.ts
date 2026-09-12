export type UserRole = 'student' | 'academician' | 'institution' | 'industry';

export type SkillTrustLevel = 'claimed' | 'developing' | 'demonstrated' | 'verified';
export type SkillStatus = SkillTrustLevel;
export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'AI/ML' | 'GenAI' | 'DevOps' | 'Security' | 'Core CS' | 'Soft Skills' | string;

export type SkillPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'AI/ML' | 'GenAI' | 'DevOps' | 'Security' | 'Core CS' | 'Soft Skills';
  currentScore: number; // 0-100
  requiredScore: number; // 0-100
  evidenceCount: number;
  trustScore: number; // 0-100 CareerOS Internal Trust
  status: SkillTrustLevel;
  industryDemand: 'Very High' | 'High' | 'Moderate' | 'Growing';
  lastVerifiedDate?: string;
  evidenceSources: {
    type: 'resume' | 'assessment' | 'project' | 'github' | 'interview' | 'mentor' | 'industry';
    name: string;
    verified: boolean;
    date: string;
  }[];
}

export interface SkillGap {
  id: string;
  skillName: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: SkillPriority;
  industryDemand: string;
  evidenceQuality: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
  reason: string;
  estimatedEffortWeeks: number;
  recommendedIntervention: string;
  relatedOpportunitiesCount: number;
  careerImpactScore: number; // 0-100
  learningEffortScore: number; // 0-100
  transferabilityScore: number; // 0-100
}

export interface CareerIntervention {
  id: string;
  skillName: string;
  gapId: string;
  title: string;
  type: 'project' | 'course' | 'assessment' | 'mentor' | 'workshop' | 'hackathon' | 'industry_project' | 'internship';
  description: string;
  expectedEvidence: string;
  verificationMethod: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'verified';
  durationWeeks: number;
  provider?: string;
  xpReward: number;
}

export type Intervention = CareerIntervention;

export interface RoadmapPhase {
  phaseNumber: number;
  name: string;
  timeframe: string;
  skills: string[];
  status: 'completed' | 'in_progress' | 'upcoming';
  tasks: {
    id: string;
    title: string;
    completed: boolean;
    type: 'learn' | 'build' | 'verify' | 'apply';
  }[];
  milestone: string;
  projectRecommendation?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  degree: string;
  department?: string;
  institution: string;
  graduationYear: number;
  cgpa?: number;
  targetRole: string;
  currentRole: string;
  bio: string;
  location: string;
  careerReadiness: number; // 0-100
  industryAlignment: number; // 0-100
  skillTrust: number; // 0-100
  priorityGapsCount: number;
  verifiedSkillsCount: number;
  readinessBreakdown: {
    technicalCapability: number;
    evidenceStrength: number;
    industryAlignment: number;
    interviewReadiness: number;
    projectReadiness: number;
  };
  skills: Skill[];
  careerInterests: string[];
  targetRoles: string[];
  dnaTimeline: {
    year: string;
    title: string;
    category: 'Education' | 'Project' | 'Certification' | 'Assessment' | 'Internship' | 'Feedback';
    description: string;
    badge?: string;
    verified: boolean;
  }[];
  projects: StudentProject[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
    skills: string[];
    verified: boolean;
  }[];
  weeklyTasks: {
    id: string;
    title: string;
    category: string;
    completed: boolean;
    dueDate: string;
    impactScore: number;
  }[];
}

export interface StudentProject {
  id: string;
  title: string;
  company?: string;
  description: string;
  skills: string[];
  role: string;
  githubUrl?: string;
  liveUrl?: string;
  status: 'planning' | 'in_progress' | 'completed' | 'evaluated';
  evaluationScore?: number;
  evaluationFeedback?: string;
  verifiedDate?: string;
  verifiedBy?: string;
}

export type ApplicationStatus = 'Saved' | 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Rejected';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  isDemoCompany: boolean;
  type: 'job' | 'internship' | 'project' | 'challenge' | 'apprenticeship';
  location: string;
  stipendOrSalary: string;
  matchScore: number; // 0-100
  matchBreakdown: {
    skills: number;
    evidence: number;
    experience: number;
    eligibility: number;
    careerGoal: number;
  };
  matchReason: string;
  satisfiedRequirements: string[];
  missingRequirements: string[];
  evidenceGaps: string[];
  skillsRequired: string[];
  requiredSkills?: string[];
  deadline: string;
  applied?: boolean;
  applicationStatus?: ApplicationStatus;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  isDemoProfile: boolean;
  avatarUrl: string;
  experienceYears: number;
  expertise: string[];
  availability: string;
  rating: number;
  reviewsCount: number;
  matchReason: string;
  bio: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'code' | 'behavioral';
  options?: string[];
  correctAnswer?: number;
  codeSnippet?: string;
  explanation: string;
  skill: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface AssessmentResult {
  id: string;
  title: string;
  skill: string;
  date: string;
  score: number;
  accuracy: number;
  timeSpentMinutes: number;
  weakAreas: string[];
  strengths: string[];
  aiEvaluation: string;
  skillTrustImpact: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  feedback?: {
    technicalCorrectness: number;
    communication: number;
    structure: number;
    strengths: string;
    improvements: string;
  };
}

export interface InterviewSession {
  id: string;
  mode: 'Technical' | 'HR' | 'Behavioral' | 'Project' | 'Company-specific';
  targetRole: string;
  status: 'in_progress' | 'completed';
  messages: InterviewMessage[];
  overallScore?: number;
  evaluation?: {
    technicalScore: number;
    communicationScore: number;
    problemSolvingScore: number;
    confidenceScore: number;
    strengths: string[];
    weaknesses: string[];
    skillImpact: string;
    recommendedActions: string[];
  };
}

export interface CurriculumSubject {
  id: string;
  subjectCode: string;
  name: string;
  semester: number;
  credits: number;
  academicConcepts: string[];
  mappedIndustrySkills: string[];
  industryDemand: 'Very High' | 'High' | 'Medium' | 'Low';
  academicCoverage: 'High' | 'Medium' | 'Low';
  practicalExposure: 'High' | 'Medium' | 'Low';
  gapStatus: 'Aligned' | 'Needs Workshop' | 'Critical Lab Gap';
  recommendedIntervention: string;
}

export interface IndustryCandidate {
  id: string;
  name: string;
  institution: string;
  degree: string;
  targetRole: string;
  careerReadiness: number;
  skillTrust: number;
  matchScore: number;
  verifiedSkills: string[];
  projectsCount: number;
  pipelineStatus: 'Eligible' | 'Skill Matched' | 'Assessment Ready' | 'Interview Ready' | 'Selected';
  avatarUrl: string;
  summary: string;
  matchWhy: string;
}

export interface IndustryFeedbackSubmission {
  candidateId: string;
  candidateName: string;
  companyName: string;
  role: string;
  technicalRating: number; // 1-5
  communicationRating: number; // 1-5
  problemSolvingRating: number; // 1-5
  teamworkRating: number; // 1-5
  professionalismRating: number; // 1-5
  specificFeedback: string;
  skillsDemonstrated: string[];
  skillsNeedingWork: string[];
  aiAnalysisSummary?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'skill' | 'opportunity' | 'assessment' | 'mentor' | 'intervention' | 'system';
  read: boolean;
  linkTab?: string;
}
