import { cn } from '@/lib';

import type { BadgeProps } from './badge.types';

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => (
  <span className={cn('ads-badge', `ads-badge--${variant}`, className)} {...props} />
);
