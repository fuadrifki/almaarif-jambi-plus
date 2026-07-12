'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Badge, Surface } from '@/components/ui';
import { getNavigationForRole } from '@/config/navigation';

import type { UserRole } from '@/lib/types/user';

type SidebarProps = {
  role: UserRole;
};

export const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const items = getNavigationForRole(role);

  return (
    <Surface className="h-full space-y-3 p-4">
      {items.map(({ label, href, icon: Icon, disabled, badge }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={disabled ? '#' : href}
            aria-disabled={disabled}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
              disabled
                ? 'pointer-events-none cursor-default opacity-40'
                : isActive
                  ? 'bg-white/15 font-medium text-(--text-primary)'
                  : 'text-(--text-secondary) hover:bg-white/10 hover:text-(--text-primary)'
            }`}
          >
            <Icon size={18} />

            <span className="flex-1">{label}</span>

            {badge && <Badge variant={disabled ? 'default' : 'info'}>{badge}</Badge>}
          </Link>
        );
      })}
    </Surface>
  );
};
