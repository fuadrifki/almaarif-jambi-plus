import type { ReactNode } from 'react';

export type FieldProps = {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};
