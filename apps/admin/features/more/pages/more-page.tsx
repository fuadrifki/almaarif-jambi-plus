import Link from 'next/link';

import { Surface } from '@/components/ui';
import { getNavigationForRole } from '@/config/navigation';
import { getSession } from '@/lib/auth';

import { LogoutButton } from '../components/logout-button';

import type { UserRole } from '@/lib/types/user';

export const MorePage = async () => {
  const session = await getSession();
  const role: UserRole = session?.role ?? 'admin';
  const items = getNavigationForRole(role);

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4">
      <section>
        <h1 className="text-3xl font-semibold">Menu</h1>

        <p className="mt-2 text-(--text-secondary)">Navigasi dan pengaturan akun.</p>
      </section>

      {session && (
        <Surface className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-sm font-medium text-(--text-primary)">
              {session.name
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-(--text-primary)">{session.name}</p>

              <p className="text-xs text-(--text-secondary)">{session.email}</p>

              <p className="mt-0.5 text-xs capitalize text-(--text-secondary)">{session.role}</p>
            </div>
          </div>
        </Surface>
      )}

      <section className="space-y-2">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
          Navigasi
        </h2>

        <Surface className="divide-y divide-white/10 p-2">
          {items.map(({ label, href, icon: Icon, disabled, badge }) => (
            <Link
              key={href}
              href={disabled ? '#' : href}
              aria-disabled={disabled}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                disabled
                  ? 'pointer-events-none cursor-default opacity-40'
                  : 'text-(--text-secondary) hover:bg-white/5 hover:text-(--text-primary)'
              }`}
            >
              <Icon size={18} />

              <span className="flex-1">{label}</span>

              {badge && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-(--text-secondary)">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </Surface>
      </section>

      <section className="space-y-2">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
          Akun
        </h2>

        <Surface className="p-2">
          <LogoutButton />
        </Surface>
      </section>
    </div>
  );
};
