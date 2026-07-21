import { getDb } from '@/lib/db/client';
import { attendanceSessions, attendanceRecords, students, classes } from '@/lib/db/schema';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { and, asc, count, desc, eq, ilike, like, or, sql } from 'drizzle-orm';

import type {
  TeacherAttendanceFilter,
  TeacherAttendanceRepository,
} from './teacher-attendance.repository.types';

const TEACHER_MAP = new Map(TEACHERS.map((teacher) => [teacher.id, teacher.name]));
const SUBJECT_MAP = new Map(SUBJECTS.map((subject) => [subject.id, subject.label]));

const buildMonthConditions = (filter: TeacherAttendanceFilter) => {
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

  if (filter.search) {
    const pattern = `%${filter.search}%`;

    const searchCondition = or(ilike(students.name, pattern), ilike(students.nis, pattern));

    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  return conditions;
};

export const teacherAttendanceRepository: TeacherAttendanceRepository = {
  async findTeacherRows(filter) {
    const db = getDb();

    const rows = await db
      .select({
        teacherId: attendanceSessions.teacherId,
        classId: attendanceSessions.classId,
        className: classes.name,
        subjectId: attendanceSessions.subjectId,
        date: attendanceSessions.date,
        time: attendanceSessions.time,
        attendanceStatus: attendanceRecords.status,
        notes: attendanceRecords.notes,
        scheduledTeacherStatus: attendanceSessions.scheduledTeacherStatus,
        substituteNotes: attendanceSessions.substituteNotes,
        totalStudents: count(attendanceRecords.id),
      })
      .from(attendanceSessions)
      .innerJoin(classes, eq(classes.id, attendanceSessions.classId))
      .innerJoin(students, eq(students.classId, attendanceSessions.classId))
      .leftJoin(
        attendanceRecords,
        and(
          eq(attendanceRecords.sessionId, attendanceSessions.id),
          eq(attendanceRecords.studentId, students.id),
        ),
      )
      .where(and(...buildMonthConditions(filter)))
      .groupBy(
        attendanceSessions.id,
        attendanceSessions.teacherId,
        attendanceSessions.classId,
        attendanceSessions.subjectId,
        attendanceSessions.date,
        attendanceSessions.time,
        attendanceSessions.scheduledTeacherStatus,
        attendanceSessions.substituteNotes,
        attendanceRecords.status,
        attendanceRecords.notes,
        classes.name,
      )
      .orderBy(desc(attendanceSessions.date), asc(attendanceSessions.teacherId));

    return rows.map((row) => ({
      teacherId: row.teacherId,
      teacherName: TEACHER_MAP.get(row.teacherId) ?? `Teacher #${row.teacherId}`,
      classId: row.classId,
      className: row.className,
      subjectId: row.subjectId,
      subjectName: SUBJECT_MAP.get(row.subjectId) ?? `Subject #${row.subjectId}`,
      date: row.date,
      time: row.time,
      totalClasses: Number(row.totalStudents),
      substituteCount: 0, // TODO: hitung dari seed-schedule pada milestone berikutnya
      attendanceStatus: row.attendanceStatus,
      notes: row.notes,
      scheduledTeacherStatus: row.scheduledTeacherStatus,
      substituteNotes: row.substituteNotes,
    }));
  },

  async findTeacherSummary(filter) {
    const db = getDb();

    const rows = await db
      .select({
        teacherId: attendanceSessions.teacherId,
        totalAttendanceSessions: count(attendanceSessions.id),
        totalSubjects: sql<number>`count(distinct ${attendanceSessions.subjectId})`,
      })
      .from(attendanceSessions)
      .where(and(...buildMonthConditions(filter)))
      .groupBy(attendanceSessions.teacherId);

    return rows.map((row) => ({
      teacherId: row.teacherId,
      teacherName: TEACHER_MAP.get(row.teacherId) ?? `Teacher #${row.teacherId}`,
      totalClasses: Number(row.totalAttendanceSessions),
      totalSubjects: Number(row.totalSubjects),
      totalAttendanceSessions: Number(row.totalAttendanceSessions),
      substituteCount: 0,
    }));
  },
};
