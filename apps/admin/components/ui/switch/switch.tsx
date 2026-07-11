'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib';

import type { SwitchProps } from './switch.types';

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root className={cn('ads-switch', className)} {...props}>
      <SwitchPrimitive.Thumb className="ads-switch__thumb" />
    </SwitchPrimitive.Root>
  );
}
