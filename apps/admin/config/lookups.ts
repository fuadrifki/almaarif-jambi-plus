import type { SelectOption } from '@/components/ui';

export interface LookupItem extends SelectOption {
  class?: string;
}

export const ATTENDANCE_STATUSES = [
  { value: 'PRESENT', label: 'Hadir' },
  { value: 'SICK', label: 'Sakit' },
  { value: 'PERMISSION', label: 'Izin' },
  { value: 'ABSENT', label: 'Alpha' },
] as const;
