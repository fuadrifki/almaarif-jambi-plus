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

import type { TeacherAttendanceRow } from '../types';
import { formatDate } from '@/lib/utils/date';

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

const STATUS_BADGE: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  Hadir: 'success',
  Sakit: 'warning',
  Izin: 'info',
  Dinas: 'info',
  Alpha: 'danger',
  'Guru Pengganti': 'warning',
  'Guru Membantu': 'info',
};

type TeacherAttendanceHistoryTabProps = {
  rows: TeacherAttendanceRow[];
};

export const TeacherAttendanceHistoryTab = ({ rows }: TeacherAttendanceHistoryTabProps) => {
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
            <TableHead className="w-2/12">Tanggal</TableHead>
            <TableHead className="w-2/12">Kelas</TableHead>
            <TableHead className="w-2/12">Mata Pelajaran</TableHead>
            <TableHead className="w-2/12">Status</TableHead>
            <TableHead className="w-4/12">Catatan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row, index) => (
            <TableRow
              key={`${row.sessionId}-${index}`}
              className={index % 2 === 0 ? 'bg-card/50' : ''}
            >
              <TableCell>
                <span className="text-sm text-secondary">{formatDate(new Date(row.date))}</span>
              </TableCell>
              <TableCell>
                <div className="font-medium text-primary">{row.class.name}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-secondary">{row.subject.label}</div>
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_BADGE[row.statusLabel] ?? 'default'}>
                  {row.statusLabel}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-secondary">{row.catatanLabel}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
  );
};
