export type AttendanceReportFilter = {
  search?: string;
  date?: string;
  month?: string;
  classId?: number;
  teacherId?: number;
  subjectId?: number;
  status?: string;
};

export type AttendanceReportRow = {
  date: string;
  sessionId: number;
  subjectId: number;
  teacherId: number;
  studentId: number;
  studentName: string;
  studentNis: string;
  studentClassId: number;
  className: string;
  status: string | null;
  notes: string | null;
};

export type AttendanceReportSummaryRow = {
  status: string | null;
  count: number;
};

export type AttendanceReportRepository = {
  findReportRows(filter: AttendanceReportFilter): Promise<AttendanceReportRow[]>;
  findReportSummary(filter: AttendanceReportFilter): Promise<AttendanceReportSummaryRow[]>;
};
