import type { SelectOption } from '@/components/ui';

export type LookupItem = SelectOption;

export const CLASSES: LookupItem[] = [
  { value: 'class-1', label: 'Tahfidz A' },
  { value: 'class-2', label: 'Tahfidz B' },
  { value: 'class-3', label: 'Tahsin A' },
  { value: 'class-4', label: 'Tahsin B' },
];

export const SUBJECTS: LookupItem[] = [
  { value: 'subject-1', label: "Al-Qur'an" },
  { value: 'subject-2', label: 'Hadits' },
  { value: 'subject-3', label: 'Fiqh' },
  { value: 'subject-4', label: 'Akidah' },
];

export const TEACHERS: LookupItem[] = [
  { value: 'teacher-1', label: 'Ustadz Ahmad' },
  { value: 'teacher-2', label: 'Ustadzah Fatimah' },
  { value: 'teacher-3', label: 'Ustadz Muhammad' },
  { value: 'teacher-4', label: 'Ustadzah Aminah' },
];

export const ATTENDANCE_STATUSES = [
  { value: 'present', label: 'Hadir' },
  { value: 'sick', label: 'Sakit' },
  { value: 'permission', label: 'Izin' },
  { value: 'absent', label: 'Alpha' },
] as const;
