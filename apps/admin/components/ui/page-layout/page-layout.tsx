import { cn } from '@/lib';

import type {
  PageLayoutContentProps,
  PageLayoutFooterProps,
  PageLayoutHeaderProps,
  PageLayoutProps,
} from './page-layout.types';

const PageLayoutRoot = ({ className, ...props }: PageLayoutProps) => (
  <div
    className={cn('flex flex-1 min-h-0 flex-col overflow-hidden gap-y-4', className)}
    {...props}
  />
);

const PageLayoutHeader = ({ className, ...props }: PageLayoutHeaderProps) => (
  <div className={cn('shrink-0 space-y-4 px-4', className)} {...props} />
);

const PageLayoutContent = ({ className, ...props }: PageLayoutContentProps) => (
  <div className={cn('flex-1 min-h-0 overflow-y-auto px-4 pb-4', className)} {...props} />
);

const PageLayoutFooter = ({ className, ...props }: PageLayoutFooterProps) => (
  <div className={cn('shrink-0 px-4', className)} {...props} />
);

export const PageLayout = Object.assign(PageLayoutRoot, {
  Header: PageLayoutHeader,
  Content: PageLayoutContent,
  Footer: PageLayoutFooter,
});
