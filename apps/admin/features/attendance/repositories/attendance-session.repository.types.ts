import type { AttendanceSession } from '../types';

export type AttendanceSessionRepository = {
  findAll(): Promise<AttendanceSession[]>;
  findById(id: string): Promise<AttendanceSession | null>;
  findByClassAndDate(classId: string, date: string): Promise<AttendanceSession[]>;
  findByTeacherId(teacherId: number): Promise<AttendanceSession[]>;
  create(
    data: Omit<AttendanceSession, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AttendanceSession>;
  update(
    id: string,
    data: Partial<Omit<AttendanceSession, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<AttendanceSession | null>;
  delete(id: string): Promise<boolean>;
};
