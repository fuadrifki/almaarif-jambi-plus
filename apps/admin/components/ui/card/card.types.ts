import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
}
