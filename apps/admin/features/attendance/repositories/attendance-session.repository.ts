import { getDb } from '@/lib/db/client';
import type { AttendanceSession } from '../types';
import type { AttendanceSessionRepository } from './attendance-session.repository.types';
import { attendanceSessions } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

const toSession = (row: typeof attendanceSessions.$inferSelect): AttendanceSession => ({
  id: row.id,
  teacherId: row.teacherId,
  scheduledTeacherId: row.scheduledTeacherId,
  classId: row.classId,
  subjectId: row.subjectId,
  scheduleId: row.scheduleId,
  date: row.date,
  time: row.time,
  scheduledTeacherStatus: row.scheduledTeacherStatus,
  substituteNotes: row.substituteNotes,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

export const attendanceSessionRepository: AttendanceSessionRepository = {
  async findAll() {
    const rows = await getDb().select().from(attendanceSessions);
    return rows.map(toSession);
  },

  async findById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return null;
    }
    const [row] = await getDb()
      .select()
      .from(attendanceSessions)
      .where(eq(attendanceSessions.id, numericId));
    return row ? toSession(row) : null;
  },

  async findByClassAndDate(classId, date) {
    const rows = await getDb()
      .select()
      .from(attendanceSessions)
      .where(and(eq(attendanceSessions.classId, classId), eq(attendanceSessions.date, date)));
    return rows.map(toSession);
  },

  async findByTeacherId(teacherId) {
    const rows = await getDb()
      .select()
      .from(attendanceSessions)
      .where(eq(attendanceSessions.teacherId, teacherId));
    return rows.map(toSession);
  },

  async create(data) {
    const [row] = await getDb().insert(attendanceSessions).values(data).returning();
    return toSession(row);
  },

  async update(id, data) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return null;
    }
    const [row] = await getDb()
      .update(attendanceSessions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(attendanceSessions.id, numericId))
      .returning();
    return row ? toSession(row) : null;
  },

  async delete(id) {
    const numericId = Number(id);
    const result = await getDb()
      .delete(attendanceSessions)
      .where(eq(attendanceSessions.id, numericId));
    return result.rowCount > 0;
  },
};
