import type { ReactNode } from 'react';

export type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export type TabsItemProps = {
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};
