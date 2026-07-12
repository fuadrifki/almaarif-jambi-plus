import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputStatus = 'idle' | 'error' | 'loading';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize;
  status?: InputStatus;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};
