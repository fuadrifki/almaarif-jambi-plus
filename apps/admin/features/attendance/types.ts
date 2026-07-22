import { SelectOption } from '@/components/ui';
import { ReportRow } from './queries/types';
import { Class } from '../classes';

export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  SICK: 'SICK',
  PERMISSION: 'PERMISSION',
  ABSENT: 'ABSENT',
} as const;

export const ATTENDANCE_STATUS_OPTIONS: SelectOption[] = [
  { label: 'Hadir', value: ATTENDANCE_STATUS.PRESENT },
  { label: 'Sakit', value: ATTENDANCE_STATUS.SICK },
  { label: 'Alpha', value: ATTENDANCE_STATUS.ABSENT },
  { label: 'Izin', value: ATTENDANCE_STATUS.PERMISSION },
];

export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export type AttendanceSession = {
  id: number;
  teacherId: number;
  scheduledTeacherId: number | null;
  classId: number;
  subjectId: number;
  scheduleId: number;
  date: string;
  time: string;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AttendanceRecord = {
  id: number;
  sessionId: number;
  studentId: number;
  status: AttendanceStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Schedule = {
  id: number;
  teacherId: number | null;
  classId: number;
  subjectId: number;
  day: string;
  time: string;
};

export type ReportAttendanceTableProps = {
  rows: ReportRow[];
  classes: Class[];
  className?: string;
};

export const STATUS_CONFIG: Record<
  string,
  { variant: 'success' | 'warning' | 'info' | 'danger' | 'default'; label: string }
> = {
  PRESENT: { variant: 'success', label: 'Hadir' },
  SICK: { variant: 'warning', label: 'Sakit' },
  PERMISSION: { variant: 'info', label: 'Izin' },
  ABSENT: { variant: 'danger', label: 'Alpha' },
};

export const NOTES_LABEL: Record<string, string> = {
  ORIGINAL: 'Digantikan oleh : ',
  REGULAR: 'Guru mata pelajaran',
  SUBSTITUTE: 'Menggantikan :',
  HELPER: 'Ditugaskan',
};

export const ATTENDANCE_TEACHER_STATUS: Record<
  string,
  { label: string; variant: 'success' | 'warning' | 'info' | 'danger' }
> = {
  REGULAR: {
    label: 'Hadir',
    variant: 'success',
  },
  HELPER: {
    label: 'Ditugaskan',
    variant: 'success',
  },
  SUBSTITUTE: {
    label: 'Guru Pengganti',
    variant: 'success',
  },
};
