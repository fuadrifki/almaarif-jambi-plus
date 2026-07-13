export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  SICK: 'SICK',
  PERMISSION: 'PERMISSION',
  ABSENT: 'ABSENT',
} as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export type AttendanceSession = {
  id: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  date: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AttendanceRecord = {
  id: string;
  sessionId: string;
  studentId: string;
  status: AttendanceStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};
