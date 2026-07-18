import { getDb } from '@/lib/db/client';
import { attendanceSessions, attendanceRecords, students, classes } from '@/lib/db/schema';
import { and, asc, count, desc, eq, isNull, like } from 'drizzle-orm';

import type {
  AttendanceReportFilter,
  AttendanceReportRow,
  AttendanceReportSummaryRow,
  AttendanceReportRepository,
} from './attendance-report.repository.types';

const buildMonthConditions = (filter: AttendanceReportFilter) => {
  const conditions = [like(attendanceSessions.date, `${filter.month}%`)];

  if (filter.classId) {
    conditions.push(eq(attendanceSessions.classId, filter.classId));
  }
  if (filter.teacherId) {
    conditions.push(eq(attendanceSessions.teacherId, filter.teacherId));
  }
  if (filter.subjectId) {
    conditions.push(eq(attendanceSessions.subjectId, filter.subjectId));
  }

  return conditions;
};

export const attendanceReportRepository: AttendanceReportRepository = {
  async findReportRows(filter) {
    const db = getDb();
    const conditions = buildMonthConditions(filter);

    if (filter.status === 'NOT_SUBMITTED') {
      conditions.push(isNull(attendanceRecords.status));
    } else if (filter.status) {
      conditions.push(eq(attendanceRecords.status, filter.status));
    }

    const rows = await db
      .select({
        date: attendanceSessions.date,
        sessionId: attendanceSessions.id,
        subjectId: attendanceSessions.subjectId,
        teacherId: attendanceSessions.teacherId,
        studentId: students.id,
        studentName: students.name,
        studentNis: students.nis,
        studentClassId: students.classId,
        className: classes.name,
        status: attendanceRecords.status,
        notes: attendanceRecords.notes,
      })
      .from(attendanceSessions)
      .innerJoin(students, eq(attendanceSessions.classId, students.classId))
      .leftJoin(
        attendanceRecords,
        and(
          eq(attendanceRecords.sessionId, attendanceSessions.id),
          eq(attendanceRecords.studentId, students.id),
        ),
      )
      .leftJoin(classes, eq(students.classId, classes.id))
      .where(and(...conditions))
      .orderBy(desc(attendanceSessions.date), asc(students.name));

    return rows.map((row) => ({
      date: row.date,
      sessionId: row.sessionId,
      subjectId: row.subjectId,
      teacherId: row.teacherId,
      studentId: row.studentId,
      studentName: row.studentName,
      studentNis: row.studentNis,
      studentClassId: row.studentClassId,
      className: row.className,
      status: row.status,
      notes: row.notes,
    }));
  },

  async findReportSummary(filter) {
    const db = getDb();
    const conditions = buildMonthConditions(filter);

    const rows = await db
      .select({
        status: attendanceRecords.status,
        count: count(),
      })
      .from(attendanceSessions)
      .innerJoin(students, eq(attendanceSessions.classId, students.classId))
      .leftJoin(
        attendanceRecords,
        and(
          eq(attendanceRecords.sessionId, attendanceSessions.id),
          eq(attendanceRecords.studentId, students.id),
        ),
      )
      .where(and(...conditions))
      .groupBy(attendanceRecords.status);

    return rows.map((row) => ({
      status: row.status,
      count: row.count,
    }));
  },
};
