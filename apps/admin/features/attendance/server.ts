'use server';

import { revalidatePath } from 'next/cache';

import { attendanceSessionRepository, attendanceRecordRepository } from '@/lib/data';

import type { AttendanceStatus } from './types';

type SubmitAttendanceInput = {
  teacherId: string;
  classId: string;
  subjectId: string;
  date: string;
  time: string;
  records: {
    studentId: string;
    status: AttendanceStatus;
    notes: string;
  }[];
};

export const submitAttendance = async (input: SubmitAttendanceInput) => {
  const session = await attendanceSessionRepository.create({
    teacherId: input.teacherId,
    classId: input.classId,
    subjectId: input.subjectId,
    date: input.date,
    time: input.time,
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
