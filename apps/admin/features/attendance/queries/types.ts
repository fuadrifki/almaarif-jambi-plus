import type { AttendanceStatus } from '@/features/attendance/types';
import type { Student } from '@/features/students/types';

export type ReportFilter = {
  classId?: number;
  date?: string;
  page?: number;
};

export type ReportSummary = {
  totalStudents: number;
  present: number;
  sick: number;
  permission: number;
  absent: number;
  notAttended: number;
};

export type ReportRow = {
  student: Student;
  attendanceStatus: AttendanceStatus | null;
  time: string | null;
  session: string | null;
};

export type AttendanceReportResult = {
  summary: ReportSummary;
  rows: ReportRow[];
  pagination: {
    page: number;
    pageCount: number;
    total: number;
  };
};
