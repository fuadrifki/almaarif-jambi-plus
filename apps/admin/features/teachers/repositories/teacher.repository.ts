import { TEACHERS } from '@/lib/db/seed-teachers';

import type { Teacher } from '../types';
import type { TeacherRepository } from './teacher.repository.types';

export const teacherRepository: TeacherRepository = {
  async findAll() {
    return TEACHERS.filter((t) => t.role === 'teacher') as Teacher[];
  },

  async findById(id) {
    return (
      (TEACHERS.find((t) => t.id === id && t.role === 'teacher') as Teacher | undefined) ?? null
    );
  },
};
