import type { HTMLAttributes, ReactNode } from 'react';

export type SegmentedControlProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export type SegmentedControlItemProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
};
