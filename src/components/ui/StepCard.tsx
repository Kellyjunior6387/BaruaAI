'use client';

import { ReactNode } from 'react';

interface StepCardProps {
  children: ReactNode;
}

export default function StepCard({ children }: StepCardProps) {
  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
      {children}
    </div>
  );
}
