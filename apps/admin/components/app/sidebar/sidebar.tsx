'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Badge, Card } from '@/components/ui';
import { getNavigationForRole } from '@/config/navigation';
import { cn } from '@/lib';

import type { UserRole } from '@/lib/types/user';

type SidebarProps = {
  role: UserRole;
};

export const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const items = getNavigationForRole(role);

  return (
    <Card className="h-full space-y-3 p-4">
      {items.map(({ label, href, icon: Icon, disabled, badge }) => {
        const isActive =
          href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={disabled ? '#' : href}
            aria-disabled={disabled}
            className={cn(
              'ads-nav-item',
              disabled && 'ads-nav-item--disabled',
              isActive && !disabled && 'ads-nav-item--active',
            )}
          >
            <Icon size={18} />

            <span className="flex-1">{label}</span>

            {badge && <Badge variant={disabled ? 'default' : 'info'}>{badge}</Badge>}
          </Link>
        );
      })}
    </Card>
  );
};
