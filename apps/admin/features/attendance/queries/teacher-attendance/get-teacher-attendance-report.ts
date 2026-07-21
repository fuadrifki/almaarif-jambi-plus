import { teacherAttendanceRepository } from '../../repositories/teacher-attendance.repository';
import { TeacherAttendanceFilter } from '../../repositories/teacher-attendance.repository.types';
import { TeacherAttendanceResult, TeacherAttendanceRow } from './types';

const STATUS_LABEL: Record<string, string> = {
  SICK: 'Sakit',
  PERMISSION: 'Izin',
  OFFICIAL_DUTY: 'Dinas',
  ABSENT: 'Alpha',
  OTHER: 'Lainnya',
};

const mapStatus = (role: string, scheduledTeacherStatus: string): string => {
  switch (role) {
    case 'REGULAR':
      return 'Hadir';
    case 'ORIGINAL':
      return STATUS_LABEL[scheduledTeacherStatus] ?? scheduledTeacherStatus;
    case 'SUBSTITUTE':
      return 'Guru Pengganti';
    case 'HELPER':
      return 'Guru Membantu';
    default:
      return scheduledTeacherStatus;
  }
};

const mapCatatan = (
  role: string,
  substituteNotes: string | null,
  substituteTeacherName: string | null,
): string => {
  switch (role) {
    case 'REGULAR':
    case 'HELPER':
      return '-';
    case 'ORIGINAL':
      return substituteNotes ?? '-';
    case 'SUBSTITUTE':
      return substituteTeacherName ? `Menggantikan ${substituteTeacherName}` : '-';
    default:
      return '-';
  }
};

export const getTeacherAttendanceReport = async (
  filter: TeacherAttendanceFilter,
): Promise<TeacherAttendanceResult> => {
  const [reportRows, summary] = await Promise.all([
    teacherAttendanceRepository.findTeacherRows(filter),
    teacherAttendanceRepository.findTeacherSummary(filter),
  ]);

  const rows: TeacherAttendanceRow[] = reportRows.map((row) => ({
    sessionId: row.sessionId,
    date: row.date,
    time: row.time,
    teacher: {
      id: row.teacherId,
      name: row.teacherName,
    },
    class: {
      id: row.classId,
      name: row.className,
    },
    subject: {
      id: row.subjectId,
      label: row.subjectName,
    },
    totalClasses: row.totalClasses,
    totalSubjects: row.totalSubjects,
    totalTeaching: row.totalTeaching,
    substituteCount: row.substituteCount,
    statusLabel: mapStatus(row.role, row.scheduledTeacherStatus),
    catatanLabel: mapCatatan(row.role, row.substituteNotes, row.substituteTeacherName),
  }));

  return {
    summary,
    rows,
    total: rows.length,
  };
};
