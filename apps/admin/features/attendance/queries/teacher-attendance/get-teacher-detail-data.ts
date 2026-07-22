import { teacherAttendanceRepository } from '../../repositories/teacher-attendance.repository';
import { resolveAttendanceStatus } from '@/features/attendance/types';

import type { VirtualRow } from '../../repositories/teacher-attendance.repository.types';
import type { TeacherAttendanceSessionRow } from './get-teacher-attendance-session-list';
import type {
  TeacherAttendanceRow,
  TeacherAttendanceResult,
  TeacherAttendanceSummary,
} from './types';

export type TeacherDetailStats = {
  totalTeaching: number;
  totalSubstitute: number;
  totalHelper: number;
  totalSick: number;
  totalPermission: number;
  totalAbsent: number;
};

export type TeacherDetailData = {
  stats: TeacherDetailStats;
  sessionRows: TeacherAttendanceSessionRow[];
  report: TeacherAttendanceResult;
};

const STATUS_PRIORITY: Record<string, number> = {
  SICK: 0,
  PERMISSION: 1,
  ABSENT: 2,
  OFFICIAL_DUTY: 3,
  OTHER: 4,
};

const resolveStatus = (
  rows: VirtualRow[],
):
  | { status: 'ABSENT'; scheduledTeacherStatus: string }
  | { status: 'SUBSTITUTE' }
  | { status: 'HELPER' }
  | { status: 'REGULAR' } => {
  let bestPriority = Infinity;
  let bestScheduledTeacherStatus = '';

  for (const row of rows) {
    if (row.role === 'ORIGINAL') {
      const p = STATUS_PRIORITY[row.scheduledTeacherStatus] ?? 99;
      if (p < bestPriority) {
        bestPriority = p;
        bestScheduledTeacherStatus = row.scheduledTeacherStatus;
      }
    }
  }

  if (bestPriority < Infinity) {
    return { status: 'ABSENT', scheduledTeacherStatus: bestScheduledTeacherStatus };
  }

  if (rows.some((r) => r.role === 'SUBSTITUTE')) return { status: 'SUBSTITUTE' };
  if (rows.some((r) => r.role === 'HELPER')) return { status: 'HELPER' };
  return { status: 'REGULAR' };
};

const resolveNotes = (rows: VirtualRow[]): { notes: string[]; substituteTeachers: string[] } => {
  const originals = rows.filter((row) => row.role === 'ORIGINAL');
  const substitutes = rows.filter((row) => row.role === 'SUBSTITUTE');

  if (originals.length > 0) {
    return {
      notes: [
        ...new Set(
          originals
            .map((row) => row.substituteNotes?.trim())
            .filter((note): note is string => Boolean(note)),
        ),
      ],
      substituteTeachers: [
        ...new Set(
          originals
            .map((row) => row.substituteTeacherName)
            .filter((name): name is string => Boolean(name)),
        ),
      ],
    };
  }

  if (substitutes.length > 0) {
    return {
      notes: [],
      substituteTeachers: [
        ...new Set(
          substitutes
            .map((row) => row.substituteTeacherName)
            .filter((name): name is string => Boolean(name)),
        ),
      ],
    };
  }

  return { notes: [], substituteTeachers: [] };
};

const computeStats = (rows: VirtualRow[]): TeacherDetailStats => {
  let totalTeaching = 0;
  let totalSubstitute = 0;
  let totalHelper = 0;
  let totalSick = 0;
  let totalPermission = 0;
  let totalAbsent = 0;

  for (const row of rows) {
    if (row.role !== 'ORIGINAL') {
      totalTeaching++;
    }

    if (row.role === 'SUBSTITUTE') {
      totalSubstitute++;
    }

    if (row.role === 'HELPER') {
      totalHelper++;
    }

    if (row.role === 'ORIGINAL') {
      const status = resolveAttendanceStatus(row.role, row.scheduledTeacherStatus);
      if (status === 'SICK') totalSick++;
      else if (status === 'PERMISSION') totalPermission++;
      else totalAbsent++;
    }
  }

  return {
    totalTeaching,
    totalSubstitute,
    totalHelper,
    totalSick,
    totalPermission,
    totalAbsent,
  };
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

const groupByDate = (rows: VirtualRow[]): TeacherAttendanceRow[] => {
  const groupMap = new Map<string, VirtualRow[]>();

  for (const row of rows) {
    const group = groupMap.get(row.date) ?? [];
    group.push(row);
    groupMap.set(row.date, group);
  }

  const result: TeacherAttendanceRow[] = [];

  for (const [, group] of groupMap) {
    const first = group[0];
    const teachingRows = group.filter((row) => row.role !== 'ORIGINAL');
    const uniqueClasses = new Set(teachingRows.map((row) => row.classId));
    const uniqueSubjects = new Set(teachingRows.map((row) => row.subjectId));
    const substituteCount = teachingRows.filter((row) => row.role === 'SUBSTITUTE').length;

    result.push({
      teacher: { id: first.teacherId, name: first.teacherName },
      date: first.date,
      time: first.time,
      role: first.role,
      totalClasses: uniqueClasses.size,
      totalSubjects: uniqueSubjects.size,
      totalTeaching: teachingRows.length,
      substituteCount,
      resolvedStatus: resolveStatus(group),
      substituteNotes: resolveNotes(group),
    });
  }

  result.sort((a, b) => b.date.localeCompare(a.date));

  return result;
};

const computeReport = (rows: VirtualRow[]): TeacherAttendanceResult => {
  const reportRows = groupByDate(rows);

  const summary: TeacherAttendanceSummary = {
    totalClasses: reportRows.reduce((acc, r) => acc + r.totalClasses, 0),
    totalSubjects: reportRows.reduce((acc, r) => acc + r.totalSubjects, 0),
    totalTeaching: reportRows.reduce((acc, r) => acc + r.totalTeaching, 0),
    substituteCount: reportRows.reduce((acc, r) => acc + r.substituteCount, 0),
  };

  return { summary, rows: reportRows, total: reportRows.length };
};

export const getTeacherDetailData = async (teacherId: number): Promise<TeacherDetailData> => {
  const allRows = await teacherAttendanceRepository.findVirtualRows({
    allDates: true,
  });

  const rows = allRows.filter(
    (r) => r.teacherId === teacherId || r.scheduledTeacherId === teacherId,
  );

  const stats = computeStats(rows);
  const sessionRows = rows.map(mapToSessionRow);
  const report = computeReport(rows);

  return { stats, sessionRows, report };
};
