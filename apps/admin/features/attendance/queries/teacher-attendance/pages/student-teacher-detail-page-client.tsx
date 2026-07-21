'use client';

import { useCallback, useState } from 'react';

import {
  PageLayout,
  Card,
  EmptyState,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Select,
  SelectOption,
} from '@/components/ui';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { StudentAttendanceHistoryTab } from '@/features/students/components/student-attendance-history-tab';
import { StudentAttendanceReportTab } from '@/features/students/components/student-attendance-report-tab';
import { ClipboardCheck } from 'lucide-react';

import type { Student } from '@/features/students/types';
import { CLASSES, SUBJECTS } from '@/config/lookups';

const scheduled_teacher_status_LABEL: Record<string, string> = {
  PERMISSION: 'Izin',
  SICK: 'Sakit',
  OFFICIAL_DUTY: 'Dinas',
  ABSENT: 'Tidak Hadir',
  OTHER: 'Lainnya',
};

type StudentTeacherDetailPageClientProps = {
  student: Student;
  classData: { id: number; name: string };
  attendanceHistory: any[];
  attendanceReport: any[];
  basePath: string;
};

export const StudentTeacherDetailPageClient = ({
  student,
  classData,
  attendanceHistory,
  attendanceReport,
  basePath,
}: StudentTeacherDetailPageClientProps) => {
  const [activeTab, setActiveTab] = useState('history');

  const teacherAttendance = attendanceHistory.map((session) => {
    const originalTeacherName =
      session.teacherId && session.teacherId !== student.classTeacherId
        ? `Guru Pengganti (${session.teacherName})`
        : session.teacherName;

    return {
      ...session,
      teacherName: originalTeacherName,
      isSubstitute: session.scheduledTeacherStatus !== null,
    };
  });

  return (
    <PageLayout>
      <PageLayout.Header>
        <Breadcrumb
          items={[
            { label: 'Laporan Absensi Guru', href: '/dashboard/attendance/teachers' },
            { label: student.name },
          ]}
        />
        <h1 className="text-2xl font-semibold sm:text-3xl">Detail Guru</h1>
        <p className="text-secondary">Laporan absensi guru pengajar untuk {student.name}.</p>

        <Card className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-xs text-secondary uppercase">NIS</p>
            <p className="font-medium text-primary">{student.nis}</p>
          </div>
          <div>
            <p className="text-xs text-secondary uppercase">Kelas</p>
            <p className="font-medium text-primary">{classData?.name}</p>
          </div>
          <div>
            <p className="text-xs text-secondary uppercase">Jumlah Guru Pengajar</p>
            <p className="font-medium text-primary">{attendanceHistory.length}</p>
          </div>
          <div>
            <p className="text-xs text-secondary uppercase">Status</p>
            <Badge variant="success">Aktif</Badge>
          </div>
        </Card>
      </PageLayout.Header>

      <PageLayout.Content>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Tabs.List>
            <Tabs.Trigger value="history">Riwayat Absensi</Tabs.Trigger>
            <Tabs.Trigger value="monthly">Laporan Bulanan</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="history">
            {attendanceHistory.length === 0 ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Belum ada riwayat"
                description="Belum ada riwayat absensi yang tercatat untuk siswa ini."
              />
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Mata Pelajaran</TableHead>
                    <TableHead>Guru</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Catatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((record) => (
                    <TableRow key={record.id} className="hover:bg-card/50">
                      <TableCell>
                        {new Date(record.date + 'T00:00:00').toLocaleDateString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </TableCell>
                      <TableCell>
                        {SUBJECTS.find((s) => s.value === record.subjectId)?.label}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-primary">{record.teacherName}</span>
                        {record.isSubstitute && (
                          <Badge variant="warning" size="sm" className="ml-2">
                            Pengganti
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.isSubstitute ? (
                          <Badge variant="warning">
                            {scheduled_teacher_status_LABEL[record.scheduledTeacherStatus!]}
                          </Badge>
                        ) : (
                          <Badge
                            variant={
                              record.status === 'PRESENT'
                                ? 'success'
                                : record.status === 'SICK'
                                  ? 'warning'
                                  : record.status === 'PERMISSION'
                                    ? 'info'
                                    : 'danger'
                            }
                          >
                            {record.status === 'PRESENT'
                              ? 'Hadir'
                              : record.status === 'SICK'
                                ? 'Sakit'
                                : record.status === 'PERMISSION'
                                  ? 'Izin'
                                  : record.status === 'ABSENT'
                                    ? 'Alpha'
                                    : record.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm max-w-40 truncate text-secondary">
                          {record.isSubstitute && record.substituteNotes && (
                            <span className="text-amber-400 font-medium">Pengganti: </span>
                          )}
                          {record.notes && record.notes}
                          {record.isSubstitute && record.substituteNotes && (
                            <span className="block text-xs text-amber-400">
                              Catatan Guru Asli: {record.substituteNotes}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Tabs.Content>

          <Tabs.Content value="monthly">
            {attendanceReport.length === 0 ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Belum ada laporan"
                description="Belum ada laporan absensi bulanan yang tercatat untuk siswa ini."
              />
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Bulan</TableHead>
                    <TableHead>Hadir</TableHead>
                    <TableHead>Sakit</TableHead>
                    <TableHead>Izin</TableHead>
                    <TableHead>Alpha</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceReport.map((report) => (
                    <TableRow key={report.month} className="hover:bg-card/50">
                      <TableCell className="font-medium text-primary">{report.month}</TableCell>
                      <TableCell>
                        <Badge variant="success">{report.present}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="warning">{report.sick}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="info">{report.permission}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="danger">{report.absent}</Badge>
                      </TableCell>
                      <TableCell>{report.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Tabs.Content>
        </Tabs>
      </PageLayout.Content>
    </PageLayout>
  );
};
