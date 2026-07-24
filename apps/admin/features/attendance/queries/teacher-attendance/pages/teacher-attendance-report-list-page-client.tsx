'use client';

import { useState, useCallback } from 'react';

import { PageLayout, EmptyState, InfiniteScroll, Skeleton } from '@/components/ui';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FileSpreadsheet } from 'lucide-react';
import { TeacherAttendanceFilters } from '../components/teacher-attendance-filters';
import { SessionAttendanceTable } from '../components/session-attendance-table';
import type { TeacherAttendanceSessionRow } from '../get-teacher-attendance-session-list';

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

type TeacherAttendanceReportListPageClientProps = {
  rows: TeacherAttendanceSessionRow[];
  teachers: { id: number; name: string }[];
  classes: { id: number; name: string }[];
  subjects: { id: number; label: string }[];
};

export const TeacherAttendanceReportListPageClient = ({
  rows,
  teachers,
  classes,
  subjects,
}: TeacherAttendanceReportListPageClientProps) => {
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
        <Breadcrumb items={[{ label: 'Laporan Absensi Ustad' }]} />
        <h1 className="text-2xl font-semibold sm:text-3xl">Laporan Absensi Ustad</h1>
        <p className="text-secondary">Log sesi kehadiran ustad pesantren.</p>

        <TeacherAttendanceFilters teachers={teachers} classes={classes} subjects={subjects} />
      </PageLayout.Header>

      <PageLayout.Content>
        {rows.length === 0 ? (
          <EmptyState
            title="Tidak ada data"
            description="Tidak ada data absensi ustad untuk filter yang dipilih. Silakan ubah filter untuk melihat data."
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
            <SessionAttendanceTable rows={visibleRows} />
          </InfiniteScroll>
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
