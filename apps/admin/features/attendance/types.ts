import { SelectOption } from '@/components/ui';

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
  classId: number;
  subjectId: number;
  scheduleId: number;
  date: string;
  time: string;
  originalTeacherStatus: string;
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
