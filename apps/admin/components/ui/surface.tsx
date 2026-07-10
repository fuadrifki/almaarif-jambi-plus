import { HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const surfaceVariants = cva('surface', {
  variants: {
    variant: {
      default: '',
      elevated: 'surface-elevated',
      floating: 'surface-floating',
    },

    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },

  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

export interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {}

export function Surface({ className, variant, padding, ...props }: SurfaceProps) {
  return (
    <div
      className={cn(
        surfaceVariants({
          variant,
          padding,
        }),
        className,
      )}
      {...props}
    />
  );
}
