import { cn } from '@/lib';
import { HTMLAttributes } from 'react';

export type SurfaceProps = HTMLAttributes<HTMLDivElement>;

export function Surface({ className, ...props }: SurfaceProps) {
  return <div className={cn('ads-surface', className)} {...props} />;
}
