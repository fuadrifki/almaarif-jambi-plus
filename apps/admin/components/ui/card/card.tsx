import { Surface } from '../surface';
import { cn } from '@/lib';

import type { CardProps } from './card.types';

export const Card = ({
  heading,
  description,
  footer,
  children,
  className,
  ...props
}: CardProps) => (
  <Surface className={cn('space-y-4 p-4', className)} {...props}>
    {(heading || description) && (
      <header className="space-y-1">
        {heading && <h3 className="text-lg font-semibold">{heading}</h3>}

        {description && <p className="text-sm text-secondary">{description}</p>}
      </header>
    )}

    {children}

    {footer && <footer className="flex justify-end gap-3">{footer}</footer>}
  </Surface>
);
