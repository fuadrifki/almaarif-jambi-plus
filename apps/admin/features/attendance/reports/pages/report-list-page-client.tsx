'use client';

import { PageLayout } from '@/components/ui';
import { ReportSummaryCards } from '../components/report-summary-cards';
import { ReportAttendanceTable } from '../components/report-attendance-table';
import { ReportFilters } from '../components/report-filters';
import { Class } from '@/features/classes';
import { AttendanceReportResult } from '../../queries/types';

type ReportListPageClientProps = {
  report: AttendanceReportResult;
  classes: Class[];
  className?: string;
};

export const ReportListPageClient = ({
  report: { summary, rows },
  classes,
}: ReportListPageClientProps) => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Siswa</h1>

        <p className="text-secondary">Kelola data siswa pesantren.</p>
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="space-y-6">
          <ReportSummaryCards summary={summary} />
          <ReportFilters classes={classes} />
          <ReportAttendanceTable rows={rows} classes={classes} />
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};
