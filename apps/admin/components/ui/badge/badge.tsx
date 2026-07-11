import { cn } from '@/lib';

import type { BadgeProps } from './badge.types';

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <span className={cn('ads-badge', `ads-badge--${variant}`, className)} {...props} />;
}
