import { Header } from '@/components/ui';
import { Logo } from '@almaarif/brand';
import { UserMenu } from '@/features/auth/components/user-menu';
import { ThemeToggle } from '@/features/ads/components/theme-toggle';

import { MobileNav } from '../mobile-nav/mobile-nav';
import { Sidebar } from '../sidebar/sidebar';
import type { AppShellProps } from './app-shell.types';

export const AppShell = ({ children, user }: AppShellProps) => (
  <div className="app-layout gap-y-4">
    <header className="app-layout__header p-4">
      <Header
        title="Almaarif Dashboard"
        logo={<Logo width={50} height={30} />}
        actions={
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <UserMenu user={user} />
          </div>
        }
      />
    </header>

    <aside className="app-layout__sidebar p-4">
      <Sidebar role={user.role} />
    </aside>

    <main className="app-layout__content pb-4 px-4 mt-4">{children}</main>

    <MobileNav role={user.role} />
  </div>
);
