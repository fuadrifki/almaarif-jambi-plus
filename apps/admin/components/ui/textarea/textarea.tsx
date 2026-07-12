'use client';

import { cn } from '@/lib';

import type { TextareaProps } from './textarea.types';

export const Textarea = ({
  className,
  size = 'md',
  status = 'idle',
  resize = 'vertical',
  disabled,
  ...props
}: TextareaProps) => (
  <textarea
    disabled={disabled}
    className={cn(
      'ads-textarea rounded-3xl',
      `ads-textarea--${size}`,
      `ads-textarea--${status}`,
      `ads-textarea--resize-${resize}`,
      className,
    )}
    {...props}
  />
);
