import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const hasPermission = (
  permissions:
    | { canCreateStudent?: boolean; canEditStudent?: boolean; canDeleteStudent?: boolean }
    | undefined,
  action: 'create' | 'edit' | 'delete',
): boolean => {
  if (!permissions) return false;

  switch (action) {
    case 'create':
      return permissions.canCreateStudent || false;
    case 'edit':
      return permissions.canEditStudent || false;
    case 'delete':
      return permissions.canDeleteStudent || false;
    default:
      return false;
  }
};

export const generateClassName = (level: string, academicLevel: string, gender: string): string => {
  if (gender === 'male') {
    return `${level} ${academicLevel.toUpperCase()} PA`;
  } else if (gender === 'female') {
    return `${level} ${academicLevel.toUpperCase()} PI`;
  } else {
    return `${level} ${academicLevel.toUpperCase()}`;
  }
};
