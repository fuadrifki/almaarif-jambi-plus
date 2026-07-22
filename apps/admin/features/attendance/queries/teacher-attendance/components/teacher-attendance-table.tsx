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
import { Eye, FilePen, UserCheck } from 'lucide-react';

const STATUS_BADGE: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  Hadir: 'success',
  Sakit: 'warning',
  Izin: 'info',
  Dinas: 'info',
  Alpha: 'danger',
  'Guru Pengganti': 'success',
  Ditugaskan: 'success',
};

function getStatusBadge(status: string) {
  const variant = STATUS_BADGE[status];
  if (!variant) {
    return <Badge variant="default">{status}</Badge>;
  }
  return <Badge variant={variant}>{status}</Badge>;
}

const NOTES_LABEL: Record<string, string> = {
  ORIGINAL: 'Digantikan oleh : ',
  REGULAR: 'Guru mata pelajaran',
  SUBSTITUTE: 'Menggantikan :',
  HELPER: 'Ditugaskan',
};

export const TeacherAttendanceTable = ({ rows }: { rows: TeacherAttendanceRow[] }) => {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Total Kelas</TableHead>
          <TableHead>Total Mata Pelajaran</TableHead>
          <TableHead>Total Mengajar</TableHead>
          <TableHead>Total Pengganti</TableHead>
          <TableHead>Status Absensi</TableHead>
          <TableHead>Catatan</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={`${row.teacher.id}-${row.date}-${index}`}
            className={index % 2 === 0 ? 'bg-card/50' : ''}
          >
            <TableCell>
              <div className="text-sm">{formatDate(new Date(row.date), 'EEEE, dd MMMM yyyy')}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-primary">{row.teacher.name}</div>
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
              <div className="text-sm">{row.substituteCount || '-'}</div>
            </TableCell>
            <TableCell>{getStatusBadge(row.statusLabel)}</TableCell>
            <TableCell>
              {!!row.substituteNotes.notes.length && (
                <div className="flex items-start gap-1.5">
                  <FilePen size={12} className="shrink-0 mt-1" />

                  <p className="w-80 text-sm text-secondary whitespace-normal line-clamp-3">
                    {row.substituteNotes.notes.join(', ')}
                  </p>
                </div>
              )}

              <div className="flex items-start gap-1.5">
                <UserCheck size={12} className="shrink-0 mt-1" />

                <p className="w-80 text-sm text-secondary whitespace-normal line-clamp-3">
                  {NOTES_LABEL[row.role]} {row.substituteNotes.substituteTeachers.join(', ')}
                </p>
              </div>
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
