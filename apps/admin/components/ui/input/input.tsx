'use client';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib';

import type { InputProps } from './input.types';

export const Input = ({
  className,
  size = 'md',
  status = 'idle',
  type = 'text',
  disabled,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const isLoading = status === 'loading';

  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="ads-input-wrapper">
      <input
        type={inputType}
        disabled={disabled || isLoading}
        className={cn(
          'ads-input rounded-full',
          `ads-input--${size}`,
          `ads-input--${status}`,
          isPassword && 'ads-input--password',
          className,
        )}
        {...props}
      />

      {isLoading ? (
        <LoaderCircle className="ads-input__loader size-4 animate-spin" />
      ) : isPassword ? (
        <button
          type="button"
          disabled={disabled}
          className="ads-input__action"
          onClick={() => setShowPassword((value) => !value)}
        >
          {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </button>
      ) : null}
    </div>
  );
};
