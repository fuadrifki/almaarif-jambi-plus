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
import type { ResolvedTeacherStatus } from '../../../repositories/teacher-attendance.repository.types';
import Link from 'next/link';
import { Eye, FilePen, UserCheck } from 'lucide-react';
import { NOTES_LABEL } from '@/features/attendance/types';

const ABSENT_STATUS_LABEL: Record<string, string> = {
  SICK: 'Sakit',
  PERMISSION: 'Izin',
  OFFICIAL_DUTY: 'Dinas',
  ABSENT: 'Alpha',
  OTHER: 'Lainnya',
};

const ABSENT_STATUS_VARIANT: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  SICK: 'warning',
  PERMISSION: 'info',
  OFFICIAL_DUTY: 'info',
  ABSENT: 'danger',
};

function getResolvedStatusLabel(resolvedStatus: ResolvedTeacherStatus): string {
  switch (resolvedStatus.status) {
    case 'ABSENT':
      return (
        ABSENT_STATUS_LABEL[resolvedStatus.scheduledTeacherStatus] ??
        resolvedStatus.scheduledTeacherStatus
      );
    case 'SUBSTITUTE':
      return 'Guru Pengganti';
    case 'HELPER':
      return 'Ditugaskan';
    case 'REGULAR':
      return 'Hadir';
  }
}

function getResolvedStatusVariant(
  resolvedStatus: ResolvedTeacherStatus,
): 'success' | 'warning' | 'info' | 'danger' {
  switch (resolvedStatus.status) {
    case 'ABSENT':
      return ABSENT_STATUS_VARIANT[resolvedStatus.scheduledTeacherStatus] ?? 'default';
    case 'SUBSTITUTE':
    case 'HELPER':
    case 'REGULAR':
      return 'success';
  }
}

function ResolvedStatusBadge({ resolvedStatus }: { resolvedStatus: ResolvedTeacherStatus }) {
  const label = getResolvedStatusLabel(resolvedStatus);
  const variant = getResolvedStatusVariant(resolvedStatus);
  return <Badge variant={variant}>{label}</Badge>;
}

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
            <TableCell>
              <ResolvedStatusBadge resolvedStatus={row.resolvedStatus} />
            </TableCell>
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
