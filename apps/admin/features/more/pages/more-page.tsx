import Link from 'next/link';

import { PageLayout, Surface } from '@/components/ui';
import { getNavigationForRole, MOBILE_MAX_PRIMARY_ITEMS } from '@/config/navigation';
import { getSession } from '@/lib/auth';

import { LogoutButton } from '../components/logout-button';

import type { UserRole } from '@/lib/types/user';
import { UserCircle } from 'lucide-react';

export const MorePage = async () => {
  const session = await getSession();
  const role: UserRole = session?.role ?? 'admin';
  const allItems = getNavigationForRole(role);
  const items = allItems.slice(MOBILE_MAX_PRIMARY_ITEMS);

  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex flex-col w-full gap-y-6">
          <section>
            <h1 className="text-3xl font-semibold">Menu</h1>

            <p className="mt-2 text-secondary">Navigasi dan pengaturan akun.</p>
          </section>

          {session && (
            <Surface className="p-6">
              <div className="flex items-center gap-4">
                <UserCircle size={24} />

                <div>
                  <p className="text-base font-semibold text-primary">{session.name}</p>

                  <p className="text-xs text-secondary">{session.email}</p>

                  <p className="mt-0.5 text-xs capitalize text-secondary">{session.role}</p>
                </div>
              </div>
            </Surface>
          )}
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="flex flex-col w-full gap-y-6">
          <section className="space-y-2">
            <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-secondary">
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
                      : 'text-secondary hover:bg-white/5 hover:text-primary'
                  }`}
                >
                  <Icon size={18} />

                  <span className="flex-1">{label}</span>

                  {badge && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-secondary">
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
            </Surface>
          </section>

          <section className="space-y-2">
            <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              Akun
            </h2>

            <Surface className="p-2">
              <LogoutButton />
            </Surface>
          </section>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};
