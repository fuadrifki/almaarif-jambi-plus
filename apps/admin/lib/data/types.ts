import type { Student } from '@/features/students/types';
import type { Attendance } from '@/features/attendance/types';

export type StudentRepository = {
  findAll(): Student[];
  findById(id: string): Student | null;
  findByNis(nis: string): Student | null;
  create(student: Omit<Student, 'id'>): Student;
  update(id: string, data: Partial<Student>): Student | null;
  delete(id: string): boolean;
  search(query: string): Student[];
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
