export type TeacherAttendanceRow = {
  teacher: {
    id: number;
    name: string;
  };
  date: string;
  time: string;
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
  statusLabel: string;
  substituteNotes: string;
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
