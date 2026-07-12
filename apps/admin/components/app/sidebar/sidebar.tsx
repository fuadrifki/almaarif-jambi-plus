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

export const Sidebar = () => (
  <Surface className="h-full space-y-3 p-4">
    {navigation.map(({ label, href }) => (
      <Link
        key={href}
        href={href}
        className="block rounded-xl px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-white/10 hover:text-(--text-primary)"
      >
        {label}
      </Link>
    ))}
  </Surface>
);
