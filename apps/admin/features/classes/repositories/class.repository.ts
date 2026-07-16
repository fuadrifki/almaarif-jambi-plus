import { eq, sql } from 'drizzle-orm';

import { getDb } from '@/lib/db/client';
import { classes, students, attendanceSessions } from '@/lib/db/schema';

import type { Class } from '../types';
import type { ClassRepository } from './class.repository.types';

const toClass = (row: typeof classes.$inferSelect): Class => ({
  id: row.id,
  code: row.code,
  name: row.name,
  level: row.level,
  academicLevel: row.academicLevel,
  gender: row.gender as 'female' | 'male' | 'mixed',
  description: row.description,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

export const classRepository: ClassRepository = {
  async findAll() {
    const rows = await getDb().select().from(classes);

    return rows.map(toClass);
  },

  async findById(id) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return null;
    }

    const [row] = await getDb().select().from(classes).where(eq(classes.id, numericId));

    return row ? toClass(row) : null;
  },

  async findByCode(code) {
    const [row] = await getDb().select().from(classes).where(eq(classes.code, code));

    return row ? toClass(row) : null;
  },

  async create(data) {
    const [row] = await getDb().insert(classes).values(data).returning();

    return toClass(row);
  },

  async update(id, data) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return null;
    }

    const [row] = await getDb()
      .update(classes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(classes.id, numericId))
      .returning();

    return row ? toClass(row) : null;
  },

  async delete(id) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return false;
    }

    const result = await getDb().delete(classes).where(eq(classes.id, numericId));

    return result.rowCount > 0;
  },

  async checkReferenced(id) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return { students: 0, attendanceSessions: 0 };
    }

    const db = getDb();

    const [studentCount] = await db
      .select({ count: sql`count(*)` })
      .from(students)
      .where(eq(students.classId, numericId));

    const [attendanceSessionCount] = await db
      .select({ count: sql`count(*)` })
      .from(attendanceSessions)
      .where(eq(attendanceSessions.classId, numericId));

    return {
      students: Number(studentCount.count),
      attendanceSessions: Number(attendanceSessionCount.count),
    };
  },

  async search(query) {
    const lower = `%${query.toLowerCase()}%`;

    const rows = await getDb()
      .select()
      .from(classes)
      .where(sql`lower(${classes.name}) LIKE ${lower} OR ${classes.code} LIKE ${`%${query}%`}`);

    return rows.map(toClass);
  },
};
