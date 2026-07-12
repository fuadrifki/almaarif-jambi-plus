import Link from 'next/link';

import { Surface } from '@/components/ui';

const navigation = [
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Design System',
    href: '/design',
  },
  {
    label: 'Users',
    href: '/users',
  },
  {
    label: 'Settings',
    href: '/settings',
  },
];

export function Sidebar() {
  return (
    <Surface className="h-full space-y-3 p-4">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-xl px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-white/10 hover:text-(--text-primary)"
        >
          {item.label}
        </Link>
      ))}
    </Surface>
  );
}
