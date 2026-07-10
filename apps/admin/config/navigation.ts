import { LayoutDashboard, GraduationCap, ClipboardCheck, FileBarChart2 } from 'lucide-react';

export const navigation = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Santri',
    href: '/students',
    icon: GraduationCap,
  },
  {
    title: 'Absensi',
    href: '/attendance',
    icon: ClipboardCheck,
  },
  {
    title: 'Rekap',
    href: '/reports',
    icon: FileBarChart2,
  },
] as const;
