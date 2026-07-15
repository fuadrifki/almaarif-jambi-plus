import { cn } from '@/lib';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = ({
  className,
  sideOffset = 8,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'bg-surface/95 backdrop-blur-xl',
          'border border-border',
          'rounded-xl',
          'shadow-xl',
          'ads-popover',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
