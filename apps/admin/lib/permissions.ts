import type { UserRole } from '@/lib/types/user';

export type Permission = {
  role: UserRole;
  canViewStudents: boolean;
  canCreateStudent: boolean;
  canEditStudent: boolean;
  canDeleteStudent: boolean;
};

const PERMISSIONS: Record<UserRole, Permission> = {
  admin: {
    role: 'admin',
    canViewStudents: true,
    canCreateStudent: true,
    canEditStudent: true,
    canDeleteStudent: true,
  },
  teacher: {
    role: 'teacher',
    canViewStudents: true,
    canCreateStudent: false,
    canEditStudent: false,
    canDeleteStudent: false,
  },
};

export const getPermissions = (role: UserRole): Permission => {
  return PERMISSIONS[role];
};
