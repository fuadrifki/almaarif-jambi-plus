import { getDb } from '@/lib/db/client';
import type { AttendanceRecord, AttendanceStatus } from '../types';
import type { AttendanceRecordRepository } from './attendance-record.repository.types';
import { attendanceRecords } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const toRecord = (row: typeof attendanceRecords.$inferSelect): AttendanceRecord => ({
  id: row.id,
  sessionId: row.sessionId,
  studentId: row.studentId,
  status: row.status as AttendanceStatus,
  notes: row.notes,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

export const attendanceRecordRepository: AttendanceRecordRepository = {
  async findBySessionId(sessionId) {
    const numericId = Number(sessionId);
    if (Number.isNaN(numericId)) {
      return [];
    }
    const rows = await getDb()
      .select()
      .from(attendanceRecords)
      .where(eq(attendanceRecords.sessionId, numericId));
    return rows.map(toRecord);
  },

  async findByStudentId(studentId) {
    const numericId = Number(studentId);
    if (Number.isNaN(numericId)) {
      return [];
    }
    const rows = await getDb()
      .select()
      .from(attendanceRecords)
      .where(eq(attendanceRecords.studentId, numericId));
    return rows.map(toRecord);
  },

  async create(data) {
    const [row] = await getDb()
      .insert(attendanceRecords)
      .values({
        sessionId: Number(data.sessionId),
        studentId: Number(data.studentId),
        status: data.status,
        notes: data.notes,
      })
      .returning();
    return toRecord(row);
  },

  async createBatch(records) {
    if (records.length === 0) {
      return [];
    }

    const values = records.map((data) => ({
      sessionId: Number(data.sessionId),
      studentId: Number(data.studentId),
      status: data.status,
      notes: data.notes,
    }));

    const rows = await getDb().insert(attendanceRecords).values(values).returning();
    return rows.map(toRecord);
  },

  async deleteBySessionId(sessionId) {
    const numericId = Number(sessionId);
    const result = await getDb()
      .delete(attendanceRecords)
      .where(eq(attendanceRecords.sessionId, numericId));
    return result.rowCount > 0;
  },
};
