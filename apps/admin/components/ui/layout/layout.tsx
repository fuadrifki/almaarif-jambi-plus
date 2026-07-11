import type { LayoutProps } from './layout.types';

import { Header } from '@/components/ui';

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" />

      <main className="p-6">{children}</main>
    </div>
  );
}
