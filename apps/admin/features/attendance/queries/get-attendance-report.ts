import { and, eq, inArray } from 'drizzle-orm';

import { getDb } from '@/lib/db/client';
import { attendanceRecords } from '@/lib/db/schema';
import { attendanceSessions } from '@/lib/db/schema';
import { students } from '@/lib/db/schema';

import type { AttendanceStatus } from '@/features/attendance/types';
import type { ReportFilter, AttendanceReportResult } from './types';

const PAGE_SIZE = 10;

type SessionRow = typeof attendanceSessions.$inferSelect;
type RecordRow = typeof attendanceRecords.$inferSelect;
type StudentRow = typeof students.$inferSelect;

export const getAttendanceReport = async (
  filter: ReportFilter = {},
): Promise<AttendanceReportResult> => {
  const db = getDb();

  const studentConditions = [];
  const sessionConditions = [];

  if (filter.classId) {
    studentConditions.push(eq(students.classId, filter.classId));
    sessionConditions.push(eq(attendanceSessions.classId, filter.classId));
  }

  if (filter.date) {
    sessionConditions.push(eq(attendanceSessions.date, filter.date));
  }

  const allStudents: StudentRow[] = studentConditions.length
    ? await db
        .select()
        .from(students)
        .where(and(...studentConditions))
    : await db.select().from(students);

  const sessions: SessionRow[] = sessionConditions.length
    ? await db
        .select()
        .from(attendanceSessions)
        .where(and(...sessionConditions))
    : await db.select().from(attendanceSessions);

  const sessionIds = sessions.map((s) => s.id);

  const allRecords: RecordRow[] = sessionIds.length
    ? await db
        .select()
        .from(attendanceRecords)
        .where(inArray(attendanceRecords.sessionId, sessionIds))
    : [];

  const studentsWithStatus = allStudents.map((student) => {
    const studentRecords = allRecords.filter((r) => r.studentId === student.id);

    if (studentRecords.length === 0) {
      return {
        student: toStudent(student),
        attendanceStatus: null,
        time: null,
        session: null,
      };
    }

    const latestRecord = studentRecords.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];

    const session = sessions.find((s) => s.id === latestRecord.sessionId);

    return {
      student: toStudent(student),
      attendanceStatus: latestRecord.status as AttendanceStatus,
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
    notAttended: allStudents.filter((s) => !allRecords.find((r) => r.studentId === s.id)).length,
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

const toStudent = (row: StudentRow) => ({
  id: row.id,
  nis: row.nis,
  name: row.name,
  classId: row.classId,
  room: row.room,
  guardianName: row.guardianName,
  guardianPhone: row.guardianPhone,
  address: row.address,
  photoUrl: row.photoUrl ?? null,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
