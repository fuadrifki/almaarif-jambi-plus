import type { Student } from '@/features/students/types';
import type { StudentRepository } from './types';

import { getStore, generateStudentId } from './store';

export const studentRepository: StudentRepository = {
  findAll() {
    return getStore().students;
  },

  findById(id) {
    return getStore().students.find((s) => s.id === id) ?? null;
  },

  findByNis(nis) {
    return getStore().students.find((s) => s.nis === nis) ?? null;
  },

  create(data) {
    const student: Student = {
      ...data,
      id: generateStudentId(),
    };

    getStore().students.push(student);

    return student;
  },

  update(id, data) {
    const store = getStore();
    const index = store.students.findIndex((s) => s.id === id);

    if (index === -1) {
      return null;
    }

    store.students[index] = { ...store.students[index], ...data };

    return store.students[index];
  },

  delete(id) {
    const store = getStore();
    const index = store.students.findIndex((s) => s.id === id);

    if (index === -1) {
      return false;
    }

    store.students.splice(index, 1);

    return true;
  },

  search(query) {
    const lower = query.toLowerCase();

    return getStore().students.filter(
      (s) => s.name.toLowerCase().includes(lower) || s.nis.includes(query),
    );
  },
};
