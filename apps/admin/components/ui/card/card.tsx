import { Surface } from '../surface';
import { cn } from '@/lib';

import type { CardProps } from './card.types';

export function Card({ heading, description, footer, children, className, ...props }: CardProps) {
  return (
    <Surface className={cn('space-y-6 p-6', className)} {...props}>
      {(heading || description) && (
        <header className="space-y-1">
          {heading && <h3 className="text-lg font-semibold">{heading}</h3>}

          {description && <p className="text-sm text-(--text-secondary)">{description}</p>}
        </header>
      )}

      {children}

      {footer && <footer className="flex justify-end gap-3">{footer}</footer>}
    </Surface>
  );
}
