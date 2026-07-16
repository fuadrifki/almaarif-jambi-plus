import type { InputSize, InputStatus } from '../input/input.types';

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  size?: InputSize;
  status?: InputStatus;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  format?: string;
};
