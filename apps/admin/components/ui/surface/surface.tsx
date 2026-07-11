import type { HTMLAttributes } from 'react';

import { cn } from '@/lib';

export type SurfaceProps = HTMLAttributes<HTMLDivElement>;

export function Surface({ className, ...props }: SurfaceProps) {
  return <div className={cn('ads-surface', className)} {...props} />;
}
