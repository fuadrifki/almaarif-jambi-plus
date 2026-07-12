'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, LoaderCircle } from 'lucide-react';

import { cn } from '@/lib';

import type { SelectProps } from './select.types';

export const Select = ({
  options,
  value,
  defaultValue,
  placeholder = 'Pilih data',
  size = 'md',
  status = 'idle',
  disabled,
  className,
  onChange,
}: SelectProps) => {
  const isLoading = status === 'loading';

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      disabled={disabled || isLoading}
      onValueChange={onChange}
    >
      <SelectPrimitive.Trigger
        className={cn(
          'ads-select__trigger rounded-full cursor-pointer',
          `ads-select__trigger--${size}`,
          `ads-select__trigger--${status}`,
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />

        {isLoading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <SelectPrimitive.Icon>
            <ChevronDown className="size-4" />
          </SelectPrimitive.Icon>
        )}
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position="popper" sideOffset={8} className="ads-select__content">
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="ads-select__item"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>

                <SelectPrimitive.ItemIndicator>
                  <Check className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
