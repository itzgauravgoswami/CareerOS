'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CareerOSProvider } from '@/context/CareerOSContext';

const AppRouter = dynamic(() => import('@/components/routing/AppRouter'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-blue-300">Initializing CareerOS...</span>
      </div>
    </div>
  ),
});

export default function SignupPage() {
  return (
    <CareerOSProvider>
      <AppRouter />
    </CareerOSProvider>
  );
}
