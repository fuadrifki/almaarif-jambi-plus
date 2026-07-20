export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  SICK: 'SICK',
  PERMISSION: 'PERMISSION',
  ABSENT: 'ABSENT',
} as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export const ORIGINAL_TEACHER_STATUS = {
  PERMISSION: 'PERMISSION',
  SICK: 'SICK',
  OFFICIAL_DUTY: 'OFFICIAL_DUTY',
  ABSENT: 'ABSENT',
  OTHER: 'OTHER',
} as const;

export type OriginalTeacherStatus =
  (typeof ORIGINAL_TEACHER_STATUS)[keyof typeof ORIGINAL_TEACHER_STATUS];

export type AttendanceSession = {
  id: number;
  teacherId: number;
  classId: number;
  subjectId: number;
  scheduleId: number;
  date: string;
  time: string;
  originalTeacherStatus: OriginalTeacherStatus | null;
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
