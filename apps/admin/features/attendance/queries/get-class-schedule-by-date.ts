import { getDb } from '@/lib/db/client';
import { attendanceSessions, classes, subjects, teachers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

type ScheduleQueryResult = {
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
  day: string;
  time: string;
};

export const getClassScheduleByDate = async (classId: number, date: string) => {
  const db = getDb();
  const dateStr = date || '';

  const rows = await db
    .select({
      classId: classes.id,
      className: classes.name,
      subjectId: attendanceSessions.subjectId,
      subjectName: subjects.label,
      teacherId: attendanceSessions.teacherId,
      teacherName: teachers.name,
      day: attendanceSessions.day,
      time: attendanceSessions.time,
    })
    .from(attendanceSessions)
    .innerJoin(classes, eq(attendanceSessions.classId, classes.id))
    .innerJoin(subjects, eq(attendanceSessions.subjectId, subjects.id))
    .innerJoin(teachers, eq(attendanceSessions.teacherId, teachers.id))
    .where(eq(attendanceSessions.classId, classId));

  return rows;
};
