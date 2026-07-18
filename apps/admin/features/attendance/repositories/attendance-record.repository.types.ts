import type { AttendanceRecord } from '../types';

export type AttendanceHistoryRow = {
  id: number;
  sessionId: number;
  studentId: number;
  status: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  date: string;
  subjectId: number;
  teacherId: number;
};

export type MonthlyAttendanceSummary = {
  month: string;
  present: number;
  sick: number;
  permission: number;
  absent: number;
  notAttended: number;
  totalSessions: number;
};

export type AttendanceRecordRepository = {
  findBySessionId(sessionId: number): Promise<AttendanceRecord[]>;
  findByStudentId(studentId: number): Promise<AttendanceRecord[]>;
  findHistoryByStudentId(studentId: number): Promise<AttendanceHistoryRow[]>;
  findMonthlySummaryByStudentId(
    studentId: number,
    classId: number,
  ): Promise<MonthlyAttendanceSummary[]>;
  create(data: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<AttendanceRecord>;
  createBatch(
    records: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<AttendanceRecord[]>;
  deleteBySessionId(sessionId: number): Promise<boolean>;
};
