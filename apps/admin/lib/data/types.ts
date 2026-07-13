import type { Student } from '@/features/students/types';
import type { Attendance } from '@/features/attendance/types';

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

export type AttendanceRepository = {
  findAll(): Attendance[];
  findById(id: string): Attendance | null;
  findByStudentId(studentId: string): Attendance[];
  findByTeacherId(teacherId: string): Attendance[];
  findByClassAndDate(classId: string, date: string): Attendance[];
  create(attendance: Omit<Attendance, 'id'>): Attendance;
  createBatch(records: Omit<Attendance, 'id'>[]): Attendance[];
  deleteByStudentId(studentId: string): boolean;
};
