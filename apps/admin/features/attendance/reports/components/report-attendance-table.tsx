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
import { formatDate } from '@/lib/utils/date';
import { ReportAttendanceTableProps, STATUS_CONFIG } from '../../types';

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
          <TableHead className="w-30">Tanggal</TableHead>
          <TableHead className="w-45">Siswa</TableHead>
          <TableHead className="w-30">NIS</TableHead>
          <TableHead className="w-30">Kelas</TableHead>
          <TableHead className="w-37.5">Mata Pelajaran</TableHead>
          <TableHead className="w-37.5">Guru</TableHead>
          <TableHead className="w-25">Status</TableHead>
          <TableHead>Catatan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={`${index}-${row.student.id}-${row.date}`}
            className={index % 2 === 0 ? 'bg-card/50' : ''}
          >
            <TableCell>
              <div className="text-sm">{formatDate(new Date(row.date))}</div>
            </TableCell>
            <TableCell>
              <div className="text-primary">{row.student.name}</div>
            </TableCell>
            <TableCell>
              <div className="text-primary">{row.student.nis}</div>
            </TableCell>
            <TableCell>
              <div className="text-primary">{row.className}</div>
            </TableCell>
            <TableCell>
              <div className="text-primary">{row.subjectName}</div>
            </TableCell>
            <TableCell>
              <div className="text-primary">{row.teacherName}</div>
            </TableCell>
            <TableCell>{getStatusBadge(row.status)}</TableCell>
            <TableCell>
              <div className="text-primary max-w-50 truncate">{row.notes || '-'}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
