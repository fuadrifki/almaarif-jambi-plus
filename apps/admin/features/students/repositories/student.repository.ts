import { eq, like, or } from 'drizzle-orm';

import { getDb } from '@/lib/db/client';
import { students } from '@/lib/db/schema';

import type { Student } from '../types';
import type { StudentRepository } from './student.repository.types';

const toStudent = (row: typeof students.$inferSelect): Student => ({
  id: row.id,
  nis: row.nis,
  name: row.name,
  classId: row.classId,
  guardianName: row.guardianName,
  guardianPhone: row.guardianPhone,
  address: row.address,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

export const studentRepository: StudentRepository = {
  async findAll() {
    const rows = await getDb().select().from(students);

    return rows.map(toStudent);
  },

  async findById(id) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return null;
    }

    const [row] = await getDb().select().from(students).where(eq(students.id, numericId));

    return row ? toStudent(row) : null;
  },

  async findByNis(nis) {
    const [row] = await getDb().select().from(students).where(eq(students.nis, nis));

    return row ? toStudent(row) : null;
  },

  async create(data) {
    const [row] = await getDb().insert(students).values(data).returning();

    return toStudent(row);
  },

  async update(id, data) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return null;
    }

    const [row] = await getDb()
      .update(students)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(students.id, numericId))
      .returning();

    return row ? toStudent(row) : null;
  },

  async delete(id) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return false;
    }

    const result = await getDb().delete(students).where(eq(students.id, numericId));

    return result.rowCount > 0;
  },

  async search(query) {
    const lower = `%${query.toLowerCase()}%`;

    const rows = await getDb()
      .select()
      .from(students)
      .where(or(like(students.name, lower), like(students.nis, `%${query}%`)));

    return rows.map(toStudent);
  },
};
