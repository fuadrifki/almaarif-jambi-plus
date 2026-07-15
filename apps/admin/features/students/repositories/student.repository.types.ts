import type { Student } from '../types';

export type StudentRepository = {
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | null>;
  findByNis(nis: string): Promise<Student | null>;
  create(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student>;
  update(
    id: string,
    data: Partial<Omit<Student, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Student | null>;
  delete(id: string): Promise<boolean>;
  search(query: string): Promise<Student[]>;
};
