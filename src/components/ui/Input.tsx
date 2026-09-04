'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(props.value || props.defaultValue);

    return (
      <div className="relative group w-full">
        <label
          className={cn(
            'absolute left-4 transition-all duration-200 pointer-events-none',
            isFocused || hasValue
              ? 'top-2 text-xs text-forest-500 font-medium'
              : 'top-1/2 -translate-y-1/2 text-base text-forest-600/70'
          )}
        >
          {label}
        </label>
        <input
          type={type}
          className={cn(
            'flex h-14 w-full rounded-2xl border-2 border-forest-200 bg-earth-50 px-4 pt-5 pb-1 text-base text-forest-900 transition-colors',
            'focus:border-accent-leaf focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
