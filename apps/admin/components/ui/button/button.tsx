import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib';

import type { ButtonProps } from './button.types';

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  status = 'idle',
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) => {
  const isLoading = status === 'loading';

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        'ads-button rounded-full font-semibold whitespace-nowrap',
        `ads-button--${variant}`,
        `ads-button--${size}`,
        className,
      )}
      {...props}
    >
      <span className="ads-button__content relative z-10">
        {isLoading ? <LoaderCircle className="size-4 animate-spin" /> : leftIcon}

        {children}

        {!isLoading && rightIcon}
      </span>
    </button>
  );
};
