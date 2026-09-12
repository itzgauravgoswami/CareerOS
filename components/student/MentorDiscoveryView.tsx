'use client';

import React, { useState } from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import { Mentor } from '@/lib/types';
import {
  Users,
  Sparkles,
  Star,
  Building,
  Calendar,
  CheckCircle2,
  X,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

export default function MentorDiscoveryView() {
  const { mentors, student, requestMentorshipSession, addToast } = useCareerOS();

  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [topic, setTopic] = useState('Streaming API Gateway Review & Career Guidance');

  const handleConfirmBooking = () => {
    if (bookingMentor) {
      requestMentorshipSession(bookingMentor.id, topic);
      setBookingMentor(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D1527] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 font-mono">
              Expert Guidance Network
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Target Role: {student.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Users className="w-7 h-7 text-purple-400 shrink-0" />
            <span>Mentor Discovery &amp; Practicum Network</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            CareerOS pairs you with verified industry leaders and faculty whose production expertise directly matches
            your diagnosed skill gaps.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B] text-right">
          <div className="text-[10px] font-mono uppercase text-slate-400">Available Mentors</div>
          <div className="text-xl font-bold text-purple-400 font-mono">{mentors.length} Verified</div>
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mentors.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-3xl bg-[#0D1527] border border-[#1E293B] hover:border-indigo-500/40 shadow-lg flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={m.avatarUrl}
                  alt={m.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white tracking-tight truncate">{m.name}</h3>
                  <p className="text-xs text-indigo-300 font-medium truncate">{m.role}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3" />
                    <span>{m.company}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs mb-3">
                <div className="flex items-center gap-1 text-amber-400 font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{m.rating}</span>
                </div>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">{m.reviewsCount} Reviews</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono text-[11px]">{m.availability}</span>
              </div>

              {/* AI Match Reason */}
              <div className="p-3 rounded-2xl bg-[#090F1E] border border-cyan-500/20 text-xs mb-3 space-y-1">
                <div className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> Why this mentor matches you
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{m.matchReason}</p>
              </div>

              {/* Expertise Badges */}
              <div className="flex flex-wrap gap-1.5">
                {m.expertise.map((e) => (
                  <span key={e} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#1E293B] text-slate-300">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1E293B] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">1:1 Office Hours</span>
              <button
                onClick={() => setBookingMentor(m)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
              >
                Request Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-[#0E172A] border border-[#1E293B] shadow-2xl p-6 text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Request Mentorship Session</h3>
              </div>
              <button
                onClick={() => setBookingMentor(null)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#090F1E] border border-[#1E293B]">
              <img
                src={bookingMentor.avatarUrl}
                alt={bookingMentor.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <div className="text-sm font-bold text-white">{bookingMentor.name}</div>
                <div className="text-xs text-slate-400">{bookingMentor.role} • {bookingMentor.company}</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Session Objective / Question:</label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#090F1E] border border-[#1E293B] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Availability: <strong className="text-emerald-400">{bookingMentor.availability}</strong>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setBookingMentor(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
              >
                Send Request →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
