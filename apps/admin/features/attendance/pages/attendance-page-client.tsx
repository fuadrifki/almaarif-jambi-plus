'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  EmptyState,
  Field,
  PageLayout,
  SegmentedControl,
  Select,
  Surface,
  toast,
} from '@/components/ui';
import { ClipboardCheck, History } from 'lucide-react';
import { CLASSES, SUBJECTS, TEACHERS } from '@/config/lookups';

import { AttendanceSessionCard } from '../components/attendance-session-card';
import { AttendanceStudentRow } from '../components/attendance-student-row';
import { submitAttendance } from '../server';

import type { AttendanceRecord, AttendanceSession, AttendanceStatus } from '../types';
import type { Student } from '@/features/students/types';

type SessionWithRecords = AttendanceSession & { records: AttendanceRecord[] };

type AttendancePageClientProps = {
  teacherId: string;
  teacherName: string;
  students: Student[];
  sessions: SessionWithRecords[];
};

type Tab = 'input' | 'history';

export const AttendancePageClient = ({
  teacherId,
  teacherName,
  students,
  sessions,
}: AttendancePageClientProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('input');

  const now = useMemo(() => new Date(), []);

  const date = useMemo(
    () =>
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
    [now],
  );

  const time = useMemo(
    () => `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    [now],
  );

  const displayDate = useMemo(
    () =>
      now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [now],
  );

  const teacherLabel = useMemo(
    () => TEACHERS.find((t) => t.value === teacherId)?.label ?? teacherName,
    [teacherId, teacherName],
  );

  const [classId, setClassId] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string>('');
  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dateFilter, setDateFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  const filteredStudents = useMemo(
    () => (classId ? students.filter((s) => s.classId === classId) : []),
    [students, classId],
  );

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

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (dateFilter && s.date !== dateFilter) return false;
      if (classFilter && s.classId !== classFilter) return false;
      if (subjectFilter && s.subjectId !== subjectFilter) return false;
      return true;
    });
  }, [sessions, dateFilter, classFilter, subjectFilter]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleNotesChange = (studentId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = async () => {
    if (!classId) {
      toast.error('Pilih kelas terlebih dahulu');

      return;
    }

    if (!subjectId) {
      toast.error('Pilih mata pelajaran terlebih dahulu');

      return;
    }

    const missingStatus = filteredStudents.find((s) => !statuses[s.id]);

    if (missingStatus) {
      toast.error(`Status wajib dipilih untuk ${missingStatus.name}`);

      return;
    }

    setIsSubmitting(true);

    try {
      await submitAttendance({
        teacherId,
        classId,
        subjectId,
        date,
        time,
        records: filteredStudents.map((student) => ({
          studentId: student.id,
          status: statuses[student.id],
          notes: notes[student.id] ?? '',
        })),
      });

      toast.success('Absensi berhasil disimpan');

      setStatuses({});
      setNotes({});
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal menyimpan absensi. Silakan coba lagi.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Absensi</h1>

        <Surface className="flex flex-wrap justify-between gap-x-2 gap-y-2 p-4 text-sm text-secondary">
          <span className="font-medium text-primary">{teacherLabel}</span>

          <span>
            {displayDate} {time} WIB
          </span>
        </Surface>

        <SegmentedControl value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
          <SegmentedControl.Item value="input" icon={<ClipboardCheck size={16} />}>
            Isi Absensi
          </SegmentedControl.Item>

          <SegmentedControl.Item value="history" icon={<History size={16} />}>
            Riwayat
          </SegmentedControl.Item>
        </SegmentedControl>

        {activeTab === 'input' && (
          <div className="grid gap-4 grid-cols-2">
            <Field label="Kelas" required>
              <Select options={CLASSES} value={classId} placeholder="Pilih" onChange={setClassId} />
            </Field>

            <Field label="Mata Pelajaran" required>
              <Select
                options={SUBJECTS}
                value={subjectId}
                placeholder="Pilih"
                onChange={setSubjectId}
              />
            </Field>
          </div>
        )}

        {activeTab === 'history' && (
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
        )}
      </PageLayout.Header>

      <PageLayout.Content className="flex flex-col gap-y-4 justify-between w-full">
        {activeTab === 'input' && (
          <>
            {!classId ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Pilih kelas untuk memulai"
                description="Pilih kelas dan mata pelajaran terlebih dahulu untuk mengisi absensi."
              />
            ) : filteredStudents.length === 0 ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Tidak ada siswa"
                description="Tidak ada siswa yang terdaftar di kelas ini."
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredStudents.map((student) => (
                  <AttendanceStudentRow
                    key={student.id}
                    student={student}
                    status={statuses[student.id]}
                    notes={notes[student.id] ?? ''}
                    onStatusChange={handleStatusChange}
                    onNotesChange={handleNotesChange}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!classId || !subjectId || filteredStudents.length === 0}
                status={isSubmitting ? 'loading' : 'idle'}
              >
                Simpan Absensi
              </Button>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <>
            {sessions.length === 0 ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Belum ada riwayat"
                description="Riwayat absensi akan muncul setelah Anda menyimpan absensi."
              />
            ) : filteredSessions.length === 0 ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Tidak ada hasil"
                description="Tidak ada riwayat yang cocok dengan filter yang dipilih."
              />
            ) : (
              <div className="space-y-3">
                {filteredSessions.map((session) => (
                  <AttendanceSessionCard
                    key={session.id}
                    session={session}
                    records={session.records}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
