import { and, eq, inArray } from 'drizzle-orm';

import { getDb } from '@/lib/db/client';
import { attendanceRecords } from '@/lib/db/schema';
import { attendanceSessions } from '@/lib/db/schema';
import { students } from '@/lib/db/schema';

import type { AttendanceReportResult, ReportFilter } from './types';

const PAGE_SIZE = 10;

export const getAttendanceReport = async (
  filter: ReportFilter = {},
): Promise<AttendanceReportResult> => {
  const db = getDb();

  let baseStudentsQuery = db.select().from(students);
  let baseSessionsQuery = db.select().from(attendanceSessions);
  let baseRecordsQuery = db.select().from(attendanceRecords);

  if (filter.classId) {
    baseStudentsQuery = baseStudentsQuery.where(eq(students.classId, filter.classId));
    baseSessionsQuery = baseSessionsQuery.where(eq(attendanceSessions.classId, filter.classId));
    const sessions = await baseSessionsQuery;
    baseRecordsQuery = baseRecordsQuery.where(
      inArray(
        attendanceRecords.sessionId,
        sessions.map((s) => s.id),
      ),
    );
  }

  if (filter.date) {
    baseSessionsQuery = baseSessionsQuery.where(eq(attendanceSessions.date, filter.date));
    const sessions = await baseSessionsQuery;
    baseRecordsQuery = baseRecordsQuery.where(
      inArray(
        attendanceRecords.sessionId,
        sessions.map((s) => s.id),
      ),
    );
  }

  const [allStudents, allSessions, allRecords] = await Promise.all([
    baseStudentsQuery,
    baseSessionsQuery,
    baseRecordsQuery,
  ]);

  const studentsWithStatus = allStudents.map((student) => {
    const studentRecords = allRecords.filter((r) => r.studentId === student.id);

    if (studentRecords.length === 0) {
      return {
        student,
        attendanceStatus: null,
        time: null,
        session: null,
      };
    }

    const latestRecord = studentRecords.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];

    const session = allSessions.find((s) => s.id === latestRecord.sessionId);

    return {
      student,
      attendanceStatus: latestRecord.status,
      time: formatTime(latestRecord.createdAt),
      session: session
        ? `${session.date} ${session.time} (${formatTime(latestRecord.createdAt)})`
        : null,
    };
  });

  const filteredStudents = filter.classId
    ? studentsWithStatus.filter((s) => s.student.classId === filter.classId)
    : studentsWithStatus;

  const summary = {
    totalStudents: allStudents.length,
    present: allRecords.filter((r) => r.status === 'PRESENT').length,
    sick: allRecords.filter((r) => r.status === 'SICK').length,
    permission: allRecords.filter((r) => r.status === 'PERMISSION').length,
    absent: allRecords.filter((r) => r.status === 'ABSENT').length,
  };

  const page = filter.page || 1;
  const total = filteredStudents.length;
  const pageCount = Math.ceil(total / PAGE_SIZE);
  const offset = (page - 1) * PAGE_SIZE;
  const paginatedStudents = filteredStudents.slice(offset, offset + PAGE_SIZE);

  const rows = paginatedStudents.map((item) => ({
    student: item.student,
    attendanceStatus: item.attendanceStatus,
    time: item.time,
    session: item.session,
  }));

  return {
    summary,
    rows,
    pagination: {
      page,
      pageCount,
      total,
    },
  };
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
