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
import {
  ATTENDANCE_SESSION_STATUS_CONFIG,
  TEACHING_ROLE_CONFIG,
} from '@/features/attendance/types';

import type { TeacherAttendanceSessionRow } from '../get-teacher-attendance-session-list';
import type { AttendanceStatus } from '@/features/attendance/types';
import Link from 'next/link';
import { Eye, FilePen, UserCheck } from 'lucide-react';

function AttendanceStatusBadge({ row }: { row: TeacherAttendanceSessionRow }) {
  if (row.teachingRole === 'ORIGINAL') {
    const config = ATTENDANCE_SESSION_STATUS_CONFIG[row.scheduledTeacherStatus as AttendanceStatus];
    return (
      <Badge variant={config?.variant ?? 'danger'}>
        {config?.label ?? row.scheduledTeacherStatus}
      </Badge>
    );
  }
  return <Badge variant="success">Hadir</Badge>;
}

function TeachingRoleBadge({ row }: { row: TeacherAttendanceSessionRow }) {
  const config = TEACHING_ROLE_CONFIG[row.teachingRole];
  return <Badge variant={config?.variant ?? 'default'}>{config?.label ?? row.teachingRole}</Badge>;
}

function NotesCell({ row }: { row: TeacherAttendanceSessionRow }) {
  if (row.teachingRole === 'ORIGINAL') {
    if (row.attendanceStatus === 'PRESENT') {
      return <span className="text-secondary">-</span>;
    }

    return (
      <>
        {!!row.notes && (
          <div className="flex items-start gap-1.5">
            <FilePen size={12} className="shrink-0 mt-1" />

            <p className="w-80 text-sm text-secondary whitespace-normal line-clamp-3">
              {row.notes}
            </p>
          </div>
        )}

        <div className="flex items-start gap-1.5">
          <UserCheck size={12} className="shrink-0 mt-1" />

          <p className="w-80 text-sm text-secondary whitespace-normal line-clamp-3">
            Digantikan oleh <span className="font-semibold">{row.substituteTeacherName}</span>
          </p>
        </div>
      </>
    );
  }

  if (row.teachingRole === 'SUBSTITUTE') {
    if (!row.substituteTeacherName) {
      return <span className="text-secondary">-</span>;
    }

    return (
      <div className="flex items-start gap-1.5">
        <UserCheck size={12} className="shrink-0 mt-1" />

        <p className="w-80 text-sm text-secondary whitespace-normal line-clamp-3">
          Menggantikan <span className="font-semibold">{row.substituteTeacherName}</span>
        </p>
      </div>
    );
  }

  if (row.teachingRole === 'HELPER') {
    return <span className="text-secondary">-</span>;
  }

  return <span className="text-secondary">-</span>;
}

export const SessionAttendanceTable = ({
  rows,
  isDetail,
}: {
  rows: TeacherAttendanceSessionRow[];
  isDetail?: boolean;
}) => {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal & Waktu</TableHead>
          <TableHead>Nama Guru</TableHead>
          <TableHead>Kelas</TableHead>
          <TableHead>Mata Pelajaran</TableHead>
          <TableHead>Status Absensi</TableHead>
          <TableHead>Peran Mengajar</TableHead>
          <TableHead>Catatan</TableHead>
          {!isDetail && <TableHead>Aksi</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} className="bg-card/50">
            <TableCell>
              <div className="text-sm">
                {formatDate(new Date(`${row.date}T${row.time}`), 'EEEE, dd MMMM yyyy HH:mm')}
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-primary">{row.teacher.name}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{row.className}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{row.subjectName}</div>
            </TableCell>
            <TableCell>
              <AttendanceStatusBadge row={row} />
            </TableCell>
            <TableCell>
              <TeachingRoleBadge row={row} />
            </TableCell>
            <TableCell>
              <div className="max-w-80 text-sm text-secondary whitespace-normal line-clamp-3 space-y-1">
                <NotesCell row={row} />
              </div>
            </TableCell>
            {!isDetail && (
              <TableCell>
                <Link href={`/dashboard/attendance/teachers/${row.teacher.id}`}>
                  <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
                    Detail
                  </Button>
                </Link>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
