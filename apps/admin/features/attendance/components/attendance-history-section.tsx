'use client';

import { useCallback, useMemo, useState } from 'react';

import { EmptyState, InfiniteScroll, SelectOption, Skeleton } from '@/components/ui';
import { ClipboardCheck } from 'lucide-react';

import { AttendanceSessionCard } from './attendance-session-card';

import { type AttendanceRecord, type AttendanceSession } from '../types';
import { format } from 'date-fns';

type SessionWithRecords = AttendanceSession & { records: AttendanceRecord[] };

type AttendanceHistorySectionProps = {
  sessions: SessionWithRecords[];
  classes: SelectOption[];
  subjectOptions: SelectOption[];
  dateFilter?: Date;
  classFilter: number;
  subjectFilter: number;
};

export const AttendanceHistorySection = ({
  sessions,
  classes,
  dateFilter,
  classFilter,
  subjectFilter,
}: AttendanceHistorySectionProps) => {
  const PAGE_SIZE = 20;
  const LOAD_DELAY = 200;

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (dateFilter && format(s.date, 'yyyy-MM-dd') !== format(dateFilter, 'yyyy-MM-dd')) {
        return false;
      }

      if (classFilter && s.classId !== classFilter) return false;

      if (subjectFilter && s.subjectId !== subjectFilter) return false;

      return true;
    });
  }, [sessions, dateFilter, classFilter, subjectFilter]);

  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = displayCount < filteredSessions.length;

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, LOAD_DELAY);
  }, []);

  return sessions.length === 0 ? (
    <EmptyState
      icon={<ClipboardCheck size={32} />}
      title="Belum ada riwayat"
      description="Riwayat absensi akan muncul setelah Anda menyimpan absensi."
    />
  ) : filteredSessions.length === 0 ? (
    <EmptyState
      icon={<ClipboardCheck size={32} />}
      title="Tidak ada hasil"
      description="Tidak ada riwayat yang cocok dengan filter yang dipilih."
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
          Semua {filteredSessions.length} data sudah dimuat
        </p>
      }
    >
      <div className="space-y-3">
        {filteredSessions.map((session) => (
          <AttendanceSessionCard
            key={session.id}
            session={session}
            records={session.records}
            classes={classes}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};
