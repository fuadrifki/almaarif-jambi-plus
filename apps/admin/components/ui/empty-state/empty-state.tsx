import type { ReactNode } from 'react';

import { cn } from '@/lib';

export type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
    {icon && (
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/8 text-(--text-secondary) dark:bg-white/5">
        {icon}
      </div>
    )}

    <h3 className="text-sm font-semibold text-(--text-primary)">{title}</h3>

    {description && <p className="mt-1 max-w-sm text-sm text-(--text-secondary)">{description}</p>}

    {action && <div className="mt-4">{action}</div>}
  </div>
);
