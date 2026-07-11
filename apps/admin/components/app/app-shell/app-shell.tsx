import type { AppShellProps } from './app-shell.types';

import { Sidebar } from '../sidebar/sidebar';
import { Header } from '@/components/ui';

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <Header title="Almaarif Admin" />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
