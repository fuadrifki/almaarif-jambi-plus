import { cn } from '@/lib';

import type { SurfaceProps } from './surface.types';

export const Surface = ({ className, ...props }: SurfaceProps) => (
  <div className={cn('ads-surface', className)} {...props} />
);
