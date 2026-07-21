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
import { FileSpreadsheet } from 'lucide-react';

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

type MonthlyReportRow = {
  month: string;
  hadir: number;
  pengganti: number;
  tidakHadir: number;
  total: number;
};

type TeacherAttendanceReportTabProps = {
  rows: MonthlyReportRow[];
};

export const TeacherAttendanceReportTab = ({ rows }: TeacherAttendanceReportTabProps) => {
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
        icon={<FileSpreadsheet size={32} />}
        title="Belum ada laporan absensi"
        description="Laporan absensi bulanan akan muncul setelah data absensi tersedia."
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
          Semua {rows.length} data laporan sudah dimuat
        </p>
      }
    >
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/12">Bulan</TableHead>
            <TableHead className="w-1/12 text-center">Hadir</TableHead>
            <TableHead className="w-1/12 text-center">Pengganti</TableHead>
            <TableHead className="w-1/12 text-center">Tidak Hadir</TableHead>
            <TableHead className="w-1/12 text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row, index) => (
            <TableRow key={row.month} className={index % 2 === 0 ? 'bg-card/50' : ''}>
              <TableCell>
                <div className="font-medium text-primary">{row.month}</div>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="success">{row.hadir}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="warning">{row.pengganti}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="danger">{row.tidakHadir}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <span className="text-sm text-secondary">{row.total}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
  );
};
