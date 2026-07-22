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
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
  statusLabel: string;
  substituteNotes: string;
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
