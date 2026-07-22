import { teacherAttendanceRepository } from '../../repositories/teacher-attendance.repository';
import type { TeacherAttendanceFilter } from '../../repositories/teacher-attendance.repository.types';
import type { TeacherAttendanceResult, TeacherAttendanceRow } from './types';

export const getTeacherAttendanceReport = async (
  filter: TeacherAttendanceFilter,
): Promise<TeacherAttendanceResult> => {
  const [summaries, overallSummary] = await Promise.all([
    teacherAttendanceRepository.findTeacherSummaries(filter),
    teacherAttendanceRepository.findTeacherOverallSummary(filter),
  ]);

  const rows: TeacherAttendanceRow[] = summaries.map((row) => ({
    teacher: {
      id: row.teacherId,
      name: row.teacherName,
    },
    date: row.date,
    time: row.time,
    totalClasses: row.totalClasses,
    totalSubjects: row.totalSubjects,
    totalTeaching: row.totalTeaching,
    substituteCount: row.substituteCount,
    statusLabel: row.statusLabel,
    substituteNotes: row.substituteNotes,
  }));

  return {
    summary: overallSummary,
    rows,
    total: rows.length,
  };
};
