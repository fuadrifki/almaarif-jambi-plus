'use client';

import { useState, useCallback } from 'react';

import { PageLayout, EmptyState, InfiniteScroll, Skeleton } from '@/components/ui';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ReportSummaryCards } from '../components/report-summary-cards';
import { ReportAttendanceTable } from '../components/report-attendance-table';
import { ReportFilters } from '../components/report-filters';
import type { Class } from '@/features/classes/types';
import type { AttendanceReportResult } from '../../queries/types';
import { FileSpreadsheet } from 'lucide-react';

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

type ReportListPageClientProps = {
  report: AttendanceReportResult;
  classes: Class[];
  teachers: { id: number; name: string }[];
  subjects: { id: number; name: string }[];
};

export const ReportListPageClient = ({
  report,
  classes,
  teachers,
  subjects,
}: ReportListPageClientProps) => {
  const { summary, rows } = report;

  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const visibleRows = rows.slice(0, displayCount);
  const hasMore = displayCount < rows.length;

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, LOAD_DELAY);
  }, []);

  return (
    <PageLayout>
      <PageLayout.Header>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Attendance', href: '/attendance' },
            { label: 'Reports' },
          ]}
        />
        <h1 className="text-2xl font-semibold sm:text-3xl">Laporan Absensi Siswa</h1>
        <p className="text-secondary">Buat data laporan absensi siswa pesantren.</p>

        <ReportFilters classes={classes} teachers={teachers} subjects={subjects} />
      </PageLayout.Header>

      <PageLayout.Content>
        {rows.length === 0 ? (
          <EmptyState
            title="Tidak ada data"
            description="Tidak ada data absensi untuk filter yang dipilih. Silakan ubah filter untuk melihat data."
            icon={<FileSpreadsheet size={32} />}
          />
        ) : (
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={isLoadingMore}
            onLoadMore={loadMore}
            loader={
              <div className="flex justify-center py-4">
                <Skeleton className="h-8 w-full" />
              </div>
            }
            end={
              <p className="text-center text-sm text-secondary py-4">
                Semua {rows.length} data sudah dimuat
              </p>
            }
          >
            <div className="flex flex-col gap-y-4 w-full">
              <ReportSummaryCards summary={summary} />

              <ReportAttendanceTable rows={visibleRows} classes={classes} />
            </div>
          </InfiniteScroll>
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
