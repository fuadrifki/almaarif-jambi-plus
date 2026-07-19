import { getDb } from '@/lib/db/client';
import { attendanceSessions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

type ScheduleItem = {
  id: number;
  classId: number;
  day: string;
  time: string;
  subjectId: number;
  teacherId: number | null;
};

export const scheduleRepository = {
  async findByClassAndDate(classId: number, date: string) {
    const db = getDb();
    const dateStr = date ? date.toString() : '';
    const rows = await db
      .select()
      .from(attendanceSessions)
      .where(eq(attendanceSessions.classId, classId));
    return rows.map((row) => ({
      id: row.id,
      classId: row.classId,
      day: row.day || '',
      time: row.time || '',
      subjectId: row.subjectId,
      teacherId: row.teacherId,
    })) as ScheduleItem[];
  },
};
