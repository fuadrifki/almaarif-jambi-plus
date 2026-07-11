import Link from 'next/link';
import { designNavigation } from './design-shell.navigation';
import type { DesignShellProps } from './design-shell.types';
import { Surface } from '@/components/ui';

export function DesignShell({ children }: DesignShellProps) {
  return (
    <div className="ads-layout gap-y-4">
      <header className="ads-layout__header p-4">
        <Surface className="flex h-16 items-center justify-between px-6">
          <span className="font-semibold">Almaarif Design System</span>
        </Surface>
      </header>

      <aside className="ads-layout__sidebar p-4">
        <Surface className="h-full p-4 space-y-3">
          {designNavigation.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-sm font-semibold">{group.title}</p>

              <div className="space-y-2">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-(--text-secondary) transition hover:text-(--text-primary)"
                  >
                    {item.label}
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
}
