import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: ElementType;
};

export type BreadcrumbProps = ComponentPropsWithoutRef<'nav'> & {
  showHome?: boolean;
  items: BreadcrumbItem[];
};
