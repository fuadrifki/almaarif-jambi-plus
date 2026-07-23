import { teacherAttendanceRepository } from '../../repositories/teacher-attendance.repository';
import { resolveAttendanceStatus } from '@/features/attendance/types';

import type { VirtualRow } from '../../repositories/teacher-attendance.repository.types';
import type { TeacherAttendanceSessionRow } from './get-teacher-attendance-session-list';

export type TeacherMonthlyReportRow = {
  month: string;
  totalTeaching: number;
  present: number;
  sick: number;
  permission: number;
  absent: number;
  substitute: number;
  helper: number;
  attendancePercentage: number;
};

export type TeacherDetailData = {
  sessionRows: TeacherAttendanceSessionRow[];
  monthlyReport: TeacherMonthlyReportRow[];
};

const mapToSessionRow = (row: VirtualRow): TeacherAttendanceSessionRow => ({
  id: `${row.sessionId}-${row.teacherId}-${row.role}`,
  sessionId: row.sessionId,
  teacher: { id: row.teacherId, name: row.teacherName },
  date: row.date,
  time: row.time,
  className: row.className,
  subjectName: row.subjectName,
  attendanceStatus: resolveAttendanceStatus(row.role, row.scheduledTeacherStatus),
  teachingRole: row.role,
  scheduledTeacherStatus: row.scheduledTeacherStatus,
  notes: row.substituteNotes,
  substituteTeacherName: row.substituteTeacherName,
  createdAt: row.createdAt,
});

const computeMonthlySummary = (rows: VirtualRow[]): TeacherMonthlyReportRow[] => {
  const groupMap = new Map<string, VirtualRow[]>();

  for (const row of rows) {
    const month = row.date.substring(0, 7);

    const group = groupMap.get(month) ?? [];
    group.push(row);
    groupMap.set(month, group);
  }

  const result: TeacherMonthlyReportRow[] = [];

  for (const [month, group] of groupMap) {
    let present = 0;
    let sick = 0;
    let permission = 0;
    let absent = 0;
    let substitute = 0;
    let helper = 0;

    for (const row of group) {
      switch (row.role) {
        case 'REGULAR':
          present++;
          break;

        case 'SUBSTITUTE':
          substitute++;
          break;

        case 'HELPER':
          helper++;
          break;

        case 'ORIGINAL':
          switch (row.scheduledTeacherStatus) {
            case 'SICK':
              sick++;
              break;

            case 'PERMISSION':
              permission++;
              break;

            default:
              absent++;
              break;
          }
          break;
      }
    }

    const totalTeaching = present + substitute + helper;

    const totalSemua = totalTeaching + sick + permission + absent;

    const attendancePercentage = totalSemua > 0 ? (totalTeaching / totalSemua) * 100 : 0;

    result.push({
      month,
      totalTeaching,
      present,
      sick,
      permission,
      absent,
      substitute,
      helper,
      attendancePercentage,
    });
  }

  result.sort((a, b) => b.month.localeCompare(a.month));

  return result;
};

export const getTeacherDetailData = async (teacherId: number): Promise<TeacherDetailData> => {
  const allRows = await teacherAttendanceRepository.findVirtualRows({
    allDates: true,
  });

  const teacherRows = allRows.filter(
    (r) => r.teacherId === teacherId || r.scheduledTeacherId === teacherId,
  );

  const sessionRows = teacherRows.filter((r) => r.teacherId === teacherId).map(mapToSessionRow);

  const monthlyReport = computeMonthlySummary(teacherRows.filter((r) => r.teacherId === teacherId));

  return { sessionRows, monthlyReport };
};
