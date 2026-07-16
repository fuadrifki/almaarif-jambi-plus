import { Surface } from '../surface';
import { cn } from '@/lib';

import type { CardProps } from './card.types';

export const Card = ({ title, description, footer, children, className, ...props }: CardProps) => (
  <Surface className={cn('space-y-4 p-4', className)} {...props}>
    {(title || description) && (
      <header className="space-y-1">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}

        {description && <p className="text-sm text-secondary">{description}</p>}
      </header>
    )}

    {children}

    {footer && <footer className="flex justify-end gap-3">{footer}</footer>}
  </Surface>
);
