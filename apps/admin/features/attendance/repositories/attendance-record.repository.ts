import { getDb } from '@/lib/db/client';
import type { AttendanceRecord, AttendanceStatus } from '../types';
import type { AttendanceRecordRepository } from './attendance-record.repository.types';
import { attendanceRecords, attendanceSessions } from '@/lib/db/schema';
import { and, desc, eq, inArray } from 'drizzle-orm';

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

  async findHistoryByStudentId(studentId) {
    const numericId = Number(studentId);
    if (Number.isNaN(numericId)) {
      return [];
    }

    const rows = await getDb()
      .select({
        id: attendanceRecords.id,
        sessionId: attendanceRecords.sessionId,
        studentId: attendanceRecords.studentId,
        status: attendanceRecords.status,
        notes: attendanceRecords.notes,
        createdAt: attendanceRecords.createdAt,
        updatedAt: attendanceRecords.updatedAt,
        date: attendanceSessions.date,
        subjectId: attendanceSessions.subjectId,
        teacherId: attendanceSessions.teacherId,
      })
      .from(attendanceRecords)
      .innerJoin(attendanceSessions, eq(attendanceRecords.sessionId, attendanceSessions.id))
      .where(eq(attendanceRecords.studentId, numericId))
      .orderBy(desc(attendanceSessions.date), desc(attendanceRecords.createdAt));

    return rows.map((row) => ({
      id: row.id,
      sessionId: row.sessionId,
      studentId: row.studentId,
      status: row.status,
      notes: row.notes,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      date: row.date,
      subjectId: row.subjectId,
      teacherId: row.teacherId,
    }));
  },

  async findMonthlySummaryByStudentId(studentId, classId) {
    const numericStudentId = Number(studentId);
    const numericClassId = Number(classId);
    if (Number.isNaN(numericStudentId) || Number.isNaN(numericClassId)) {
      return [];
    }

    const db = getDb();

    const sessions = await db
      .select()
      .from(attendanceSessions)
      .where(eq(attendanceSessions.classId, numericClassId));

    const sessionIds = sessions.map((s) => s.id);

    const records =
      sessionIds.length > 0
        ? await db
            .select()
            .from(attendanceRecords)
            .where(
              and(
                eq(attendanceRecords.studentId, numericStudentId),
                inArray(attendanceRecords.sessionId, sessionIds),
              ),
            )
        : [];

    const recordsBySessionId = new Map<number, AttendanceRecord>();
    for (const record of records) {
      recordsBySessionId.set(record.sessionId, toRecord(record));
    }

    const monthMap = new Map<
      string,
      { present: number; sick: number; permission: number; absent: number; total: number }
    >();

    for (const session of sessions) {
      const month = session.date.substring(0, 7);

      if (!monthMap.has(month)) {
        monthMap.set(month, { present: 0, sick: 0, permission: 0, absent: 0, total: 0 });
      }

      const agg = monthMap.get(month)!;
      agg.total += 1;

      const record = recordsBySessionId.get(session.id);

      if (record) {
        switch (record.status) {
          case 'PRESENT':
            agg.present++;
            break;
          case 'SICK':
            agg.sick++;
            break;
          case 'PERMISSION':
            agg.permission++;
            break;
          case 'ABSENT':
            agg.absent++;
            break;
        }
      }
    }

    return Array.from(monthMap.entries())
      .map(([month, agg]) => ({
        month,
        present: agg.present,
        sick: agg.sick,
        permission: agg.permission,
        absent: agg.absent,
        notAttended: agg.total - (agg.present + agg.sick + agg.permission + agg.absent),
        totalSessions: agg.total,
      }))
      .sort((a, b) => b.month.localeCompare(a.month));
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
