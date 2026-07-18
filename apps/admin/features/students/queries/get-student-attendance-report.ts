'use server';

import { attendanceRecordRepository } from '@/features/attendance/repositories';
import { studentRepository } from '@/features/students/repositories';

type GetStudentAttendanceReportParams = {
  studentId: string;
};

export type StudentAttendanceReportRow = {
  month: string;
  present: number;
  sick: number;
  permission: number;
  absent: number;
  notAttended: number;
  attendancePercentage: number;
};

type GetStudentAttendanceReportOutput = {
  rows: StudentAttendanceReportRow[];
};

const formatMonth = (monthStr: string): string => {
  const [year, month] = monthStr.split('-');
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const monthIndex = Number(month) - 1;
  return `${monthNames[monthIndex] ?? month} ${year}`;
};

export const getStudentAttendanceReport = async ({
  studentId,
}: GetStudentAttendanceReportParams): Promise<GetStudentAttendanceReportOutput> => {
  const numericId = Number(studentId);

  if (Number.isNaN(numericId)) {
    return { rows: [] };
  }

  const student = await studentRepository.findById(studentId);

  if (!student) {
    return { rows: [] };
  }

  const summaries = await attendanceRecordRepository.findMonthlySummaryByStudentId(
    numericId,
    student.classId,
  );

  return {
    rows: summaries.map((s) => ({
      month: formatMonth(s.month),
      present: s.present,
      sick: s.sick,
      permission: s.permission,
      absent: s.absent,
      notAttended: s.notAttended,
      attendancePercentage:
        s.totalSessions > 0
          ? Math.round(((s.present + s.sick + s.permission) / s.totalSessions) * 100)
          : 0,
    })),
  };
};
