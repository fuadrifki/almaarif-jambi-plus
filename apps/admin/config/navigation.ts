import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Palette,
  Settings,
  Users,
  Wallet,
} from 'lucide-react';

import type { UserRole } from '@/lib/types/user';

export const MOBILE_MAX_PRIMARY_ITEMS = 4;

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
  disabled?: boolean;
  badge?: string;
};

export const navigation: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'teacher'],
  },
  {
    label: 'Siswa',
    href: '/students',
    icon: Users,
    roles: ['admin'],
  },
  {
    label: 'Kelas',
    href: '/classes',
    icon: BookOpen,
    roles: ['admin'],
  },
  {
    label: 'Laporan Absensi',
    href: '/attendance/reports',
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    label: 'Guru',
    href: '/teachers',
    icon: GraduationCap,
    roles: ['admin'],
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Absensi',
    href: '/attendance',
    icon: ClipboardCheck,
    roles: ['teacher'],
  },
  {
    label: 'Laporan',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin'],
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Keuangan',
    href: '/finance',
    icon: Wallet,
    roles: ['admin'],
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Pengaturan',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Design System',
    href: '/design',
    icon: Palette,
    roles: ['admin'],
  },
];

export const getNavigationForRole = (role: UserRole): NavigationItem[] => {
  return navigation.filter((item) => item.roles.includes(role));
};
