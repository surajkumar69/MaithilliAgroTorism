'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StepperProps {
  label: string;
  description?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function Stepper({ label, description, value, min = 0, max = 99, onChange, className }: StepperProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <div className="flex flex-col">
        <span className="font-medium text-forest-900">{label}</span>
        {description && <span className="text-xs text-forest-600">{description}</span>}
      </div>
      <div className="flex items-center space-x-3 bg-forest-50 rounded-full px-2 py-1 border border-forest-100">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-forest-800 hover:bg-forest-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
        >
          <span className="text-xl leading-none -mt-0.5">−</span>
        </button>
        <span className="w-6 text-center font-medium text-forest-950">{value}</span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-forest-800 hover:bg-forest-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
        >
          <span className="text-xl leading-none -mt-0.5">+</span>
        </button>
      </div>
    </div>
  );
}
