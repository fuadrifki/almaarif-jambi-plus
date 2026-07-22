import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

import type { TeacherMonthlyReportRow } from '../get-teacher-detail-data';

function formatMonth(month: string): string {
  const [year, m] = month.split('-');
  const date = new Date(Number(year), Number(m) - 1);
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

function AttendancePercentageBadge({ value }: { value: number }) {
  if (value >= 90) return <Badge variant="success">{formatPercentage(value)}</Badge>;
  if (value >= 70) return <Badge variant="warning">{formatPercentage(value)}</Badge>;
  return <Badge variant="danger">{formatPercentage(value)}</Badge>;
}

export const MonthlyReportTable = ({ rows }: { rows: TeacherMonthlyReportRow[] }) => {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Bulan</TableHead>
          <TableHead className="text-center">Total Mengajar</TableHead>
          <TableHead className="text-center">Hadir</TableHead>
          <TableHead className="text-center">Sakit</TableHead>
          <TableHead className="text-center">Izin</TableHead>
          <TableHead className="text-center">Alpha</TableHead>
          <TableHead className="text-center">Guru Pengganti</TableHead>
          <TableHead className="text-center">Ditugaskan</TableHead>
          <TableHead className="text-center">Kehadiran</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.month} className="bg-card/50">
            <TableCell>
              <div className="font-medium text-primary">{formatMonth(row.month)}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm">{row.totalTeaching}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm">{row.present}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm">{row.sick}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm">{row.permission}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm">{row.absent}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm">{row.substitute}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm">{row.helper}</div>
            </TableCell>
            <TableCell className="text-center">
              <AttendancePercentageBadge value={row.attendancePercentage} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
