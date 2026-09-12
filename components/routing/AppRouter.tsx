'use client';

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import HomePage from '@/components/home/HomePage';
import AuthPage from '@/components/auth/AuthPage';
import { useCareerOS } from '@/context/CareerOSContext';

// Layout components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ToastContainer from '@/components/layout/ToastContainer';
import CommandPalette from '@/components/layout/CommandPalette';
import CopilotDrawer from '@/components/layout/CopilotDrawer';
import DemoJourneyModal from '@/components/demo/DemoJourneyModal';

// Student Views
import StudentDashboard from '@/components/student/StudentDashboard';
import CareerDnaView from '@/components/student/CareerDnaView';
import SkillDnaView from '@/components/student/SkillDnaView';
import SkillGapView from '@/components/student/SkillGapView';
import CareerTwinView from '@/components/student/CareerTwinView';
import InterventionEngineView from '@/components/student/InterventionEngineView';
import RoadmapView from '@/components/student/RoadmapView';
import LearningAndProjectsView from '@/components/student/LearningAndProjectsView';
import MentorDiscoveryView from '@/components/student/MentorDiscoveryView';
import AssessmentCenterView from '@/components/student/AssessmentCenterView';
import InterviewSimulatorView from '@/components/student/InterviewSimulatorView';
import SkillPassportView from '@/components/student/SkillPassportView';
import OpportunityEngineView from '@/components/student/OpportunityEngineView';
import ApplicationTrackerView from '@/components/student/ApplicationTrackerView';
import MarketIntelligenceView from '@/components/student/MarketIntelligenceView';

// Multi-role Views
import AcademicianDashboard from '@/components/academician/AcademicianDashboard';
import InstitutionCommandCenter from '@/components/institution/InstitutionCommandCenter';
import IndustryTalentPortal from '@/components/industry/IndustryTalentPortal';

function WorkspaceLayout() {
  const { activeTab, setActiveTab, role } = useCareerOS();
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();

  // Sync react-router-dom URL params with CareerOS tab state
  useEffect(() => {
    if (section && section !== activeTab) {
      setActiveTab(section);
    }
  }, [section, activeTab, setActiveTab]);

  const renderContent = () => {
    // Check if non-student role is active
    if (role === 'academician') {
      return <AcademicianDashboard />;
    }
    if (role === 'institution') {
      return <InstitutionCommandCenter />;
    }
    if (role === 'industry') {
      return <IndustryTalentPortal />;
    }

    // Student Role Active
    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'career-dna':
        return <CareerDnaView />;
      case 'skill-dna':
        return <SkillDnaView />;
      case 'skill-gaps':
        return <SkillGapView />;
      case 'career-twin':
        return <CareerTwinView />;
      case 'interventions':
        return <InterventionEngineView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'learning-projects':
      case 'projects':
        return <LearningAndProjectsView />;
      case 'mentors':
        return <MentorDiscoveryView />;
      case 'assessments':
        return <AssessmentCenterView />;
      case 'interview':
        return <InterviewSimulatorView />;
      case 'skill-passport':
      case 'passport':
        return <SkillPassportView />;
      case 'opportunities':
        return <OpportunityEngineView />;
      case 'applications':
        return <ApplicationTrackerView />;
      case 'market-intelligence':
      case 'market':
        return <MarketIntelligenceView />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-blue-600 selection:text-white overflow-x-hidden relative">
      {/* Background Cyber Gridlines */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-grid-cyber opacity-75" 
        aria-hidden="true" 
      />
      {/* Ambient Radial Blue Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.22),transparent_70%)]" 
        aria-hidden="true" 
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(30,64,175,0.12),transparent_60%)]" 
        aria-hidden="true" 
      />

      {/* Global Overlays & Modals */}
      <ToastContainer />
      <CommandPalette />
      <CopilotDrawer />
      <DemoJourneyModal />

      <div className="flex flex-1 relative min-h-screen max-w-full overflow-x-hidden z-10">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Workspace Layout */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
          <Header />

          {/* Main View Port */}
          <main className="flex-1 p-3 sm:p-5 lg:p-8 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Home Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<AuthPage defaultMode="login" />} />
        <Route path="/signup" element={<AuthPage defaultMode="signup" />} />

        {/* CareerOS Main Platform & Sections */}
        <Route path="/app" element={<WorkspaceLayout />} />
        <Route path="/app/:section" element={<WorkspaceLayout />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
