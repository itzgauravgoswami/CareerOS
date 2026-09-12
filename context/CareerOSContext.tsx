'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  UserRole,
  StudentProfile,
  SkillGap,
  CareerIntervention,
  RoadmapPhase,
  Opportunity,
  Mentor,
  CurriculumSubject,
  IndustryCandidate,
  NotificationItem,
  Skill,
} from '@/lib/types';
import {
  INITIAL_STUDENT,
  INITIAL_SKILL_GAPS,
  INITIAL_INTERVENTIONS,
  INITIAL_ROADMAP,
  INITIAL_OPPORTUNITIES,
  INITIAL_MENTORS,
  INITIAL_CURRICULUM,
  INITIAL_INDUSTRY_CANDIDATES,
  INITIAL_NOTIFICATIONS,
} from '@/lib/mock-data';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning';
}

interface CareerOSContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  skillGaps: SkillGap[];
  setSkillGaps: React.Dispatch<React.SetStateAction<SkillGap[]>>;
  interventions: CareerIntervention[];
  setInterventions: React.Dispatch<React.SetStateAction<CareerIntervention[]>>;
  roadmap: RoadmapPhase[];
  setRoadmap: React.Dispatch<React.SetStateAction<RoadmapPhase[]>>;
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  mentors: Mentor[];
  curriculum: CurriculumSubject[];
  setCurriculum: React.Dispatch<React.SetStateAction<CurriculumSubject[]>>;
  candidates: IndustryCandidate[];
  setCandidates: React.Dispatch<React.SetStateAction<IndustryCandidate[]>>;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  demoJourneyOpen: boolean;
  setDemoJourneyOpen: (open: boolean) => void;
  demoJourneyStep: number;
  setDemoJourneyStep: (step: number) => void;
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  // Dynamic Ecosystem Operations
  completeWeeklyTask: (taskId: string) => void;
  completeIntervention: (interventionId: string) => void;
  updateSkillScore: (skillId: string, newScore: number, newTrustOrStatus?: number | string) => void;
  applyToOpportunity: (opportunityId: string) => void;
  updateOpportunityStatus: (opportunityId: string, status: Opportunity['applicationStatus']) => void;
  requestMentorshipSession: (mentorId: string, topic: string) => void;
  toggleRoadmapMilestone: (phaseNumber: number, taskId: string) => void;
  submitIndustryFeedback: (companyName: string, role: string, score: number, feedback: string) => void;
  importResumeProfile: (profileData: any) => void;
  importCurriculumData: (subjectData: CurriculumSubject[]) => void;
  resetAllData: () => void;
}

const CareerOSContext = createContext<CareerOSContextType | undefined>(undefined);

export function CareerOSProvider({ children }: { children: React.ReactNode }) {
  const toastSeqRef = useRef(0);
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>(INITIAL_SKILL_GAPS);
  const [interventions, setInterventions] = useState<CareerIntervention[]>(INITIAL_INTERVENTIONS);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(INITIAL_ROADMAP);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [curriculum, setCurriculum] = useState<CurriculumSubject[]>(INITIAL_CURRICULUM);
  const [candidates, setCandidates] = useState<IndustryCandidate[]>(INITIAL_INDUSTRY_CANDIDATES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [demoJourneyOpen, setDemoJourneyOpen] = useState<boolean>(false);
  const [demoJourneyStep, setDemoJourneyStep] = useState<number>(1);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load state from localStorage on client mount if available
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedState = localStorage.getItem('careeros_student_state_v1');
        if (savedState) {
          const parsed = JSON.parse(savedState);
          if (parsed.student) setStudent(parsed.student);
          if (parsed.skillGaps) setSkillGaps(parsed.skillGaps);
          if (parsed.interventions) setInterventions(parsed.interventions);
          if (parsed.roadmap) setRoadmap(parsed.roadmap);
          if (parsed.opportunities) setOpportunities(parsed.opportunities);
        }
      } catch {
        // safe fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'careeros_student_state_v1',
        JSON.stringify({
          student,
          skillGaps,
          interventions,
          roadmap,
          opportunities,
        })
      );
    } catch {
      // safe ignore
    }
  }, [student, skillGaps, interventions, roadmap, opportunities]);

  // Toast helper
  const addToast = (title: string, description: string, type: 'success' | 'info' | 'warning' = 'success') => {
    toastSeqRef.current += 1;
    const id = `toast_${toastSeqRef.current}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Complete a weekly career action
  const completeWeeklyTask = (taskId: string) => {
    setStudent((prev) => {
      const updatedTasks = prev.weeklyTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      const isNowCompleted = updatedTasks.find((t) => t.id === taskId)?.completed;
      const readinessDelta = isNowCompleted ? 1 : -1;
      const newReadiness = Math.min(99, Math.max(50, prev.careerReadiness + readinessDelta));

      return {
        ...prev,
        careerReadiness: newReadiness,
        weeklyTasks: updatedTasks,
      };
    });

    addToast('Task Progress Updated', 'Career Readiness recalculated based on weekly momentum.', 'info');
  };

  // Complete an intervention (e.g. Node.js Streaming Gateway)
  const completeIntervention = (interventionId: string) => {
    const targetIntervention = interventions.find((i) => i.id === interventionId);
    if (!targetIntervention) return;

    setInterventions((prev) =>
      prev.map((i) => (i.id === interventionId ? { ...i, status: 'completed' as const } : i))
    );

    // Update the corresponding skill in Student DNA
    const skillNameLower = targetIntervention.skillName.toLowerCase();
    setStudent((prev) => {
      const updatedSkills = prev.skills.map((s) => {
        if (s.name.toLowerCase().includes('node') && skillNameLower.includes('node')) {
          return {
            ...s,
            currentScore: 82,
            trustScore: 78,
            status: 'demonstrated' as const,
            evidenceCount: s.evidenceCount + 1,
            evidenceSources: [
              ...s.evidenceSources,
              {
                type: 'project' as const,
                name: 'Streaming SSE Inference Gateway',
                verified: true,
                date: 'Today',
              },
            ],
          };
        }
        if (s.name.toLowerCase().includes('cloud') && skillNameLower.includes('cloud')) {
          return {
            ...s,
            currentScore: 75,
            trustScore: 72,
            status: 'demonstrated' as const,
            evidenceCount: s.evidenceCount + 1,
          };
        }
        return s;
      });

      const newTimelineItem = {
        year: '2026',
        title: `Completed Intervention: ${targetIntervention.title}`,
        category: 'Project' as const,
        description: `Verified completion of ${targetIntervention.expectedEvidence}. Awarded ${targetIntervention.xpReward} XP.`,
        badge: 'Verified Intervention',
        verified: true,
      };

      const newReadiness = Math.min(96, prev.careerReadiness + 6);
      const newAlignment = Math.min(95, prev.industryAlignment + 5);
      const newTrust = Math.min(92, prev.skillTrust + 7);

      return {
        ...prev,
        careerReadiness: newReadiness,
        industryAlignment: newAlignment,
        skillTrust: newTrust,
        priorityGapsCount: Math.max(0, prev.priorityGapsCount - 1),
        verifiedSkillsCount: prev.verifiedSkillsCount + 1,
        readinessBreakdown: {
          ...prev.readinessBreakdown,
          technicalCapability: Math.min(98, prev.readinessBreakdown.technicalCapability + 6),
          evidenceStrength: Math.min(98, prev.readinessBreakdown.evidenceStrength + 8),
          projectReadiness: Math.min(98, prev.readinessBreakdown.projectReadiness + 7),
        },
        skills: updatedSkills,
        dnaTimeline: [newTimelineItem, ...prev.dnaTimeline],
      };
    });

    // Reduce or resolve the skill gap
    setSkillGaps((prev) =>
      prev
        .map((g) => {
          if (g.id === targetIntervention.gapId) {
            const newGap = Math.max(0, g.gap - 28);
            return {
              ...g,
              currentLevel: 82,
              gap: newGap,
              priority: newGap > 10 ? ('medium' as const) : ('low' as const),
              evidenceQuality: 'Strong' as const,
            };
          }
          return g;
        })
        .filter((g) => g.gap > 5)
    );

    // Boost opportunity matches across connected jobs!
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === 'opp_1') {
          return {
            ...opp,
            matchScore: 97,
            matchBreakdown: { ...opp.matchBreakdown, skills: 98, evidence: 96 },
            matchReason: 'Node.js streaming backend gap closed! Profile satisfies 98% of NovaTech technical requirements.',
          };
        }
        return opp;
      })
    );

    // Also update industry candidates view for Aarav
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === 'cand_1'
          ? {
              ...c,
              careerReadiness: 84,
              skillTrust: 75,
              matchScore: 97,
              pipelineStatus: 'Assessment Ready',
            }
          : c
      )
    );

    addToast(
      'Intervention Verified!',
      `${targetIntervention.skillName} capability upgraded. Career Readiness increased to 84%. NovaTech match raised to 97%.`,
      'success'
    );
  };

  // Update specific skill score directly
  const updateSkillScore = (skillId: string, newScore: number, newTrustOrStatus?: number | string) => {
    setStudent((prev) => {
      const updatedSkills = prev.skills.map((s) => {
        if (s.id === skillId || s.name.toLowerCase() === skillId.toLowerCase()) {
          const trust =
            typeof newTrustOrStatus === 'number'
              ? newTrustOrStatus
              : Math.round(newScore * 0.9 + 5);
          const status =
            typeof newTrustOrStatus === 'string'
              ? (newTrustOrStatus as any)
              : newScore >= 85
              ? 'verified'
              : newScore >= 70
              ? 'demonstrated'
              : 'developing';
          return {
            ...s,
            currentScore: newScore,
            trustScore: trust,
            status: status as any,
          };
        }
        return s;
      });

      const avgScore = Math.round(
        updatedSkills.reduce((acc, curr) => acc + curr.currentScore, 0) / updatedSkills.length
      );

      return {
        ...prev,
        careerReadiness: Math.min(99, Math.max(50, Math.round((prev.careerReadiness + avgScore) / 2))),
        skills: updatedSkills,
      };
    });

    addToast('Skill DNA Updated', 'Ecosystem recalculated across Career Twin and Opportunities.', 'info');
  };

  // Apply to an opportunity
  const applyToOpportunity = (opportunityId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === opportunityId ? { ...opp, applied: true, applicationStatus: 'Applied' } : opp))
    );

    const opp = opportunities.find((o) => o.id === opportunityId);
    if (opp) {
      addToast('Application Submitted', `Application sent to ${opp.company} for ${opp.title}. Tracked in Pipeline.`, 'success');
    }
  };

  // Update opportunity status (Kanban drag/drop or select)
  const updateOpportunityStatus = (opportunityId: string, status: Opportunity['applicationStatus']) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === opportunityId ? { ...opp, applicationStatus: status, applied: status !== 'Saved' } : opp))
    );
    addToast('Application Tracker Updated', `Opportunity status moved to ${status}.`, 'info');
  };

  // Request mentorship session
  const requestMentorshipSession = (mentorId: string, topic: string) => {
    const mentor = mentors.find((m) => m.id === mentorId);
    const mentorName = mentor ? mentor.name : 'Industry Mentor';
    addToast(
      'Mentorship Request Dispatched',
      `Session request sent to ${mentorName} for "${topic}". Calendar invite queued.`,
      'success'
    );
  };

  // Toggle roadmap milestone
  const toggleRoadmapMilestone = (phaseNumber: number, taskId: string) => {
    setRoadmap((prev) =>
      prev.map((p) => {
        if (p.phaseNumber !== phaseNumber) return p;
        const updatedTasks = p.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const allCompleted = updatedTasks.every((t) => t.completed);
        return {
          ...p,
          tasks: updatedTasks,
          status: allCompleted ? 'completed' : p.status === 'completed' ? 'in_progress' : p.status,
        };
      })
    );
    addToast('Roadmap Milestone Updated', 'Progress saved to continuous timeline.', 'info');
  };

  // Submit industry evaluation from Industry Portal
  const submitIndustryFeedback = (companyName: string, roleTitle: string, score: number, feedback: string) => {
    setStudent((prev) => {
      const newTimelineItem = {
        year: '2026',
        title: `Industry Evaluation (${companyName})`,
        category: 'Feedback' as const,
        description: `Supervisor rated candidate ${score}/5 for ${roleTitle}. "${feedback}"`,
        badge: 'Industry Verified',
        verified: true,
      };

      const newTrust = Math.min(96, prev.skillTrust + 5);
      const newReadiness = Math.min(98, prev.careerReadiness + 4);

      return {
        ...prev,
        careerReadiness: newReadiness,
        skillTrust: newTrust,
        dnaTimeline: [newTimelineItem, ...prev.dnaTimeline],
      };
    });

    // Update industry candidate list
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === 'cand_1'
          ? {
              ...c,
              pipelineStatus: 'Selected',
              careerReadiness: 86,
              skillTrust: 78,
            }
          : c
      )
    );

    addToast('Industry Feedback Integrated', 'Candidate Career DNA and Skill Trust score successfully elevated.', 'success');
  };

  // Import profile from parsed resume
  const importResumeProfile = (profileData: any) => {
    if (!profileData) return;
    setStudent((prev) => {
      const skillsToMerge = profileData.extractedSkills || [];
      const updatedSkills = [...prev.skills];

      skillsToMerge.forEach((newSk: any) => {
        const existingIdx = updatedSkills.findIndex((s) => s.name.toLowerCase() === newSk.name.toLowerCase());
        if (existingIdx >= 0) {
          updatedSkills[existingIdx] = {
            ...updatedSkills[existingIdx],
            currentScore: Math.max(updatedSkills[existingIdx].currentScore, newSk.score || 75),
            status: newSk.status || updatedSkills[existingIdx].status,
          };
        } else {
          updatedSkills.push({
            id: `sk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            name: newSk.name,
            category: newSk.category || 'Programming',
            currentScore: newSk.score || 70,
            requiredScore: 85,
            evidenceCount: 2,
            trustScore: Math.round((newSk.score || 70) * 0.85),
            status: newSk.status || 'demonstrated',
            industryDemand: 'High',
            evidenceSources: [{ type: 'resume', name: 'Parsed Resume', verified: true, date: 'Imported' }],
          });
        }
      });

      return {
        ...prev,
        name: profileData.candidateName || prev.name,
        degree: profileData.degree || prev.degree,
        careerReadiness: Math.min(98, Math.max(prev.careerReadiness, profileData.overallReadiness || 80)),
        skills: updatedSkills,
        dnaTimeline: [
          {
            year: '2026',
            title: 'AI Resume Intelligence Parsed',
            category: 'Certification',
            description: profileData.executiveSummary || 'Resume credentials and project evidence extracted by Autonomous AI.',
            badge: 'AI Verified',
            verified: true,
          },
          ...prev.dnaTimeline,
        ],
      };
    });

    addToast('Resume Integrated to Career DNA', 'Skills and project evidence merged into ecosystem.', 'success');
  };

  // Import syllabus
  const importCurriculumData = (newSubjects: CurriculumSubject[]) => {
    setCurriculum((prev) => [...newSubjects, ...prev]);
    addToast('Curriculum Mapped to Industry', 'Academic concepts mapped to modern industry skills.', 'success');
  };

  // Reset demo
  const resetAllData = () => {
    localStorage.removeItem('careeros_student_state_v1');
    setStudent(INITIAL_STUDENT);
    setSkillGaps(INITIAL_SKILL_GAPS);
    setInterventions(INITIAL_INTERVENTIONS);
    setRoadmap(INITIAL_ROADMAP);
    setOpportunities(INITIAL_OPPORTUNITIES);
    setCurriculum(INITIAL_CURRICULUM);
    setCandidates(INITIAL_INDUSTRY_CANDIDATES);
    setNotifications(INITIAL_NOTIFICATIONS);
    addToast('Ecosystem Reset', 'Seeded initial state restored.', 'info');
  };

  return (
    <CareerOSContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        student,
        setStudent,
        skillGaps,
        setSkillGaps,
        interventions,
        setInterventions,
        roadmap,
        setRoadmap,
        opportunities,
        setOpportunities,
        mentors,
        curriculum,
        setCurriculum,
        candidates,
        setCandidates,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        commandPaletteOpen,
        setCommandPaletteOpen,
        copilotOpen,
        setCopilotOpen,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        demoJourneyOpen,
        setDemoJourneyOpen,
        demoJourneyStep,
        setDemoJourneyStep,
        toasts,
        addToast,
        removeToast,
        completeWeeklyTask,
        completeIntervention,
        updateSkillScore,
        applyToOpportunity,
        updateOpportunityStatus,
        requestMentorshipSession,
        toggleRoadmapMilestone,
        submitIndustryFeedback,
        importResumeProfile,
        importCurriculumData,
        resetAllData,
      }}
    >
      {children}
    </CareerOSContext.Provider>
  );
}

export function useCareerOS() {
  const context = useContext(CareerOSContext);
  if (!context) {
    throw new Error('useCareerOS must be used within a CareerOSProvider');
  }
  return context;
}
