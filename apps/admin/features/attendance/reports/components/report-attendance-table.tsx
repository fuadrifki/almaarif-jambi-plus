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
import { ReportRow } from '../../queries/report/types';
import { Class } from '@/features/classes';

type ReportAttendanceTableProps = {
  rows: ReportRow[];
  classes: Class[];
  className?: string;
};

export const ReportAttendanceTable = ({ rows, className, classes }: ReportAttendanceTableProps) => {
  const getStatusBadge = (status: string | null) => {
    if (!status) {
      return <Badge>-</Badge>;
    }

    const variants: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
      PRESENT: 'success',
      SICK: 'warning',
      PERMISSION: 'info',
      ABSENT: 'danger',
    };

    const labels: Record<string, string> = {
      PRESENT: 'Hadir',
      SICK: 'Sakit',
      PERMISSION: 'Izin',
      ABSENT: 'Alpha',
    };

    return <Badge variant={variants[status] || 'secondary'}>{labels[status]}</Badge>;
  };

  return (
    <Table className={cn('min-w-full', className)}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/12">Siswa</TableHead>
          <TableHead className="w-2/12">NIS</TableHead>
          <TableHead className="w-2/12">Kelas</TableHead>
          <TableHead className="w-2/12">Status</TableHead>
          <TableHead className="w-3/12">Waktu</TableHead>
          <TableHead className="w-3/12">Sesi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={row.student.id} className={index % 2 === 0 ? 'bg-surface/50' : ''}>
            <TableCell>
              <div className="font-medium text-primary">{row.student.name}</div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-secondary">{row.student.nis}</span>
            </TableCell>
            <TableCell>
              <div className="text-sm text-secondary">
                {classes.find((c) => c.id === row.student.classId)?.name || row.student.classId}
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(row.attendanceStatus)}</TableCell>
            <TableCell>
              <div className="text-sm text-secondary">{row.time || '-'}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-secondary">{row.session || '-'}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
