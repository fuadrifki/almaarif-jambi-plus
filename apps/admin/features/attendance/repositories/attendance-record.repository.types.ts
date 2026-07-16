import type { AttendanceRecord } from '../types';

export type AttendanceRecordRepository = {
  findBySessionId(sessionId: number): Promise<AttendanceRecord[]>;
  findByStudentId(studentId: number): Promise<AttendanceRecord[]>;
  create(data: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<AttendanceRecord>;
  createBatch(
    records: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<AttendanceRecord[]>;
  deleteBySessionId(sessionId: number): Promise<boolean>;
};
