'use client';

import { useMemo, useState } from 'react';

import { EmptyState, PageLayout, Select } from '@/components/ui';
import { ClipboardCheck } from 'lucide-react';

import { CLASSES, SUBJECTS } from '@/config/lookups';

import { AttendanceSessionCard } from '../components/attendance-session-card';

import type { AttendanceRecord, AttendanceSession } from '../types';

type SessionWithRecords = AttendanceSession & { records: AttendanceRecord[] };

type AttendanceHistoryPageClientProps = {
  sessions: SessionWithRecords[];
};

export const AttendanceHistoryPageClient = ({ sessions }: AttendanceHistoryPageClientProps) => {
  const [dateFilter, setDateFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  const dateOptions = useMemo(() => {
    const uniqueDates = [...new Set(sessions.map((s) => s.date))].sort().reverse();
    return [
      { value: '', label: 'Semua Tanggal' },
      ...uniqueDates.map((d) => ({
        value: d,
        label: new Date(d + 'T00:00:00').toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      })),
    ];
  }, [sessions]);

  const classOptions = useMemo(() => [{ value: '', label: 'Semua Kelas' }, ...CLASSES], []);

  const subjectOptions = useMemo(() => [{ value: '', label: 'Semua Mapel' }, ...SUBJECTS], []);

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      if (dateFilter && s.date !== dateFilter) return false;
      if (classFilter && s.classId !== classFilter) return false;
      if (subjectFilter && s.subjectId !== subjectFilter) return false;
      return true;
    });
  }, [sessions, dateFilter, classFilter, subjectFilter]);

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Riwayat Absensi</h1>

        <p className="text-secondary">Lihat riwayat absensi yang telah disimpan.</p>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
          <Select
            options={dateOptions}
            value={dateFilter}
            placeholder="Tanggal"
            onChange={setDateFilter}
          />

          <Select
            options={classOptions}
            value={classFilter}
            placeholder="Kelas"
            onChange={setClassFilter}
          />

          <Select
            options={subjectOptions}
            value={subjectFilter}
            placeholder="Mapel"
            onChange={setSubjectFilter}
          />
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        {sessions.length === 0 ? (
          <EmptyState
            icon={<ClipboardCheck size={32} />}
            title="Belum ada riwayat"
            description="Riwayat absensi akan muncul setelah Anda menyimpan absensi."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<ClipboardCheck size={32} />}
            title="Tidak ada hasil"
            description="Tidak ada riwayat yang cocok dengan filter yang dipilih."
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((session) => (
              <AttendanceSessionCard key={session.id} session={session} records={session.records} />
            ))}
          </div>
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
