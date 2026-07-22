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

export const TEACHER_ROLE = {
  REGULAR: 'REGULAR',
  HELPER: 'HELPER',
  ORIGINAL: 'ORIGINAL',
  SUBSTITUTE: 'SUBSTITUTE',
} as const;

export type TeacherRole = (typeof TEACHER_ROLE)[keyof typeof TEACHER_ROLE];

export const resolveAttendanceStatus = (
  role: TeacherRole,
  scheduledTeacherStatus: string,
): AttendanceStatus => {
  if (role === 'ORIGINAL') {
    if (scheduledTeacherStatus === 'SICK') return ATTENDANCE_STATUS.SICK;
    if (scheduledTeacherStatus === 'PERMISSION') return ATTENDANCE_STATUS.PERMISSION;
    return ATTENDANCE_STATUS.ABSENT;
  }
  return ATTENDANCE_STATUS.PRESENT;
};

export const TEACHING_ROLE_CONFIG: Record<
  TeacherRole,
  { label: string; variant: 'success' | 'warning' | 'info' | 'danger' | 'default' }
> = {
  REGULAR: { label: 'Guru Mata Pelajaran', variant: 'success' },
  ORIGINAL: { label: 'Guru Mata Pelajaran', variant: 'success' },
  SUBSTITUTE: { label: 'Guru Pengganti', variant: 'info' },
  HELPER: { label: 'Ditugaskan', variant: 'success' },
};

export const TEACHING_ROLE_OPTIONS: SelectOption[] = [
  { label: 'Guru Mata Pelajaran', value: TEACHER_ROLE.REGULAR },
  { label: 'Guru Pengganti', value: TEACHER_ROLE.SUBSTITUTE },
  { label: 'Ditugaskan', value: TEACHER_ROLE.HELPER },
];

export const ATTENDANCE_SESSION_STATUS_OPTIONS: SelectOption[] = [
  { label: 'Hadir', value: ATTENDANCE_STATUS.PRESENT },
  { label: 'Sakit', value: ATTENDANCE_STATUS.SICK },
  { label: 'Izin', value: ATTENDANCE_STATUS.PERMISSION },
  { label: 'Alpha', value: ATTENDANCE_STATUS.ABSENT },
];

export const ATTENDANCE_SESSION_STATUS_CONFIG: Record<
  string,
  { label: string; variant: 'success' | 'warning' | 'info' | 'danger' | 'default' }
> = {
  SICK: { label: 'Sakit', variant: 'warning' },
  PERMISSION: { label: 'Izin', variant: 'info' },
  ABSENT: { label: 'Alpha', variant: 'danger' },
};
