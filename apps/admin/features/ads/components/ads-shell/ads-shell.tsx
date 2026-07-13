import Link from 'next/link';
import { designNavigation } from './ads-shell.navigation';
import type { DesignShellProps } from './ads-shell.types';
import { Header, Surface } from '@/components/ui';
import { Logo } from '@almaarif/brand';
import { ThemeToggle } from '../theme-toggle';

export const DesignShell = ({ children }: DesignShellProps) => (
  <div className="ads-layout gap-y-4">
    <header className="app-layout__header p-4">
      <Header
        title="Almaarif Design System"
        logo={<Logo width={50} height={30} />}
        actions={
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        }
      />
    </header>

    <aside className="ads-layout__sidebar p-4">
      <Surface className="h-full p-4 space-y-3">
        {designNavigation.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-sm font-semibold">{group.title}</p>

            <div className="space-y-2">
              {group.items.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm text-secondary transition hover:text-primary"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Surface>
    </aside>

    <main className="ads-layout__content p-4 mt-4">{children}</main>
  </div>
);
