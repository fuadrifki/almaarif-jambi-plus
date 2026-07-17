import { index, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const students = pgTable(
  'students',
  {
    id: serial('id').primaryKey(),
    nis: varchar('nis', { length: 20 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    classId: integer('class_id').notNull(),
    guardianName: varchar('guardian_name', { length: 225 }).notNull(),
    guardianPhone: varchar('guardian_phone', { length: 20 }).notNull(),
    address: text('address').notNull(),
    photoUrl: text('photo_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    nisIdx: index('idx_students_nis').on(table.nis),
    classIdIdx: index('idx_students_class_id').on(table.classId),
  }),
);
