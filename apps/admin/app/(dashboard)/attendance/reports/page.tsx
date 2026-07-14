import { notFound } from 'next/navigation';

import { getAttendanceReport } from '@/features/attendance/queries/report/get-attendance-report';
import {
  ReportAttendanceTable,
  ReportFilters,
  ReportSummaryCards,
} from '@/features/attendance/reports';

type AttendanceReportsPageProps = {
  search: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AttendanceReportsPage({ search }: AttendanceReportsPageProps) {
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

  if (!report) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ReportSummaryCards summary={report.summary} />
      <ReportFilters />
      <ReportAttendanceTable rows={report.rows} />
    </div>
  );
}
