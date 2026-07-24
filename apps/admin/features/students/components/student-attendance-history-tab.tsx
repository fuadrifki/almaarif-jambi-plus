'use client';

import { useCallback, useState } from 'react';

import {
  Badge,
  EmptyState,
  InfiniteScroll,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { History } from 'lucide-react';

import type { StudentAttendanceHistoryRow } from '../queries/get-student-attendance-history';
import type { AttendanceStatus } from '@/features/attendance/types';
import { formatDate } from '@/lib/utils/date';

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

const STATUS_BADGE: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  PRESENT: 'success',
  SICK: 'warning',
  PERMISSION: 'info',
  ABSENT: 'danger',
};

const STATUS_LABEL: Record<string, string> = {
  PRESENT: 'Hadir',
  SICK: 'Sakit',
  PERMISSION: 'Izin',
  ABSENT: 'Alpha',
};

type StudentAttendanceHistoryTabProps = {
  rows: StudentAttendanceHistoryRow[];
};

export const StudentAttendanceHistoryTab = ({ rows }: StudentAttendanceHistoryTabProps) => {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const visible = rows.slice(0, displayCount);
  const hasMore = displayCount < rows.length;

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);

    setTimeout(() => {
      setDisplayCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, LOAD_DELAY);
  }, []);

  const getStatusBadge = (status: AttendanceStatus) => (
    <Badge variant={STATUS_BADGE[status] ?? 'secondary'}>{STATUS_LABEL[status] ?? status}</Badge>
  );

  if (rows.length === 0) {
    return (
      <EmptyState
        icon={<History size={32} />}
        title="Belum ada riwayat absensi"
        description="Riwayat absensi akan muncul setelah data absensi tersedia."
      />
    );
  }

  return (
    <InfiniteScroll
      hasMore={hasMore}
      isLoading={isLoadingMore}
      onLoadMore={loadMore}
      loader={
        <div className="space-y-3 py-3">
          <div className="h-12 animate-pulse rounded-lg bg-(--skeleton)" />
          <div className="h-12 animate-pulse rounded-lg bg-(--skeleton)" />
        </div>
      }
      end={
        <p className="pt-4 text-center text-sm text-secondary">
          Semua {rows.length} data riwayat sudah dimuat
        </p>
      }
    >
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/12">Tanggal</TableHead>
            <TableHead className="w-3/12">Mata Pelajaran</TableHead>
            <TableHead className="w-2/12">Ustad</TableHead>
            <TableHead className="w-1/12">Status</TableHead>
            <TableHead className="w-3/12">Catatan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row, index) => (
            <TableRow key={`${row.date}-${index}`} className={index % 2 === 0 ? 'bg-card/50' : ''}>
              <TableCell>
                <span className="text-sm text-secondary">{formatDate(new Date(row.date))}</span>
              </TableCell>
              <TableCell>
                <div className="font-medium text-primary">{row.subject}</div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-secondary">{row.teacher}</span>
              </TableCell>
              <TableCell>{getStatusBadge(row.status)}</TableCell>
              <TableCell>
                <span className="text-sm text-secondary">{row.notes || '-'}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
  );
};
