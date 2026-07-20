'use server';

import { revalidatePath } from 'next/cache';

import {
  attendanceSessionRepository,
  attendanceRecordRepository,
} from '@/features/attendance/repositories';

import type { AttendanceStatus } from './types';

type SubmitAttendanceInput = {
  teacherId: number;
  classId: number;
  subjectId: number;
  scheduleId: number;
  date: string;
  time: string;
  originalTeacherStatus?: string;
  substituteNotes?: string;
  records: {
    studentId: number;
    status: AttendanceStatus;
    notes: string;
  }[];
};

export const submitAttendance = async (input: SubmitAttendanceInput) => {
  const session = await attendanceSessionRepository.create({
    teacherId: input.teacherId,
    classId: input.classId,
    subjectId: input.subjectId,
    scheduleId: input.scheduleId,
    date: input.date,
    time: input.time,
    originalTeacherStatus: input.originalTeacherStatus ?? null,
    substituteNotes: input.substituteNotes ?? null,
  });

  await attendanceRecordRepository.createBatch(
    input.records.map((record) => ({
      sessionId: session.id,
      studentId: record.studentId,
      status: record.status,
      notes: record.notes,
    })),
  );

  revalidatePath('/attendance');

  return { success: true };
};
