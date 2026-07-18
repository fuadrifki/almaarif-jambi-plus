import { attendanceReportRepository } from '@/features/attendance/repositories';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';

import type { ReportFilter, AttendanceReportResult } from './types';

const teacherMap = new Map(TEACHERS.map((t) => [t.id, t.name]));
const subjectMap = new Map(SUBJECTS.map((s) => [s.id, s.label]));

export const getAttendanceReport = async (
  filter: ReportFilter,
): Promise<AttendanceReportResult> => {
  const [dbRows, summaryRows] = await Promise.all([
    attendanceReportRepository.findReportRows(filter),
    attendanceReportRepository.findReportSummary(filter),
  ]);

  const summary = {
    present: 0,
    sick: 0,
    excused: 0,
    absent: 0,
    notYetSubmitted: 0,
  };

  for (const row of summaryRows) {
    switch (row.status) {
      case 'PRESENT':
        summary.present = row.count;
        break;
      case 'SICK':
        summary.sick = row.count;
        break;
      case 'PERMISSION':
        summary.excused = row.count;
        break;
      case 'ABSENT':
        summary.absent = row.count;
        break;
      case null:
        summary.notYetSubmitted = row.count;
        break;
    }
  }

  const rows = dbRows.map((row) => ({
    date: row.date,
    student: {
      id: row.studentId,
      name: row.studentName,
      nis: row.studentNis,
      classId: row.studentClassId,
    },
    className: row.className,
    subjectName: subjectMap.get(row.subjectId) ?? `Subject #${row.subjectId}`,
    teacherName: teacherMap.get(row.teacherId) ?? `Teacher #${row.teacherId}`,
    status: row.status,
    notes: row.notes,
  }));

  return {
    summary,
    rows,
    total: rows.length,
  };
};
