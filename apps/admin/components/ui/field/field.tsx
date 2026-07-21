import { cn } from '@/lib';
import type { FieldProps } from './field.types';

export const Field = ({
  label,
  required = false,
  description,
  error,
  id,
  children,
  className,
}: FieldProps) => (
  <div className={cn('space-y-2', className)}>
    {label && (
      <label htmlFor={id} className="block text-sm font-semibold text-primary">
        {label}

        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
    )}

    {children}

    {error ? (
      <p className="text-xs text-red-400" role="alert">
        {error}
      </p>
    ) : description ? (
      <p className="text-xs text-secondary">{description}</p>
    ) : null}
  </div>
);
