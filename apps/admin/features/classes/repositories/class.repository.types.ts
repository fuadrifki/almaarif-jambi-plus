import type { Class } from '../types';

export type ClassRepository = {
  findAll(): Promise<Class[]>;
  findById(id: string): Promise<Class | null>;
  findByCode(code: string): Promise<Class | null>;
  create(data: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>): Promise<Class>;
  update(
    id: string,
    data: Partial<Omit<Class, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Class | null>;
  delete(id: string): Promise<boolean>;
  checkReferenced(id: string): Promise<{ students: number; attendanceSessions: number }>;
  search(query: string): Promise<Class[]>;
};
