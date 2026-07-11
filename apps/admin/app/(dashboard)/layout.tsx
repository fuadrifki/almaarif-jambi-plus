import type { ReactNode } from 'react';

import { Layout } from '@/components/ui';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Layout>{children}</Layout>;
}
