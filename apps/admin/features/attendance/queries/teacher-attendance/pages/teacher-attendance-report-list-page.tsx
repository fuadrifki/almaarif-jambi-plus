import { notFound } from 'next/navigation';

import { TEACHERS } from '@/lib/db/seed-teachers';

import { TeacherAttendanceReportListPageClient } from './teacher-attendance-report-list-page-client';
import type { TeacherAttendanceFilter } from '@/features/attendance/repositories/teacher-attendance.repository.types';
import { getTeacherAttendanceReport } from '../get-teacher-attendance-report';

type TeacherAttendanceReportsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getParam = (value: string | string[] | undefined) =>
  typeof value === 'string' && value ? value : undefined;

const getNumberParam = (value: string | string[] | undefined) => {
  const number = Number(getParam(value));

  return Number.isNaN(number) ? undefined : number;
};

export async function TeacherAttendanceReportsPage({
  searchParams,
}: TeacherAttendanceReportsPageProps) {
  console.log('Page rendered', new Date().toISOString());

  const params = await searchParams;

  const filter: TeacherAttendanceFilter = {
    search: getParam(params.search),
    date: getParam(params.date),
    month: getParam(params.month),
    teacherId: getNumberParam(params.teacherId),
  };

  const report = await getTeacherAttendanceReport(filter);

  if (!report || report.total === 0) {
    notFound();
  }

  return (
    <TeacherAttendanceReportListPageClient
      key={Object.values(filter).join('-')}
      report={report}
      teachers={TEACHERS.filter(({ role }) => role === 'teacher').map(({ id, name }) => ({
        id,
        name,
      }))}
    />
  );
}
