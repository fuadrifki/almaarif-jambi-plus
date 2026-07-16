import type { Class } from '../types';

export type CreateClassData = {
  code: string;
  name: string;
  level: number;
  academicLevel: string;
  gender: 'male' | 'female' | 'mixed';
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateClassData = Partial<CreateClassData>;

export type ClassRepository = {
  findAll(): Promise<Class[]>;
  findById(id: string): Promise<Class | null>;
  findByCode(code: string): Promise<Class | null>;
  create(data: CreateClassData): Promise<Class>;
  update(id: string, data: UpdateClassData): Promise<Class | null>;
  delete(id: string): Promise<boolean>;
  checkReferenced(id: string): Promise<{ students: number; attendanceSessions: number }>;
  search(query: string): Promise<Class[]>;
};
