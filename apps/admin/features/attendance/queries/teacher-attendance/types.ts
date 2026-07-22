import {
  ResolvedTeacherStatus,
  TeacherNotes,
} from '../../repositories/teacher-attendance.repository.types';

export type TeacherAttendanceRow = {
  teacher: {
    id: number;
    name: string;
  };
  date: string;
  time: string;
  role: string;
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
  resolvedStatus: ResolvedTeacherStatus;
  substituteNotes: TeacherNotes;
};

export type TeacherAttendanceSummary = {
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
};

export type TeacherAttendanceResult = {
  summary: TeacherAttendanceSummary;
  rows: TeacherAttendanceRow[];
  total: number;
};
