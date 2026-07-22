export type TeacherAttendanceFilter = {
  search?: string;
  date?: string;
  month?: string;
  teacherId?: number;
  allDates?: boolean;
};

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
  statusLabel: string;
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
};

export type VirtualRow = {
  sessionId: number;
  teacherId: number;
  teacherName: string;
  role: 'REGULAR' | 'HELPER' | 'ORIGINAL' | 'SUBSTITUTE';
  classId: number;
  subjectId: number;
  date: string;
  time: string;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  substituteTeacherName: string | null;
};

export type TeacherNotes = {
  notes: string[];
  substituteTeachers: string[];
};

export type SessionRows = {
  id: number;
  teacherId: number;
  classId: number;
  subjectId: number;
  date: string;
  time: string;
  role?: string;
  scheduledTeacherId: number | null;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  createdAt: Date;
};
