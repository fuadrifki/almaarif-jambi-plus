import { format } from 'date-fns';
import { notFound } from 'next/navigation';

import { classRepository } from '@/features/classes/repositories';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { ReportFilter } from '@/features/attendance/queries/types';
import { getAttendanceReport } from '@/features/attendance/queries/get-attendance-report';
import { ReportListPageClient } from '@/features/attendance/reports/pages/report-list-page-client';

type AttendanceReportsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getParam = (value: string | string[] | undefined) =>
  typeof value === 'string' && value ? value : undefined;

const getNumberParam = (value: string | string[] | undefined) => {
  const number = Number(getParam(value));

  return Number.isNaN(number) ? undefined : number;
};

export default async function StudentListPublicPage({ searchParams }: AttendanceReportsPageProps) {
  const params = await searchParams;

  const filter: ReportFilter = {
    search: getParam(params.search),
    month: getParam(params.month) ?? format(new Date(), 'yyyy-MM'),
    classId: getNumberParam(params.classId),
    teacherId: getNumberParam(params.teacherId),
    subjectId: getNumberParam(params.subjectId),
    status: getParam(params.status),
  };

  const [report, classes] = await Promise.all([
    getAttendanceReport(filter),
    classRepository.findAll(),
  ]);

  if (!report) {
    notFound();
  }

  return (
    <ReportListPageClient
      key={Object.values(filter).join('-')}
      report={report}
      classes={classes}
      teachers={TEACHERS.filter(({ role }) => role === 'teacher').map(({ id, name }) => ({
        id,
        name,
      }))}
      subjects={SUBJECTS.map(({ id, label }) => ({
        id,
        name: label,
      }))}
    />
  );
}
