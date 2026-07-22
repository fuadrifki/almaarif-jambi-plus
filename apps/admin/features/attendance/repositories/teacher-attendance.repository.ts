import { getDb } from '@/lib/db/client';
import { attendanceSessions, classes } from '@/lib/db/schema';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { and, desc, eq, ilike, like } from 'drizzle-orm';
import { format } from 'date-fns';

import type {
  SessionRows,
  TeacherAttendanceFilter,
  TeacherAttendanceRepository,
  TeacherAttendanceSummaryRow,
  TeacherNotes,
  VirtualRow,
} from './teacher-attendance.repository.types';

const TEACHER_MAP = new Map(TEACHERS.map((teacher) => [teacher.id, teacher.name]));

const STATUS_LABEL: Record<string, string> = {
  SICK: 'Sakit',
  PERMISSION: 'Izin',
  OFFICIAL_DUTY: 'Dinas',
  ABSENT: 'Alpha',
  OTHER: 'Lainnya',
};

const STATUS_PRIORITY: Record<string, number> = {
  SICK: 0,
  PERMISSION: 1,
  ABSENT: 2,
  OFFICIAL_DUTY: 3,
  OTHER: 4,
};

const buildConditions = (filter: TeacherAttendanceFilter) => {
  const conditions = [];

  if (filter.allDates) {
    // No date restriction
  } else if (filter.date) {
    conditions.push(eq(attendanceSessions.date, filter.date));
  } else if (filter.month) {
    conditions.push(like(attendanceSessions.date, `${filter.month}%`));
  } else {
    const today = format(new Date(), 'yyyy-MM-dd');
    conditions.push(eq(attendanceSessions.date, today));
  }

  if (filter.teacherId) {
    conditions.push(eq(attendanceSessions.teacherId, filter.teacherId));
  }

  if (filter.search) {
    const pattern = `%${filter.search}%`;
    conditions.push(ilike(attendanceSessions.substituteNotes, pattern));
  }

  return conditions;
};

const querySessions = async (filter: TeacherAttendanceFilter): Promise<SessionRows[]> => {
  const db = getDb();

  return db
    .select({
      id: attendanceSessions.id,
      teacherId: attendanceSessions.teacherId,
      classId: attendanceSessions.classId,
      className: classes.name,
      subjectId: attendanceSessions.subjectId,
      date: attendanceSessions.date,
      time: attendanceSessions.time,
      scheduledTeacherId: attendanceSessions.scheduledTeacherId,
      scheduledTeacherStatus: attendanceSessions.scheduledTeacherStatus,
      substituteNotes: attendanceSessions.substituteNotes,
      createdAt: attendanceSessions.createdAt,
    })
    .from(attendanceSessions)
    .innerJoin(classes, eq(classes.id, attendanceSessions.classId))
    .where(and(...buildConditions(filter)))
    .orderBy(desc(attendanceSessions.createdAt));
};

const generateVirtualRows = (sessions: SessionRows[]): VirtualRow[] => {
  const rows: VirtualRow[] = [];

  for (const session of sessions) {
    const teacherName = TEACHER_MAP.get(session.teacherId) ?? `Teacher #${session.teacherId}`;

    if (session.scheduledTeacherId === null) {
      rows.push({
        sessionId: session.id,
        teacherId: session.teacherId,
        teacherName,
        role: 'HELPER',
        classId: session.classId,
        subjectId: session.subjectId,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: null,
      });
    } else if (session.scheduledTeacherId === session.teacherId) {
      rows.push({
        sessionId: session.id,
        teacherId: session.teacherId,
        teacherName,
        role: 'REGULAR',
        classId: session.classId,
        subjectId: session.subjectId,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: null,
      });
    } else {
      const scheduledTeacherName =
        TEACHER_MAP.get(session.scheduledTeacherId) ?? `Teacher #${session.scheduledTeacherId}`;

      rows.push({
        sessionId: session.id,
        teacherId: session.scheduledTeacherId,
        teacherName: scheduledTeacherName,
        role: 'ORIGINAL',
        classId: session.classId,
        subjectId: session.subjectId,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: teacherName,
      });

      rows.push({
        sessionId: session.id,
        teacherId: session.teacherId,
        teacherName,
        role: 'SUBSTITUTE',
        classId: session.classId,
        subjectId: session.subjectId,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: scheduledTeacherName,
      });
    }
  }

  return rows;
};

const resolveStatus = (rows: VirtualRow[]): string => {
  let bestPriority = Infinity;
  let bestStatus = 'Hadir';

  for (const row of rows) {
    if (row.role === 'ORIGINAL') {
      const p = STATUS_PRIORITY[row.scheduledTeacherStatus] ?? 99;
      if (p < bestPriority) {
        bestPriority = p;
        bestStatus = STATUS_LABEL[row.scheduledTeacherStatus] ?? row.scheduledTeacherStatus;
      }
    }
  }

  if (bestPriority < Infinity) return bestStatus;

  const hasSubstitute = rows.some((r) => r.role === 'SUBSTITUTE');
  if (hasSubstitute) return 'Guru Pengganti';

  const hasHelper = rows.some((r) => r.role === 'HELPER');
  if (hasHelper) return 'Ditugaskan';

  return 'Hadir';
};

const resolveNotes = (rows: VirtualRow[]): TeacherNotes => {
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

  return {
    notes: [],
    substituteTeachers: [],
  };
};

const groupByTeacherAndDate = (
  virtualRows: VirtualRow[],
  filter: TeacherAttendanceFilter,
): TeacherAttendanceSummaryRow[] => {
  const groupMap = new Map<string, VirtualRow[]>();

  for (const row of virtualRows) {
    const groupKey =
      filter.month && !filter.date
        ? `${row.teacherId}::${row.date.substring(0, 7)}`
        : `${row.teacherId}::${row.date}`;

    const group = groupMap.get(groupKey) ?? [];
    group.push(row);
    groupMap.set(groupKey, group);
  }

  const summaries: TeacherAttendanceSummaryRow[] = [];

  for (const [, group] of groupMap) {
    const first = group[0];

    const teachingRows = group.filter((row) => row.role !== 'ORIGINAL');
    const uniqueClasses = new Set(teachingRows.map((row) => row.classId));
    const uniqueSubjects = new Set(teachingRows.map((row) => row.subjectId));
    const substituteCount = teachingRows.filter((row) => row.role === 'SUBSTITUTE').length;

    const status = resolveStatus(group);
    const notes = resolveNotes(group);

    const groupDate = filter.month && !filter.date ? first.date.substring(0, 7) : first.date;

    summaries.push({
      teacherId: first.teacherId,
      teacherName: first.teacherName,
      date: groupDate,
      time: first.time,
      role: first.role,
      totalClasses: uniqueClasses.size,
      totalSubjects: uniqueSubjects.size,
      totalTeaching: teachingRows.length,
      substituteCount,
      statusLabel: status,
      substituteNotes: notes,
    });
  }

  summaries.sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return a.teacherName.localeCompare(b.teacherName);
  });

  return summaries;
};

const computeOverallSummary = (summaries: TeacherAttendanceSummaryRow[]) => {
  let totalTeaching = 0;
  let substituteCount = 0;

  for (const s of summaries) {
    totalTeaching += s.totalTeaching;
    substituteCount += s.substituteCount;
  }

  return {
    totalClasses: summaries.reduce((acc, s) => acc + s.totalClasses, 0),
    totalSubjects: summaries.reduce((acc, s) => acc + s.totalSubjects, 0),
    totalTeaching,
    substituteCount,
  };
};

export const teacherAttendanceRepository: TeacherAttendanceRepository = {
  async findTeacherSummaries(filter) {
    const sessions = await querySessions(filter);
    const virtualRows = generateVirtualRows(sessions);
    return groupByTeacherAndDate(virtualRows, filter);
  },

  async findTeacherOverallSummary(filter) {
    const summaries = await teacherAttendanceRepository.findTeacherSummaries(filter);
    return computeOverallSummary(summaries);
  },
};
