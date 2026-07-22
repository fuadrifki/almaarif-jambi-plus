import type { TeacherRole } from '../types';

export type TeacherAttendanceFilter = {
  search?: string;
  date?: string;
  month?: string;
  teacherId?: number;
  allDates?: boolean;
  classId?: number;
  subjectId?: number;
  attendanceStatus?: string;
  teachingRole?: TeacherRole;
};

export type ResolvedTeacherStatus =
  | { status: 'ABSENT'; scheduledTeacherStatus: string }
  | { status: 'SUBSTITUTE' }
  | { status: 'HELPER' }
  | { status: 'REGULAR' };

export type TeacherAttendanceSummaryRow = {
  teacherId: number;
  teacherName: string;
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

export type TeacherAttendanceOverallSummary = {
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
};

export type TeacherAttendanceRepository = {
  findTeacherSummaries(filter: TeacherAttendanceFilter): Promise<TeacherAttendanceSummaryRow[]>;
  findTeacherOverallSummary(
    filter: TeacherAttendanceFilter,
  ): Promise<TeacherAttendanceOverallSummary>;
  findVirtualRows(filter: TeacherAttendanceFilter): Promise<VirtualRow[]>;
};

export type VirtualRow = {
  sessionId: number;
  teacherId: number;
  teacherName: string;
  role: TeacherRole;
  classId: number;
  subjectId: number;
  className: string;
  subjectName: string;
  date: string;
  time: string;
  scheduledTeacherId: number | null;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  substituteTeacherName: string | null;
  createdAt: Date;
};

export type TeacherNotes = {
  notes: string[];
  substituteTeachers: string[];
};

export type SessionRows = {
  id: number;
  teacherId: number;
  classId: number;
  className: string;
  subjectId: number;
  date: string;
  time: string;
  role?: string;
  scheduledTeacherId: number | null;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  createdAt: Date;
};
