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

export type TeacherAttendanceRepository = {
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

export type SessionRows = {
  id: number;
  teacherId: number;
  classId: number;
  className: string;
  subjectId: number;
  date: string;
  time: string;
  scheduledTeacherId: number | null;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  createdAt: Date;
};
