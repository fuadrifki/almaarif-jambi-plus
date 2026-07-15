import type { AttendanceRecord, AttendanceStatus } from '../types';

export type AttendanceRecordRepository = {
  findBySessionId(sessionId: string): Promise<AttendanceRecord[]>;
  findByStudentId(studentId: string): Promise<AttendanceRecord[]>;
  create(data: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<AttendanceRecord>;
  createBatch(
    records: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<AttendanceRecord[]>;
  deleteBySessionId(sessionId: string): Promise<boolean>;
};
