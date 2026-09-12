'use client';

import React from 'react';
import { useCareerOS } from '@/context/CareerOSContext';
import { Bell, Sparkles, Briefcase, Award, ShieldCheck, X, ChevronRight } from 'lucide-react';

export default function NotificationDrawer({ onClose }: { onClose: () => void }) {
  const { notifications, setActiveTab } = useCareerOS();

  const getIcon = (type: string) => {
    switch (type) {
      case 'skill':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'opportunity':
        return <Briefcase className="w-4 h-4 text-indigo-400" />;
      case 'assessment':
        return <Award className="w-4 h-4 text-purple-400" />;
      case 'intervention':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-auto mt-1 sm:mt-2 w-[calc(100vw-1rem)] sm:w-96 max-w-sm rounded-2xl bg-black/95 border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)] p-4 z-50 text-white animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Career Intelligence Feed</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          aria-label="Close notifications"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="divide-y divide-blue-900/30 max-h-80 overflow-y-auto mt-2 -mr-1 pr-1">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              if (n.linkTab) setActiveTab(n.linkTab);
              onClose();
            }}
            className="py-3 px-2 hover:bg-blue-950/40 rounded-xl transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-blue-950/60 border border-blue-900/50 shrink-0 mt-0.5">{getIcon(n.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-blue-300 font-mono shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.description}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:text-white shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
