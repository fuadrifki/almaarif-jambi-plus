'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib';

import type { CheckboxProps } from './checkbox.types';

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root className={cn('ads-checkbox', className)} {...props}>
    <CheckboxPrimitive.Indicator className="ads-checkbox__indicator">
      <Check className="size-3.5" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
