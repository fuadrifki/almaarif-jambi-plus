import { Surface } from '../surface';
import { cn } from '@/lib';

import type { CardProps } from './card.types';

export function Card({ title, description, footer, children, className, ...props }: CardProps) {
  return (
    <Surface className={cn('space-y-6 p-6', className)} {...props}>
      {(title || description) && (
        <header className="space-y-1">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}

          {description && <p className="text-sm text-(--text-secondary)">{description}</p>}
        </header>
      )}

      {children}

      {footer && <footer className="flex justify-end gap-3">{footer}</footer>}
    </Surface>
  );
}
