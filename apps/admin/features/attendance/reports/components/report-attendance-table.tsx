import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { cn } from '@/lib';
import type { ReportRow } from '../../queries/types';
import type { Class } from '@/features/classes/types';

type ReportAttendanceTableProps = {
  rows: ReportRow[];
  classes: Class[];
  className?: string;
};

const STATUS_CONFIG: Record<
  string,
  { variant: 'success' | 'warning' | 'info' | 'danger' | 'default'; label: string }
> = {
  PRESENT: { variant: 'success', label: 'Hadir' },
  SICK: { variant: 'warning', label: 'Sakit' },
  PERMISSION: { variant: 'info', label: 'Izin' },
  ABSENT: { variant: 'danger', label: 'Alpha' },
};

function getStatusBadge(status: string | null) {
  if (!status) {
    return <Badge variant="default">Belum Absen</Badge>;
  }

  const config = STATUS_CONFIG[status];
  if (!config) {
    return <Badge variant="default">{status}</Badge>;
  }

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export const ReportAttendanceTable = ({ rows, className }: ReportAttendanceTableProps) => {
  return (
    <Table className={cn('min-w-full', className)}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Tanggal</TableHead>
          <TableHead className="w-[180px]">Siswa</TableHead>
          <TableHead className="w-[120px]">Kelas</TableHead>
          <TableHead className="w-[150px]">Mata Pelajaran</TableHead>
          <TableHead className="w-[150px]">Guru</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Catatan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={`${row.student.id}-${row.date}`}
            className={index % 2 === 0 ? 'bg-surface/50' : ''}
          >
            <TableCell>
              <div className="text-sm">{row.date}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-primary">{row.student.name}</div>
              <div className="text-xs text-secondary">{row.student.nis}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-secondary">{row.className}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-secondary">{row.subjectName}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-secondary">{row.teacherName}</div>
            </TableCell>
            <TableCell>{getStatusBadge(row.status)}</TableCell>
            <TableCell>
              <div className="text-sm text-secondary max-w-[200px] truncate">
                {row.notes || '-'}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
