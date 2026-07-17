'use server';

import { classRepository } from '@/features/classes/repositories/index';
import { studentRepository } from '@/features/students/repositories/index';

import type { Student } from '../types';
import type { Class } from '@/features/classes';

type GetStudentDetailParams = {
  studentId: string;
};

type GetStudentDetailOutput = {
  student: Student;
  classData: Class | null;
  attendanceSummary: {
    total: number;
    present: number;
    absent: number;
    sick: number;
    permission: number;
  } | null;
  violationsSummary: {
    total: number;
    severe: number;
    ongoing: number;
  } | null;
};

export const getStudentDetail = async ({
  studentId,
}: GetStudentDetailParams): Promise<GetStudentDetailOutput> => {
  const student = await studentRepository.findById(studentId);

  if (!student) {
    throw new Error('Student not found');
  }

  const classData = await classRepository.findById(student.classId.toString());

  return {
    student,
    classData,
    attendanceSummary: null,
    violationsSummary: null,
  };
};
