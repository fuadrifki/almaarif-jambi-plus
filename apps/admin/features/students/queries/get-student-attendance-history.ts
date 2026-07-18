'use server';

import { attendanceRecordRepository } from '@/features/attendance/repositories';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';

import type { AttendanceStatus } from '@/features/attendance/types';

type GetStudentAttendanceHistoryParams = {
  studentId: string;
};

export type StudentAttendanceHistoryRow = {
  date: string;
  subject: string;
  teacher: string;
  status: AttendanceStatus;
  notes: string;
};

type GetStudentAttendanceHistoryOutput = {
  rows: StudentAttendanceHistoryRow[];
};

export const getStudentAttendanceHistory = async ({
  studentId,
}: GetStudentAttendanceHistoryParams): Promise<GetStudentAttendanceHistoryOutput> => {
  const numericId = Number(studentId);

  if (Number.isNaN(numericId)) {
    return { rows: [] };
  }

  const historyRows = await attendanceRecordRepository.findHistoryByStudentId(numericId);

  return {
    rows: historyRows.map((row) => ({
      date: row.date,
      subject: SUBJECTS.find((s) => s.id === row.subjectId)?.label ?? '-',
      teacher: TEACHERS.find((t) => t.id === row.teacherId)?.name ?? '-',
      status: row.status as AttendanceStatus,
      notes: row.notes,
    })),
  };
};
