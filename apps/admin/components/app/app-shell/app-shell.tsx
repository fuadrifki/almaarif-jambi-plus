import { Header } from '@/components/ui';
import { Logo } from '@almaarif/brand';
import { UserMenu } from '@/features/auth/components/user-menu';

import { MobileNav } from '../mobile-nav/mobile-nav';
import { Sidebar } from '../sidebar/sidebar';
import type { AppShellProps } from './app-shell.types';

export const AppShell = ({ children, user }: AppShellProps) => (
  <div className="app-layout">
    <header className="app-layout__header p-4">
      <Header
        title="Almaarif Admin"
        logo={<Logo width={50} height={30} />}
        actions={<UserMenu user={user} />}
      />
    </header>

    <aside className="app-layout__sidebar p-4">
      <Sidebar role={user.role} />
    </aside>

    <main className="app-layout__content p-4 mt-4">{children}</main>

    <MobileNav role={user.role} />
  </div>
);
