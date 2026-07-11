'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib';

import type { RadioGroupProps, RadioItemProps } from './radio.types';

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive.Root className={cn('ads-radio-group', className)} {...props} />;
}

export function RadioItem({ className, children, ...props }: RadioItemProps) {
  return (
    <label className="ads-radio-item">
      <RadioGroupPrimitive.Item className={cn('ads-radio', className)} {...props}>
        <RadioGroupPrimitive.Indicator className="ads-radio__indicator">
          <span className="ads-radio__dot" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {children && <span className="ads-radio-item__label">{children}</span>}
    </label>
  );
}
