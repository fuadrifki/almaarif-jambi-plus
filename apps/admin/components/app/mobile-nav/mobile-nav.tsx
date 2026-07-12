'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CircleEllipsis, LogOut, User } from 'lucide-react';

import { Surface } from '@/components/ui';
import { getNavigationForRole } from '@/config/navigation';
import { destroySession } from '@/features/auth/server';

import type { NavigationItem } from '@/config/navigation';
import type { UserRole } from '@/lib/types/user';

const MAX_PRIMARY_ITEMS = 4;

type MobileNavProps = {
  role: UserRole;
};

export const MobileNav = ({ role }: MobileNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const items = getNavigationForRole(role);
  const primary = items.slice(0, MAX_PRIMARY_ITEMS);
  const overflow = items.slice(MAX_PRIMARY_ITEMS);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await destroySession();

    router.push('/login');
    router.refresh();
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const renderItem = (item: NavigationItem) => {
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={item.disabled ? '#' : item.href}
        aria-disabled={item.disabled}
        className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] transition ${
          item.disabled
            ? 'pointer-events-none cursor-default opacity-40'
            : active
              ? 'text-(--text-primary)'
              : 'text-(--text-secondary)'
        }`}
      >
        <item.icon size={20} />

        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <Surface className="flex items-stretch rounded-none border-t border-white/10 px-0 py-0">
        {primary.map(renderItem)}

        {overflow.length > 0 && (
          <div className="relative flex flex-1" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[10px] text-(--text-secondary) transition hover:text-(--text-primary)"
            >
              <CircleEllipsis size={20} />

              <span>Lainnya</span>
            </button>

            {moreOpen && (
              <div className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-[#1a2433] p-2 shadow-lg">
                {overflow.map((item) => (
                  <Link
                    key={item.href}
                    href={item.disabled ? '#' : item.href}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      item.disabled
                        ? 'pointer-events-none cursor-default opacity-40'
                        : isActive(item.href)
                          ? 'bg-white/10 text-(--text-primary)'
                          : 'text-(--text-secondary) hover:bg-white/5 hover:text-(--text-primary)'
                    }`}
                  >
                    <item.icon size={16} />

                    <span className="flex-1">{item.label}</span>
                  </Link>
                ))}

                <hr className="my-1 border-white/10" />

                <button
                  type="button"
                  onClick={() => {
                    setMoreOpen(false);

                    void handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-white/5 hover:text-(--text-primary)"
                >
                  <User size={16} />

                  <span className="flex-1 text-left">Profil</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMoreOpen(false);

                    void handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-white/5"
                >
                  <LogOut size={16} />

                  <span className="flex-1 text-left">Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </Surface>
    </div>
  );
};
