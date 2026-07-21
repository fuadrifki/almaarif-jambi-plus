'use client';

import { useCallback, useMemo, useState } from 'react';

import {
  DatePicker,
  EmptyState,
  InfiniteScroll,
  PageLayout,
  Select,
  SelectOption,
  Skeleton,
} from '@/components/ui';
import { ClipboardCheck } from 'lucide-react';

import { AttendanceSessionCard } from './attendance-session-card';

import { type AttendanceRecord, type AttendanceSession } from '../types';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { format } from 'date-fns';

type SessionWithRecords = AttendanceSession & { records: AttendanceRecord[] };

type AttendanceHistorySectionProps = {
  sessions: SessionWithRecords[];
  classes: SelectOption[];
};

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

export const AttendanceHistorySection = ({ sessions, classes }: AttendanceHistorySectionProps) => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [classFilter, setClassFilter] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (dateFilter && format(s.date, 'yyyy-MM-dd') !== format(dateFilter, 'yyyy-MM-dd'))
        return false;
      if (classFilter && s.classId !== classFilter) return false;
      if (subjectFilter && s.subjectId !== subjectFilter) return false;
      return true;
    });
  }, [sessions, dateFilter, classFilter, subjectFilter]);

  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const hasMore = displayCount < filteredSessions.length;

  const subjectOptions = useMemo(() => {
    const data = SUBJECTS.map((s) => ({ value: s.id, label: s.label })).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    return [{ value: 0, label: 'Semua' }, ...data];
  }, []);

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, LOAD_DELAY);
  }, []);

  const handleDateChange = (date: Date | undefined) => {
    setDateFilter(date);
  };

  const handleClassChange = (value: number) => {
    setClassFilter(value);
  };

  const handleSubjectChange = (value: number) => {
    setSubjectFilter(value);
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
          <DatePicker
            value={dateFilter}
            onChange={handleDateChange}
            placeholder="Pilih tanggal"
            resettable
          />

          <Select
            options={[{ value: 0, label: 'Semua' }, ...classes]}
            value={classFilter}
            placeholder="Kelas"
            onChange={(value) => handleClassChange(Number(value))}
          />

          <Select
            options={subjectOptions}
            value={subjectFilter}
            placeholder="Mata pelajaran"
            onChange={(value) => handleSubjectChange(Number(value))}
          />
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        {sessions.length === 0 ? (
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
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
