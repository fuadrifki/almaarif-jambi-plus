import { cn } from '@/lib';

import type { CardProps } from './card.types';

export const Card = ({
  title,
  description,
  footer,
  hoverable,
  children,
  className,
  noPadding,
  ...props
}: CardProps) => (
  <div
    className={cn(
      'ads-cards',
      !noPadding && 'p-4',
      hoverable &&
        'cursor-pointer hover:bg-gray-300/40! hover:scale-[101%] transition duration-300',
      className,
    )}
    {...props}
  >
    {(title || description) && (
      <header className="space-y-1">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}

        {description && <p className="text-sm text-secondary">{description}</p>}
      </header>
    )}

    {children}

    {footer && <footer className="flex justify-end gap-3">{footer}</footer>}
  </div>
);
