import { getDb } from '@/lib/db/client';
import { attendanceSessions, classes } from '@/lib/db/schema';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { and, desc, eq, like } from 'drizzle-orm';

import type {
  SessionRows,
  TeacherAttendanceFilter,
  TeacherAttendanceRepository,
  VirtualRow,
} from './teacher-attendance.repository.types';

const TEACHER_MAP = new Map(TEACHERS.map((teacher) => [teacher.id, teacher.name]));
const SUBJECT_MAP = new Map(SUBJECTS.map((subject) => [subject.id, subject.label]));

const buildConditions = (filter: TeacherAttendanceFilter) => {
  const conditions = [];

  if (filter.date) {
    conditions.push(eq(attendanceSessions.date, filter.date));
  } else if (filter.month) {
    conditions.push(like(attendanceSessions.date, `${filter.month}%`));
  }

  if (filter.teacherId) {
    conditions.push(eq(attendanceSessions.teacherId, filter.teacherId));
  }

  if (filter.classId) {
    conditions.push(eq(attendanceSessions.classId, filter.classId));
  }

  if (filter.subjectId) {
    conditions.push(eq(attendanceSessions.subjectId, filter.subjectId));
  }

  return conditions;
};

const querySessions = async (filter: TeacherAttendanceFilter): Promise<SessionRows[]> => {
  const conditions = buildConditions(filter);

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
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(attendanceSessions.createdAt));
};

const generateVirtualRows = (sessions: SessionRows[]): VirtualRow[] => {
  const rows: VirtualRow[] = [];

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
        scheduledTeacherId: null,
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
        scheduledTeacherId: session.scheduledTeacherId,
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
        scheduledTeacherId: session.scheduledTeacherId,
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
        scheduledTeacherId: session.scheduledTeacherId,
        scheduledTeacherStatus: session.scheduledTeacherStatus,
        substituteNotes: session.substituteNotes,
        substituteTeacherName: scheduledTeacherName,
        createdAt: session.createdAt,
      });
    }
  }

  return rows;
};

export const teacherAttendanceRepository: TeacherAttendanceRepository = {
  async findVirtualRows(filter) {
    const sessions = await querySessions(filter);
    return generateVirtualRows(sessions);
  },
};
