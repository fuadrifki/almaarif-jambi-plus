'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleEllipsis } from 'lucide-react';

import { Surface } from '@/components/ui';
import { getNavigationForRole, MOBILE_MAX_PRIMARY_ITEMS } from '@/config/navigation';
import { cn } from '@/lib';

import type { NavigationItem } from '@/config/navigation';
import type { UserRole } from '@/lib/types/user';

type MobileNavProps = {
  role: UserRole;
};

export const MobileNav = ({ role }: MobileNavProps) => {
  const pathname = usePathname();
  const items = getNavigationForRole(role);
  const primary = items.slice(0, MOBILE_MAX_PRIMARY_ITEMS);
  const hasOverflow = items.length > MOBILE_MAX_PRIMARY_ITEMS;

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  const renderItem = (item: NavigationItem) => {
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={item.disabled ? '#' : item.href}
        aria-disabled={item.disabled}
        className={cn(
          'ads-mobile-nav-item flex flex-col items-center justify-center',
          item.disabled && 'ads-nav-item--disabled',
          active && 'ads-mobile-nav-item--active',
        )}
      >
        <item.icon size={20} />

        <span className="text-center">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <Surface className="flex items-stretch rounded-none border-t border-white/10 px-0 py-0">
        {primary.map(renderItem)}

        {hasOverflow && (
          <Link
            href="/dashboard/more"
            className={cn(
              'ads-mobile-nav-item flex flex-col items-center justify-center',
              isActive('/dashboard/more') && 'ads-mobile-nav-item--active',
            )}
          >
            <CircleEllipsis size={20} />

            <span className="text-center">Lainnya</span>
          </Link>
        )}
      </Surface>
    </div>
  );
};
