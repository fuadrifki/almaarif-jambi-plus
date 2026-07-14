import { index, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const classes = pgTable(
  'classes',
  {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    codeIdx: index('idx_classes_code').on(table.code),
    nameIdx: index('idx_classes_name').on(table.name),
  }),
);
