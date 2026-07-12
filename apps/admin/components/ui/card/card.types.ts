import type { HTMLAttributes, ReactNode } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  heading?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
};
