'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCareerOS } from '@/context/CareerOSContext';
import {
  Search,
  Bot,
  Bell,
  Sparkles,
  Command,
  PlayCircle,
  CheckCircle2,
  ExternalLink,
  Shield,
  Menu,
  Cpu,
  Home,
} from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';

export default function Header() {
  const {
    role,
    setRole,
    student,
    setCommandPaletteOpen,
    setCopilotOpen,
    setDemoJourneyOpen,
    unreadNotificationCount,
    markNotificationsAsRead,
    setMobileSidebarOpen,
  } = useCareerOS();

  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="h-14 border-b border-blue-900/40 bg-black/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none gap-2">
      {/* Left: Mobile Menu Toggle & Brand (lg:hidden) + Search Bar */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 max-w-xl">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-blue-950/50 transition-colors shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Logo */}
        <div className="flex items-center gap-1.5 lg:hidden shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-600/30">
            <Cpu className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm text-white hidden xs:inline tracking-tight">CareerOS</span>
        </div>

        {/* Search / Command Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex-1 min-w-0 flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-lg bg-black/70 border border-blue-900/50 hover:border-blue-500/50 text-slate-300 hover:text-white text-xs transition-all shadow-inner"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate text-left">
              <span className="hidden sm:inline">Search skills, opportunities, curriculum...</span>
              <span className="sm:hidden">Search...</span>
            </span>
          </div>
          <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-blue-950/60 text-blue-300 rounded border border-blue-800/60 shrink-0 ml-2">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Intelligence & Action Area */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Return to Home Landing Page */}
        <Link
          to="/"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-950/50 transition-colors"
          title="Return to Home Landing Page"
          aria-label="Home"
        >
          <Home className="w-4 h-4 text-blue-400" />
        </Link>

        {/* AI Engine Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
          <span className="font-medium text-[11px] text-white">AI Intelligence:</span>
          <span className="font-mono text-[10px] text-blue-300">Active Core</span>
        </div>

        {/* Interactive Showcase Journey Button */}
        <button
          onClick={() => setDemoJourneyOpen(true)}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-600/30 transition-all shrink-0"
        >
          <PlayCircle className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="hidden sm:inline">Demo Journey</span>
          <span className="sm:hidden text-[11px]">Demo</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              if (!notificationOpen) markNotificationsAsRead();
            }}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-blue-950/50 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-black" />
            )}
          </button>
          {notificationOpen && <NotificationDrawer onClose={() => setNotificationOpen(false)} />}
        </div>

        {/* Copilot Launcher */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 text-blue-200 hover:bg-blue-900/50 hover:text-white transition-all shrink-0"
          title="Open AI Career Copilot"
        >
          <Bot className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="hidden md:inline">AI Copilot</span>
        </button>

        {/* User Avatar & Role Indicator */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-blue-900/40 shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-blue-500/40 bg-blue-950 shrink-0">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">
              {role === 'student'
                ? student.name
                : role === 'academician'
                ? 'Prof. R. Sundaram'
                : role === 'institution'
                ? 'NIT Academic Directorate'
                : 'NovaTech Talent Team'}
            </div>
            <div className="text-[10px] text-blue-300 font-mono capitalize">{role} View</div>
          </div>
        </div>
      </div>
    </header>
  );
}
