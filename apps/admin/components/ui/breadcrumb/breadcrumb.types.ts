import { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

export type BreadcrumbItem = {
  label?: string;
  href?: string;
  icon?: LucideIcon;
};

export type BreadcrumbProps = ComponentPropsWithoutRef<'nav'> & {
  homePath?: string;
  showHome?: boolean;
  items: BreadcrumbItem[];
};
