'use client';

import React, { Suspense } from 'react';
import { CreatorStoreProvider } from '../../lib/creator/store';
import { useSearchParams, usePathname } from 'next/navigation';
import ProgressBar from '../../components/ui/ProgressBar';
import CreatorNavbar from '../../components/ui/CreatorNavbar';

const stepNames = [
  'Basics',
  'Theme',
  'Story',
  'Memories',
  'Pitch',
  'Plan the Date',
  'Sign Off',
];

function CreatorHeader() {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const currentStep = Math.min(7, Math.max(1, parseInt(stepParam || '1', 10)));

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <ProgressBar currentStep={currentStep} totalSteps={7} />
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
          Step {currentStep} of 7
        </span>
        <span className="text-sm font-extrabold text-[#D4537E]">
          {stepNames[currentStep - 1]}
        </span>
      </div>
    </div>
  );
}

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSuccessPage = pathname === '/create/success';

  return (
    <CreatorStoreProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <CreatorNavbar />
        {!isSuccessPage && (
          <Suspense fallback={<div className="h-1.5 w-full bg-gray-100" />}>
            <CreatorHeader />
          </Suspense>
        )}
        <div className="flex-1 flex items-center justify-center p-4">
          {children}
        </div>
      </div>
    </CreatorStoreProvider>
  );
}
