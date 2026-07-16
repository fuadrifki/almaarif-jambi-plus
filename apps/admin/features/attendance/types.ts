export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  SICK: 'SICK',
  PERMISSION: 'PERMISSION',
  ABSENT: 'ABSENT',
} as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export type AttendanceSession = {
  id: number;
  teacherId: number;
  classId: number;
  subjectId: number;
  scheduleId: number;
  date: string;
  time: string;
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
