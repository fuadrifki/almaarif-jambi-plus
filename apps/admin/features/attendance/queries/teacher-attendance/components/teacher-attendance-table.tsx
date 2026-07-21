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
  PRESENT: 'success',
  SICK: 'warning',
  PERMISSION: 'info',
  ABSENT: 'danger',
};

const scheduled_teacher_status_LABEL: Record<string, string> = {
  PRESENT: 'Hadir',
  PERMISSION: 'Izin',
  SICK: 'Sakit',
  OFFICIAL_DUTY: 'Dinas',
  ABSENT: 'Tidak Hadir',
  OTHER: 'Lainnya',
};

function getStatusBadge(status: string | null) {
  if (!status) {
    return <Badge variant="default">Belum Absen</Badge>;
  }

  const variant = STATUS_BADGE[status as keyof typeof STATUS_BADGE];
  if (!variant) {
    return (
      <Badge variant="default">
        {scheduled_teacher_status_LABEL[status as keyof typeof scheduled_teacher_status_LABEL]}
      </Badge>
    );
  }

  return (
    <Badge variant={variant}>
      {scheduled_teacher_status_LABEL[status as keyof typeof scheduled_teacher_status_LABEL]}
    </Badge>
  );
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
            key={`${index}-${row.teacher.id}-${row.date}`}
            className={index % 2 === 0 ? 'bg-card/50' : ''}
          >
            <TableCell>
              <div className="text-sm">
                {formatDate(new Date(row.date), 'EEEE, d MMMM yyyy hh:mm')}
              </div>
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
              <div className="text-sm">{row.totalStudents || '-'}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{row.totalClasses || '-'}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{row.totalClasses || '-'}</div>
            </TableCell>
            <TableCell>
              {row.substituteCount ? <Badge variant="warning">Pengganti</Badge> : '-'}
            </TableCell>
            <TableCell>{getStatusBadge(row.attendanceStatus)}</TableCell>
            <TableCell>
              <div className="text-sm max-w-40 truncate text-secondary">
                {row.notes ? <span>{row.notes}</span> : '-'}
                {row.scheduledTeacherStatus && (
                  <div className="text-xs text-amber-400 mt-1">
                    Status Asli: {scheduled_teacher_status_LABEL[row.scheduledTeacherStatus]}
                  </div>
                )}
                {row.substituteNotes && (
                  <div className="text-xs text-amber-400">
                    Catatan Pengganti: {row.substituteNotes}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/students/${row.teacher.id}`}>
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
