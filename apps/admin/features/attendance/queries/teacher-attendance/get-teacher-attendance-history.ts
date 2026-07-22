'use server';

import { getDb } from '@/lib/db/client';
import { attendanceSessions, classes } from '@/lib/db/schema';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { desc, eq, or } from 'drizzle-orm';

type GetTeacherAttendanceHistoryParams = {
  teacherId: string;
};

export type TeacherAttendanceHistoryRow = {
  id: number;
  teacherId: number;
  classId: number;
  subjectId: number;
  scheduledTeacherId: number | null;
  scheduledTeacherStatus: string;
  substituteNotes: string | null;
  date: string;
  time: string;
  className: string;
  subject: string;
  role: 'REGULAR' | 'HELPER' | 'SUBSTITUTE';
  notes: string | null;
  createdAt: Date;
};

type GetTeacherAttendanceHistoryOutput = {
  rows: TeacherAttendanceHistoryRow[];
};

const SUBJECT_MAP = new Map(SUBJECTS.map((s) => [s.id, s.label]));

export const getTeacherAttendanceHistory = async ({
  teacherId,
}: GetTeacherAttendanceHistoryParams): Promise<GetTeacherAttendanceHistoryOutput> => {
  const numericId = Number(teacherId);

  if (Number.isNaN(numericId)) {
    return { rows: [] };
  }

  const sessions = await getDb()
    .select({
      id: attendanceSessions.id,
      teacherId: attendanceSessions.teacherId,
      classId: attendanceSessions.classId,
      subjectId: attendanceSessions.subjectId,
      date: attendanceSessions.date,
      time: attendanceSessions.time,
      scheduledTeacherId: attendanceSessions.scheduledTeacherId,
      scheduledTeacherStatus: attendanceSessions.scheduledTeacherStatus,
      substituteNotes: attendanceSessions.substituteNotes,
      createdAt: attendanceSessions.createdAt,
      className: classes.name,
    })
    .from(attendanceSessions)
    .innerJoin(classes, eq(classes.id, attendanceSessions.classId))
    .where(
      or(
        eq(attendanceSessions.teacherId, numericId),
        eq(attendanceSessions.scheduledTeacherId, numericId),
      ),
    )
    .orderBy(desc(attendanceSessions.createdAt), desc(attendanceSessions.id));

  const rows: TeacherAttendanceHistoryRow[] = sessions.map((session) => {
    const subject = SUBJECT_MAP.get(session.subjectId) ?? '-';

    let role: TeacherAttendanceHistoryRow['role'] = 'REGULAR';
    let notes = '';

    if (session.scheduledTeacherId === null) {
      role = 'HELPER';
      notes = '-';
    } else if (session.scheduledTeacherId === session.teacherId) {
      role = 'REGULAR';
      notes = '-';
    } else if (session.teacherId === numericId) {
      role = 'SUBSTITUTE';
    } else {
      role = 'REGULAR';
      notes = session.substituteNotes ?? '-';
    }

    return {
      id: session.id,
      teacherId: session.teacherId,
      classId: session.classId,
      subjectId: session.subjectId,
      scheduledTeacherId: session.scheduledTeacherId,
      scheduledTeacherStatus: session.scheduledTeacherStatus,
      substituteNotes: session.substituteNotes,
      date: session.date,
      time: session.time,
      className: session.className,
      subject: subject,
      role: role,
      notes: notes,
      createdAt: session.createdAt,
    };
  });

  return { rows };
};
