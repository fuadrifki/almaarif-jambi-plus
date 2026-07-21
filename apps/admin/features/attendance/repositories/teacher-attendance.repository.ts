import { getDb } from '@/lib/db/client';
import { attendanceSessions, classes } from '@/lib/db/schema';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { and, desc, eq, ilike, like } from 'drizzle-orm';
import { format } from 'date-fns';

import type {
  TeacherAttendanceFilter,
  TeacherAttendanceRepository,
  TeacherAttendanceRow,
} from './teacher-attendance.repository.types';

const TEACHER_MAP = new Map(TEACHERS.map((teacher) => [teacher.id, teacher.name]));
const SUBJECT_MAP = new Map(SUBJECTS.map((subject) => [subject.id, subject.label]));

const buildConditions = (filter: TeacherAttendanceFilter) => {
  const conditions = [];

  if (filter.allDates) {
    // No date restriction — fetch all data
  } else if (filter.date) {
    conditions.push(eq(attendanceSessions.date, filter.date));
  } else if (filter.month) {
    conditions.push(like(attendanceSessions.date, `${filter.month}%`));
  } else {
    const today = format(new Date(), 'yyyy-MM-dd');
    conditions.push(eq(attendanceSessions.date, today));
  }

  if (filter.classId) {
    conditions.push(eq(attendanceSessions.classId, filter.classId));
  }

  if (filter.teacherId) {
    conditions.push(eq(attendanceSessions.teacherId, filter.teacherId));
  }

  if (filter.subjectId) {
    conditions.push(eq(attendanceSessions.subjectId, filter.subjectId));
  }

  if (filter.search) {
    const pattern = `%${filter.search}%`;
    conditions.push(ilike(attendanceSessions.substituteNotes, pattern));
  }

  return conditions;
};

const generateVirtualRows = (
  sessions: {
    id: number;
    teacherId: number;
    classId: number;
    className: string;
    subjectId: number;
    date: string;
    time: string;
    scheduledTeacherId: number | null;
    scheduledTeacherStatus: string;
    substituteNotes: string | null;
    createdAt: Date;
  }[],
): TeacherAttendanceRow[] => {
  const rows: Omit<
    TeacherAttendanceRow,
    'totalClasses' | 'totalSubjects' | 'totalTeaching' | 'substituteCount'
  >[] = [];

  for (const session of sessions) {
    const teacherName = TEACHER_MAP.get(session.teacherId) ?? `Teacher #${session.teacherId}`;
    const subjectName = SUBJECT_MAP.get(session.subjectId) ?? `Subject #${session.subjectId}`;

    if (session.scheduledTeacherId === null) {
      rows.push({
        sessionId: session.id,
        teacherId: session.teacherId,
        teacherName,
        role: 'HELPER',
        classId: session.classId,
        className: session.className,
        subjectId: session.subjectId,
        subjectName,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: null,
        createdAt: session.createdAt,
      });
    } else if (session.scheduledTeacherId === session.teacherId) {
      rows.push({
        sessionId: session.id,
        teacherId: session.teacherId,
        teacherName,
        role: 'REGULAR',
        classId: session.classId,
        className: session.className,
        subjectId: session.subjectId,
        subjectName,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: null,
        createdAt: session.createdAt,
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
        className: session.className,
        subjectId: session.subjectId,
        subjectName,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: teacherName,
        createdAt: session.createdAt,
      });

      rows.push({
        sessionId: session.id,
        teacherId: session.teacherId,
        teacherName,
        role: 'SUBSTITUTE',
        classId: session.classId,
        className: session.className,
        subjectId: session.subjectId,
        subjectName,
        date: session.date,
        time: session.time,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: scheduledTeacherName,
        createdAt: session.createdAt,
      });
    }
  }

  rows.sort((a, b) => {
    const dateCompare = b.createdAt.getTime() - a.createdAt.getTime();
    if (dateCompare !== 0) return dateCompare;
    return b.sessionId - a.sessionId;
  });

  const teacherStats = new Map<
    number,
    { classes: Set<number>; subjects: Set<number>; teaching: number; substitutes: number }
  >();

  for (const row of rows) {
    let stats = teacherStats.get(row.teacherId);
    if (!stats) {
      stats = { classes: new Set(), subjects: new Set(), teaching: 0, substitutes: 0 };
      teacherStats.set(row.teacherId, stats);
    }
    stats.classes.add(row.classId);
    stats.subjects.add(row.subjectId);
    stats.teaching++;
    if (row.role === 'SUBSTITUTE') {
      stats.substitutes++;
    }
  }

  return rows.map((row) => {
    const stats = teacherStats.get(row.teacherId)!;
    return {
      ...row,
      totalClasses: stats.classes.size,
      totalSubjects: stats.subjects.size,
      totalTeaching: stats.teaching,
      substituteCount: stats.substitutes,
    };
  });
};

const computeSummaryFromRows = (rows: TeacherAttendanceRow[]) => {
  const uniqueClasses = new Set(rows.map((r) => r.classId));
  const uniqueSubjects = new Set(rows.map((r) => r.subjectId));
  const substituteCount = rows.filter((r) => r.role === 'SUBSTITUTE').length;

  return {
    totalClasses: uniqueClasses.size,
    totalSubjects: uniqueSubjects.size,
    totalTeaching: rows.length,
    substituteCount,
  };
};

export const teacherAttendanceRepository: TeacherAttendanceRepository = {
  async findTeacherRows(filter) {
    const db = getDb();

    const sessions = await db
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
      .orderBy(desc(attendanceSessions.createdAt), desc(attendanceSessions.id));

    return generateVirtualRows(sessions);
  },

  async findTeacherSummary(filter) {
    const rows = await teacherAttendanceRepository.findTeacherRows(filter);
    return computeSummaryFromRows(rows);
  },
};
