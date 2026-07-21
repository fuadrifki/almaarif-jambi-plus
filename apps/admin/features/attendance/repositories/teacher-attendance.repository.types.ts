export type TeacherAttendanceFilter = {
  search?: string;
  date?: string;
  month?: string;
  classId?: number;
  teacherId?: number;
  subjectId?: number;
  allDates?: boolean;
};

export type TeacherAttendanceRow = {
  sessionId: number;
  teacherId: number;
  teacherName: string;
  role: 'REGULAR' | 'HELPER' | 'ORIGINAL' | 'SUBSTITUTE';
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  date: string;
  time: string;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  substituteTeacherName: string | null;
  createdAt: Date;
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
};

export type TeacherAttendanceSummaryRow = {
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
};

export type TeacherAttendanceRepository = {
  findTeacherRows(filter: TeacherAttendanceFilter): Promise<TeacherAttendanceRow[]>;
  findTeacherSummary(filter: TeacherAttendanceFilter): Promise<TeacherAttendanceSummaryRow>;
};
