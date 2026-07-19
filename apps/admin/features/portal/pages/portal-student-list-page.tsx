import { studentRepository } from '@/features/students/repositories';
import { classRepository } from '@/features/classes/repositories';
import { attendanceRecordRepository } from '@/features/attendance/repositories';

import { PortalStudentListPageClient } from './portal-student-list-page-client';

import type { Class } from '@/features/classes/types';

export const PortalStudentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;
  const students = await studentRepository.findAll();
  const classes = await classRepository.findAll();

  const classMap = new Map<number, Class>(classes.map((c) => [c.id, c]));

  const portalStudents = await Promise.all(
    students.map(async (student) => {
      const classData = classMap.get(student.classId);
      const summaries = classData
        ? await attendanceRecordRepository.findMonthlySummaryByStudentId(
            student.id,
            student.classId,
          )
        : [];

      const totalSessions = summaries.reduce((acc, s) => acc + s.totalSessions, 0);
      const totalPresent = summaries.reduce((acc, s) => acc + s.present + s.sick + s.permission, 0);
      const attendancePercentage =
        totalSessions > 0 ? Math.round((totalPresent / totalSessions) * 100) : 0;

      return {
        ...student,
        className: classData?.name ?? '-',
        attendancePercentage,
      };
    }),
  );

  return <PortalStudentListPageClient students={portalStudents} initialQuery={q ?? ''} />;
};
