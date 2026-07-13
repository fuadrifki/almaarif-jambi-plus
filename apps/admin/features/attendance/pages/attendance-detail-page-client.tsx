'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Button, EmptyState, PageLayout, Surface } from '@/components/ui';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';

import { CLASSES, SUBJECTS } from '@/config/lookups';

import { AttendanceRecordRow } from '../components/attendance-record-row';

import type { AttendanceRecord, AttendanceSession } from '../types';
import type { Student } from '@/features/students/types';

type AttendanceDetailPageClientProps = {
  session: AttendanceSession;
  records: AttendanceRecord[];
  students: Student[];
};

export const AttendanceDetailPageClient = ({
  session,
  records,
  students,
}: AttendanceDetailPageClientProps) => {
  const router = useRouter();

  const className = useMemo(
    () => CLASSES.find((c) => c.value === session.classId)?.label ?? session.classId,
    [session.classId],
  );

  const subjectName = useMemo(
    () => SUBJECTS.find((s) => s.value === session.subjectId)?.label ?? session.subjectId,
    [session.subjectId],
  );

  const displayDate = useMemo(
    () =>
      new Date(session.date + 'T00:00:00').toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    [session.date],
  );

  const present = records.filter((r) => r.status === 'PRESENT').length;
  const sick = records.filter((r) => r.status === 'SICK').length;
  const permission = records.filter((r) => r.status === 'PERMISSION').length;
  const absent = records.filter((r) => r.status === 'ABSENT').length;

  return (
    <PageLayout>
      <PageLayout.Header>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => router.push('/attendance?tab=history')}
        >
          Kembali
        </Button>

        <h1 className="text-2xl font-semibold sm:text-3xl">Detail Absensi</h1>

        <Surface className="space-y-3 p-4">
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div>
              <p className="text-secondary">Tanggal</p>
              <p className="font-medium text-primary">{displayDate}</p>
            </div>

            <div>
              <p className="text-secondary">Waktu</p>
              <p className="font-medium text-primary">{session.time} WIB</p>
            </div>

            <div>
              <p className="text-secondary">Kelas</p>
              <p className="font-medium text-primary">{className}</p>
            </div>

            <div>
              <p className="text-secondary">Mata Pelajaran</p>
              <p className="font-medium text-primary">{subjectName}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-secondary">
            <span>Total: {records.length}</span>

            <span className="text-green-400">Hadir: {present}</span>

            <span className="text-yellow-400">Sakit: {sick}</span>

            <span className="text-blue-400">Izin: {permission}</span>

            <span className="text-red-400">Alpha: {absent}</span>
          </div>
        </Surface>
      </PageLayout.Header>

      <PageLayout.Content>
        {records.length === 0 ? (
          <EmptyState
            icon={<ClipboardCheck size={32} />}
            title="Tidak ada catatan"
            description="Sesi ini tidak memiliki catatan absensi."
          />
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <AttendanceRecordRow key={record.id} record={record} students={students} />
            ))}
          </div>
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
