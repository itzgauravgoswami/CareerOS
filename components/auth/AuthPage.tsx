'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Cpu,
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Dna,
  Zap,
} from 'lucide-react';
import { useCareerOS } from '@/context/CareerOSContext';
import { UserRole } from '@/lib/types';

interface AuthPageProps {
  defaultMode?: 'login' | 'signup';
}

export default function AuthPage({ defaultMode = 'login' }: AuthPageProps) {
  const navigate = useNavigate();
  const { setRole, setActiveTab, addToast } = useCareerOS();

  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setRole(selectedRole);
      setActiveTab('dashboard');
      addToast(
        isLogin
          ? `Signed in as ${selectedRole.toUpperCase()} successfully!`
          : `Account created for ${name || 'User'} (${selectedRole.toUpperCase()})!`,
        'success'
      );
      setLoading(false);
      navigate('/app');
    }, 600);
  };

  const handleQuickDemoLogin = (role: UserRole, personaName: string) => {
    setRole(role);
    setActiveTab('dashboard');
    addToast(`Authenticated as ${personaName} (${role.toUpperCase()})`, 'success');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background Cyber Gridlines */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-grid-cyber opacity-75" 
        aria-hidden="true" 
      />
      {/* Ambient Blue Radial Glows */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.25),transparent_70%)]" 
        aria-hidden="true" 
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(30,64,175,0.12),transparent_60%)]" 
        aria-hidden="true" 
      />

      {/* Top Header Bar */}
      <header className="relative z-10 px-4 sm:px-8 py-5 flex items-center justify-between border-b border-blue-900/30">
        <Link to="/" className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-600/30">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight text-white">CareerOS</span>
        </Link>
        <Link
          to="/app"
          className="text-xs text-blue-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
        >
          <span>Demo Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Authentication Center */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-md rounded-3xl bg-black/90 border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.22)] backdrop-blur-md p-6 sm:p-8 flex flex-col">
          {/* Logo & Headline */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-600/40 mx-auto mb-3">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {isLogin ? 'Welcome Back to CareerOS' : 'Join the Intelligence Network'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              {isLogin
                ? 'Sign in to access your AI Career Twin & DNA metrics'
                : 'Create your verifiable career profile in 60 seconds'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Login vs Sign Up) */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-black/80 border border-blue-900/50 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`py-2 rounded-lg transition-all ${
                isLogin
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`py-2 rounded-lg transition-all ${
                !isLogin
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Role Picker */}
          <div className="mb-5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Select Your Stakeholder Role
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {(
                [
                  { id: 'student', label: 'Student', icon: Dna },
                  { id: 'academician', label: 'Faculty', icon: GraduationCap },
                  { id: 'institution', label: 'Institution', icon: Building2 },
                  { id: 'industry', label: 'Industry', icon: Briefcase },
                ] as const
              ).map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                        : 'bg-black/60 border-blue-900/40 text-slate-400 hover:text-slate-200 hover:border-blue-900/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="font-medium text-[11px]">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isLogin && (
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/80 border border-blue-900/50 focus:border-blue-500 rounded-xl pl-9.5 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Institutional / Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder={
                    selectedRole === 'student'
                      ? 'aarav.sharma@nit.edu.in'
                      : selectedRole === 'academician'
                      ? 'r.sundaram@nit.edu.in'
                      : selectedRole === 'institution'
                      ? 'director@nit.ac.in'
                      : 'recruiter@novatech.io'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/80 border border-blue-900/50 focus:border-blue-500 rounded-xl pl-9.5 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-300">Password</label>
                {isLogin && (
                  <button type="button" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/80 border border-blue-900/50 focus:border-blue-500 rounded-xl pl-9.5 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In to Workspace' : 'Complete Registration'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Instant Logins */}
          <div className="mt-6 pt-5 border-t border-blue-900/30">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-400" /> One-Click Evaluation Logins
              </span>
              <span className="text-[9px] font-mono text-blue-300">Fast Evaluator Access</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('student', 'Aarav Sharma')}
                className="p-2 rounded-xl bg-blue-950/30 hover:bg-blue-900/40 border border-blue-900/40 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all text-left truncate"
              >
                <div className="font-semibold text-white">Student</div>
                <div className="text-[10px] text-blue-300 truncate">Aarav Sharma</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('academician', 'Prof. Sundaram')}
                className="p-2 rounded-xl bg-blue-950/30 hover:bg-blue-900/40 border border-blue-900/40 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all text-left truncate"
              >
                <div className="font-semibold text-white">Faculty</div>
                <div className="text-[10px] text-blue-300 truncate">Prof. Sundaram</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('institution', 'NIT Directorate')}
                className="p-2 rounded-xl bg-blue-950/30 hover:bg-blue-900/40 border border-blue-900/40 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all text-left truncate"
              >
                <div className="font-semibold text-white">Institution</div>
                <div className="text-[10px] text-blue-300 truncate">NIT Directorate</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('industry', 'NovaTech Recruiter')}
                className="p-2 rounded-xl bg-blue-950/30 hover:bg-blue-900/40 border border-blue-900/40 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all text-left truncate"
              >
                <div className="font-semibold text-white">Industry</div>
                <div className="text-[10px] text-blue-300 truncate">NovaTech Talent</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-[11px] text-slate-400 border-t border-blue-900/20 bg-black/80">
        CareerOS • Autonomous Skill Intelligence • Encrypted Multi-Factor Auth Protocol
      </footer>
    </div>
  );
}
