import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  unique,
} from 'drizzle-orm/pg-core';

export const classes = pgTable(
  'classes',
  {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    level: integer('level').notNull(),
    academicLevel: varchar('academic_level', { length: 100 }).notNull(),
    gender: varchar('gender', { length: 50 }).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    codeIdx: index('idx_classes_code').on(table.code),
    nameIdx: index('idx_classes_name').on(table.name),
    levelIdx: index('idx_classes_level').on(table.level),
    academicLevelIdx: index('idx_classes_academic_level').on(table.academicLevel),
    genderIdx: index('idx_classes_gender').on(table.gender),
    uniqueCodeIndex: unique('unique_code').on(table.code),
  }),
);
