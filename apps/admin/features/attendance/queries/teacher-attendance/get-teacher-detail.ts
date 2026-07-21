import { teacherRepository } from '@/features/teachers/repositories';
import { getTeacherAttendanceReport } from './get-teacher-attendance-report';
import type { TeacherAttendanceRow, TeacherAttendanceSummary } from './types';

export type TeacherDetailData = {
  teacher: {
    id: number;
    code: string;
    name: string;
    email: string;
    photo: string;
    birthPlace: string;
    birthDate: string;
    address: string;
    phone: string;
    formalEducation: string;
    boardingEducation: string;
    position: string;
  };
  history: TeacherAttendanceRow[];
  report: {
    month: string;
    hadir: number;
    pengganti: number;
    tidakHadir: number;
    total: number;
  }[];
  summary: TeacherAttendanceSummary;
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

const computeMonthlyReport = (rows: TeacherAttendanceRow[]): TeacherDetailData['report'] => {
  const monthlyMap = new Map<
    string,
    { hadir: number; pengganti: number; tidakHadir: number; total: number }
  >();

  for (const row of rows) {
    const monthKey = row.date.substring(0, 7);
    const entry = monthlyMap.get(monthKey) ?? {
      hadir: 0,
      pengganti: 0,
      tidakHadir: 0,
      total: 0,
    };

    entry.total++;

    if (row.statusLabel === 'Hadir') {
      entry.hadir++;
    } else if (row.statusLabel === 'Guru Pengganti') {
      entry.pengganti++;
    } else {
      entry.tidakHadir++;
    }

    monthlyMap.set(monthKey, entry);
  }

  return Array.from(monthlyMap.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([monthKey, stats]) => ({
      month: formatMonth(monthKey),
      ...stats,
    }));
};

export const getTeacherDetail = async (teacherId: string): Promise<TeacherDetailData | null> => {
  const numericId = Number(teacherId);

  if (Number.isNaN(numericId)) {
    return null;
  }

  const teacher = await teacherRepository.findById(numericId);

  if (!teacher) {
    return null;
  }

  const { rows, summary } = await getTeacherAttendanceReport({
    teacherId: numericId,
    allDates: true,
  });

  const report = computeMonthlyReport(rows);

  return {
    teacher: {
      id: teacher.id,
      code: teacher.code,
      name: teacher.name,
      email: teacher.email,
      photo: teacher.photo,
      birthPlace: teacher.birthPlace,
      birthDate: teacher.birthDate,
      address: teacher.address,
      phone: teacher.phone,
      formalEducation: teacher.formalEducation,
      boardingEducation: teacher.boardingEducation,
      position: teacher.position,
    },
    history: rows,
    report,
    summary,
  };
};
