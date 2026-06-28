'use client';

import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({ label, hint, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
      {hint && !error && (
        <span className="text-xs text-gray-500">
          {hint}
        </span>
      )}
      {error && (
        <span className="text-xs text-red-500 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
