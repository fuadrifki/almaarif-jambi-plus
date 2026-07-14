import type { ButtonHTMLAttributes } from 'react';

export type PaginationProps = Omit<ButtonHTMLAttributes<HTMLDivElement>, 'onChange'> & {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};
