import type { FieldProps } from './field.types';

export const Field = ({ label, required = false, description, error, children }: FieldProps) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-(--text-primary)">
        {label}

        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
    )}

    {children}

    {error ? (
      <p className="text-xs text-red-400">{error}</p>
    ) : description ? (
      <p className="text-xs text-(--text-secondary)">{description}</p>
    ) : null}
  </div>
);
