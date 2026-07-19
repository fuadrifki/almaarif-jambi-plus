import type { Student } from '@/features/students/types';
import type { AttendanceReportFilter } from '../repositories/attendance-report.repository.types';

export type ReportFilter = AttendanceReportFilter;

export type ReportSummary = {
  present: number;
  sick: number;
  excused: number;
  absent: number;
  notYetSubmitted: number;
};

export type ReportRow = {
  date: string;
  student: Pick<Student, 'id' | 'name' | 'nis' | 'classId'>;
  className: string;
  subjectName: string;
  teacherName: string;
  status: string | null;
  notes: string | null;
};

export type AttendanceReportResult = {
  summary: ReportSummary;
  rows: ReportRow[];
  total: number;
};
