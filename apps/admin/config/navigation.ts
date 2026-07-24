import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileSearch,
  FileUser,
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
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'teacher'],
  },
  {
    label: 'Santri',
    href: '/dashboard/students',
    icon: Users,
    roles: ['admin', 'teacher'],
  },
  {
    label: 'Laporan Santri',
    href: '/dashboard/attendance/reports',
    icon: FileUser,
    roles: ['admin'],
  },
  {
    label: 'Laporan Ustad',
    href: '/dashboard/attendance/teachers',
    icon: FileSearch,
    roles: ['admin'],
  },
  {
    label: 'Kelas',
    href: '/dashboard/classes',
    icon: BookOpen,
    roles: ['admin'],
  },
  {
    label: 'Ustad',
    href: '/teachers',
    icon: GraduationCap,
    roles: ['admin'],
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Absensi',
    href: '/dashboard/attendance',
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
