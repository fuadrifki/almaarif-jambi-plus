import Link from 'next/link';

import { Surface } from '@/components/ui';

import type { UserRole } from '@/lib/types/user';

type NavItem = {
  label: string;
  href: string;
};

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Siswa', href: '/students' },
  { label: 'Design System', href: '/design' },
];

const teacherNav: NavItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Absensi', href: '/attendance' },
  { label: 'Riwayat', href: '/attendance/history' },
];

const getNavigation = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'admin':
      return adminNav;
    case 'teacher':
      return teacherNav;
    default:
      return [];
  }
};

type SidebarProps = {
  role: UserRole;
};

export const Sidebar = ({ role }: SidebarProps) => {
  const navigation = getNavigation(role);

  return (
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
};
