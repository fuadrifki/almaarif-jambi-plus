import { notFound } from 'next/navigation';

import { ReportListPageClient } from './report-list-page-client';
import { getAttendanceReport } from '../../queries/get-attendance-report';
import { classRepository } from '@/features/classes/repositories';

type AttendanceReportsPageProps = {
  search: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function AttendanceReportsPage({ search }: AttendanceReportsPageProps) {
  const searchParams = await search;

  const filter = {
    classId:
      searchParams && typeof searchParams?.classId === 'string' ? searchParams?.classId : undefined,
    date: searchParams && typeof searchParams?.date === 'string' ? searchParams?.date : undefined,
    page:
      searchParams && typeof searchParams?.page === 'string' && !isNaN(parseInt(searchParams?.page))
        ? parseInt(searchParams?.page)
        : 1,
  };

  const report = await getAttendanceReport(filter);
  const classes = await classRepository.findAll();

  if (!report) {
    notFound();
  }

  return <ReportListPageClient report={report} classes={classes} />;
}
