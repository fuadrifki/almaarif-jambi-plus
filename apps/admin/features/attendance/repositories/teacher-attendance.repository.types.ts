export type TeacherAttendanceFilter = {
  search?: string;
  month?: string;
  classId?: number;
  teacherId?: number;
  subjectId?: number;
};

export type TeacherAttendanceRow = {
  teacherId: number;
  teacherName: string;
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  date: string;
  time: string;
  totalClasses: number;
  substituteCount: number;
  attendanceStatus: string | null;
  notes: string | null;
  originalTeacherStatus: string | null;
  substituteNotes: string | null;
};

export type TeacherAttendanceSummaryRow = {
  teacherId: number;
  teacherName: string;
  totalClasses: number;
  totalSubjects: number;
  totalAttendanceSessions: number;
  substituteCount: number;
};

export type TeacherAttendanceRepository = {
  findTeacherRows(filter: TeacherAttendanceFilter): Promise<TeacherAttendanceRow[]>;
  findTeacherSummary(filter: TeacherAttendanceFilter): Promise<TeacherAttendanceSummaryRow[]>;
};
