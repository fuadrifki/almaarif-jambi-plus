import { teacherAttendanceRepository } from '../../repositories/teacher-attendance.repository';
import { TeacherAttendanceFilter } from '../../repositories/teacher-attendance.repository.types';
import { TeacherAttendanceResult, TeacherAttendanceRow } from './types';

export const getTeacherAttendanceReport = async (
  filter: TeacherAttendanceFilter,
): Promise<TeacherAttendanceResult> => {
  const [reportRows, summaryRows] = await Promise.all([
    teacherAttendanceRepository.findTeacherRows(filter),
    teacherAttendanceRepository.findTeacherSummary(filter),
  ]);

  if (reportRows.length === 0) {
    return {
      summary: {
        teacherId: 0,
        teacherName: '',
        totalClasses: 0,
        totalSubjects: 0,
        totalAttendanceSessions: 0,
        substituteCount: 0,
      },
      rows: [],
      total: 0,
    };
  }

  const summary = summaryRows[0] || {
    teacherId: 0,
    teacherName: '',
    totalClasses: 0,
    totalSubjects: 0,
    totalAttendanceSessions: 0,
    substituteCount: 0,
  };

  const rows: TeacherAttendanceRow[] = reportRows.map((row) => ({
    date: row.date,
    time: row.time,
    teacher: {
      id: row.teacherId,
      name: row.teacherName,
    },
    class: {
      id: row.classId,
      name: row.className,
      code: '',
      room: '',
      level: 0,
      academicLevel: '',
      gender: 'mixed',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    subject: {
      id: row.subjectId,
      label: row.subjectName,
    },
    totalStudents: row.totalClasses,
    totalClasses: row.totalClasses,
    substituteCount: row.substituteCount,
    attendanceStatus: row.attendanceStatus,
    notes: row.notes,
    scheduledTeacherStatus: row.scheduledTeacherStatus,
    substituteNotes: row.substituteNotes,
  }));

  return {
    summary,
    rows,
    total: rows.length,
  };
};
