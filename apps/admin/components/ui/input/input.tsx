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
  leftIcon,
  rightIcon,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const isLoading = status === 'loading';

  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={cn('ads-input-wrapper relative', className)}>
      {leftIcon && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)">
          {leftIcon}
        </span>
      )}

      <input
        type={inputType}
        disabled={disabled || isLoading}
        className={cn(
          'ads-input rounded-full',
          `ads-input--${size}`,
          `ads-input--${status}`,
          isPassword && 'ads-input--password',
          leftIcon && 'ads-input--has-left-icon',
          rightIcon && 'ads-input--has-right-icon',
        )}
        {...props}
      />

      {isLoading ? (
        <LoaderCircle className="ads-input__loader size-4" />
      ) : isPassword ? (
        <button
          type="button"
          disabled={disabled}
          className="ads-input__action"
          onClick={() => setShowPassword((value) => !value)}
        >
          {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </button>
      ) : rightIcon ? (
        <span className="ads-input__icon ads-input__icon--right">{rightIcon}</span>
      ) : null}
    </div>
  );
};
