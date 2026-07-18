import { cn } from '@/lib';
import type { ComponentPropsWithoutRef } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = ({
  className,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  alignOffset = 0,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
}) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(
          'ads-popover',
          'bg-surface/95 backdrop-blur-xl',
          'border border-border',
          'rounded-xl',
          'shadow-xl',
          'p-2',
          'ads-popover-content',
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
