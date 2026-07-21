import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { formatDate } from '@/lib/utils/date';

import type { TeacherAttendanceRow } from '../types';
import Link from 'next/link';
import { Eye } from 'lucide-react';

const STATUS_BADGE: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  Hadir: 'success',
  Sakit: 'warning',
  Izin: 'info',
  Dinas: 'info',
  Alpha: 'danger',
  'Guru Pengganti': 'warning',
  'Guru Membantu': 'info',
};

function getStatusBadge(status: string) {
  const variant = STATUS_BADGE[status];
  if (!variant) {
    return <Badge variant="default">{status}</Badge>;
  }
  return <Badge variant={variant}>{status}</Badge>;
}

export const TeacherAttendanceTable = ({ rows }: { rows: TeacherAttendanceRow[] }) => {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Kelas</TableHead>
          <TableHead>Mata Pelajaran</TableHead>
          <TableHead>Total Kelas</TableHead>
          <TableHead>Total Mata Pelajaran</TableHead>
          <TableHead>Total Kehadiran</TableHead>
          <TableHead>Total Pengganti</TableHead>
          <TableHead>Status Absensi</TableHead>
          <TableHead>Catatan</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={`${row.sessionId}-${row.teacher.id}-${index}`}
            className={index % 2 === 0 ? 'bg-card/50' : ''}
          >
            <TableCell>
              <div className="text-sm">{formatDate(new Date(row.date))}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-primary">{row.teacher.name}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-secondary">{row.class.name}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-secondary">{row.subject.label}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{row.totalClasses || '-'}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{row.totalSubjects || '-'}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{row.totalTeaching || '-'}</div>
            </TableCell>
            <TableCell>
              {row.substituteCount ? <Badge variant="warning">Pengganti</Badge> : '-'}
            </TableCell>
            <TableCell>{getStatusBadge(row.statusLabel)}</TableCell>
            <TableCell>
              <div className="text-sm max-w-48 truncate text-secondary">{row.catatanLabel}</div>
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/attendance/teachers/${row.teacher.id}`}>
                <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
                  Detail
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
