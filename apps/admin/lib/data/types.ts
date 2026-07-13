import type { Student } from '@/features/students/types';
import type { AttendanceSession, AttendanceRecord } from '@/features/attendance/types';

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

export type AttendanceSessionRepository = {
  findAll(): Promise<AttendanceSession[]>;
  findById(id: string): Promise<AttendanceSession | null>;
  findByClassAndDate(classId: string, date: string): Promise<AttendanceSession[]>;
  findByTeacherId(teacherId: string): Promise<AttendanceSession[]>;
  create(
    data: Omit<AttendanceSession, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AttendanceSession>;
  update(
    id: string,
    data: Partial<Omit<AttendanceSession, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<AttendanceSession | null>;
  delete(id: string): Promise<boolean>;
};

export type AttendanceRecordRepository = {
  findBySessionId(sessionId: string): Promise<AttendanceRecord[]>;
  findByStudentId(studentId: string): Promise<AttendanceRecord[]>;
  create(data: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<AttendanceRecord>;
  createBatch(
    records: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<AttendanceRecord[]>;
  deleteBySessionId(sessionId: string): Promise<boolean>;
};
