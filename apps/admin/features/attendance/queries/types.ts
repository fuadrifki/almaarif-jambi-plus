import type { Student } from '@/features/students/types';

export type ReportFilter = {
  month: string;
  classId?: number;
  teacherId?: number;
  subjectId?: number;
  status?: string;
};

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
