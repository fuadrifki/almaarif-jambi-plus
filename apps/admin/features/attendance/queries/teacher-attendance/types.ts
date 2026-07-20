import type { Class } from '@/features/classes/types';

export type ReportSummary = {
  present: number;
  sick: number;
  excused: number;
  absent: number;
  notYetSubmitted: number;
};

export type TeacherAttendanceRow = {
  date: string;
  time: string;
  teacher: {
    id: number;
    name: string;
  };
  class: Class;
  subject: {
    id: number;
    label: string;
  };
  totalStudents: number;
  totalClasses: number;
  substituteCount: number;
  attendanceStatus: string | null;
  notes: string | null;
  originalTeacherStatus: string | null;
  substituteNotes: string | null;
};

export type TeacherAttendanceSummary = {
  teacherId: number;
  teacherName: string;
  totalClasses: number;
  totalSubjects: number;
  totalAttendanceSessions: number;
  substituteCount: number;
};

export type TeacherAttendanceResult = {
  summary: TeacherAttendanceSummary;
  rows: TeacherAttendanceRow[];
  total: number;
};
