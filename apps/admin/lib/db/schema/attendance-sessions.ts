import { index, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const attendanceSessions = pgTable(
  'attendance_sessions',
  {
    id: serial('id').primaryKey(),
    teacherId: integer('teacher_id').notNull(),
    classId: integer('class_id').notNull(),
    subjectId: integer('subject_id').notNull(),
    scheduleId: integer('schedule_id').notNull(),
    date: varchar('date', { length: 10 }).notNull(),
    time: varchar('time', { length: 5 }).notNull(),
    scheduledTeacherId: integer('scheduled_teacher_id'),
    scheduledTeacherStatus: varchar('scheduled_teacher_status', { length: 20 }).notNull(),
    substituteNotes: text('substitute_notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    classDateIdx: index('idx_attendance_sessions_class_date').on(table.classId, table.date),
    teacherIdIdx: index('idx_attendance_sessions_teacher_id').on(table.teacherId),
  }),
);
