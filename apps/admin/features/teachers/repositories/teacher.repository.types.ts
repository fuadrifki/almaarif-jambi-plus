import type { Teacher } from '../types';

export type TeacherRepository = {
  findAll(): Promise<Teacher[]>;
  findById(id: number): Promise<Teacher | null>;
};
