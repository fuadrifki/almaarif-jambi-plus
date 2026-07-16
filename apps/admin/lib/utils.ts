import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const generateClassName = (level: string, academicLevel: string, gender: string): string => {
  if (gender === 'male') {
    return `${level} ${academicLevel.toUpperCase()} PA`;
  } else if (gender === 'female') {
    return `${level} ${academicLevel.toUpperCase()} PI`;
  } else {
    return `${level} ${academicLevel.toUpperCase()}`;
  }
};
