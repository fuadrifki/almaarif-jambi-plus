'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleEllipsis } from 'lucide-react';

import { Surface } from '@/components/ui';
import { getNavigationForRole } from '@/config/navigation';
import { cn } from '@/lib';

import type { NavigationItem } from '@/config/navigation';
import type { UserRole } from '@/lib/types/user';

const MAX_PRIMARY_ITEMS = 4;

type MobileNavProps = {
  role: UserRole;
};

export const MobileNav = ({ role }: MobileNavProps) => {
  const pathname = usePathname();
  const items = getNavigationForRole(role);
  const primary = items.slice(0, MAX_PRIMARY_ITEMS);
  const hasOverflow = items.length > MAX_PRIMARY_ITEMS;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const renderItem = (item: NavigationItem) => {
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={item.disabled ? '#' : item.href}
        aria-disabled={item.disabled}
        className={cn(
          'flex flex-1 flex-col items-center gap-1 py-2 text-[10px] transition',
          item.disabled
            ? 'pointer-events-none cursor-default opacity-40'
            : active
              ? 'text-(--text-primary)'
              : 'text-(--text-secondary)',
        )}
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

        {hasOverflow && (
          <Link
            href="/more"
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-2 text-[10px] transition',
              isActive('/more') ? 'text-(--text-primary)' : 'text-(--text-secondary)',
            )}
          >
            <CircleEllipsis size={20} />

            <span>Lainnya</span>
          </Link>
        )}
      </Surface>
    </div>
  );
};
