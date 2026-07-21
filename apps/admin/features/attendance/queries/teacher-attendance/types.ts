export type TeacherAttendanceRow = {
  sessionId: number;
  date: string;
  time: string;
  teacher: {
    id: number;
    name: string;
  };
  class: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    label: string;
  };
  totalClasses: number;
  totalSubjects: number;
  totalTeaching: number;
  substituteCount: number;
  statusLabel: string;
  catatanLabel: string;
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
