import { index, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { attendanceSessions } from './attendance-sessions';

export const attendanceRecords = pgTable(
  'attendance_records',
  {
    id: serial('id').primaryKey(),
    sessionId: integer('session_id')
      .notNull()
      .references(() => attendanceSessions.id),
    studentId: integer('student_id').notNull(),
    status: varchar('status', { length: 20 }).notNull(),
    notes: text('notes').default('').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    sessionIdIdx: index('idx_attendance_records_session_id').on(table.sessionId),
    studentIdIdx: index('idx_attendance_records_student_id').on(table.studentId),
  }),
);
