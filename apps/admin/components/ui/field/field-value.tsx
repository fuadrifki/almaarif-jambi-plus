import { cn } from '@/lib';

import type { FieldValueProps } from './field-value.types';

export const FieldValue = ({ children, className }: FieldValueProps) => {
  return (
    <div
      className={cn('mt-1', 'text-sm', 'text-[--text-primary]', 'break-words', className)}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
};
