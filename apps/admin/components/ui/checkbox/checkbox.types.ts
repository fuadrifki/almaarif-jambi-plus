import type { CheckedState } from '@radix-ui/react-checkbox';
import type { ComponentPropsWithoutRef } from 'react';

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'defaultChecked' | 'onChange'
> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  disabled?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
}
