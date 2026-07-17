'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  DatePicker,
  EmptyState,
  PageLayout,
  SegmentedControl,
  Select,
  SelectOption,
  Surface,
  toast,
} from '@/components/ui';
import { ClipboardCheck, History, Plus } from 'lucide-react';

import { AttendanceSessionCard } from '../components/attendance-session-card';
import { AttendanceStudentRow } from '../components/attendance-student-row';
import { submitAttendance } from '../server';

import type { AttendanceRecord, AttendanceSession, AttendanceStatus } from '../types';
import type { Student } from '@/features/students/types';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { SCHEDULES } from '@/lib/db/seed-schedule';
import { format, isEqual } from 'date-fns';
import { id } from 'date-fns/locale';

type SessionWithRecords = AttendanceSession & { records: AttendanceRecord[] };

type AttendancePageClientProps = {
  teacherId: number;
  students: Student[];
  sessions: SessionWithRecords[];
  classes: SelectOption[];
};

type Tab = 'input' | 'history';

export const AttendancePageClient = ({
  teacherId,
  students,
  sessions,
  classes,
}: AttendancePageClientProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('input');

  const teacherLabel = useMemo(() => TEACHERS.find((t) => t.id === teacherId)?.name, [teacherId]);

  const [classId, setClassId] = useState<number>(0);
  const [statuses, setStatuses] = useState<Record<number, AttendanceStatus>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [classFilter, setClassFilter] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState(0);

  const filteredStudents = useMemo(
    () => (classId ? students.filter((s) => s.classId === classId) : []),
    [students, classId],
  );

  const currentschedules = useMemo(() => {
    const currentDay = format(new Date(), 'EEEE', { locale: id });
    const currentTime = format(new Date(), 'HH:mm');

    return (
      SCHEDULES.find((item) => {
        const [start, end] = item.time.split('-');
        const inRange = currentTime >= start && currentTime <= end;

        return (
          item.day === currentDay &&
          inRange &&
          item.classId === classId &&
          item.teacherId === teacherId
        );
      }) ?? undefined
    );
  }, [classId, teacherId]);

  const subjectsByClass = useMemo(() => {
    const schedules = SCHEDULES.filter((s) => s.teacherId === teacherId);

    const data = SUBJECTS.filter((s) => schedules.find((sch) => sch.subjectId === s.id));

    const res = data.sort((a, b) => a.label.localeCompare(b.label));

    return res.map((s) => ({ value: s.id, label: s.label }));
  }, [teacherId]);

  const subjectOptions = useMemo(
    () => [{ value: 0, label: 'Semua' }, ...subjectsByClass],
    [subjectsByClass],
  );

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (dateFilter && format(s.date, 'yyyy-MM-dd') !== format(dateFilter, 'yyyy-MM-dd'))
        return false;
      if (classFilter && s.classId !== classFilter) return false;
      if (subjectFilter && s.subjectId !== subjectFilter) return false;
      return true;
    });
  }, [sessions, dateFilter, classFilter, subjectFilter]);

  const handleStatusChange = (studentId: number, status: AttendanceStatus) => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleNotesChange = (studentId: number, value: string) => {
    setNotes((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = async () => {
    if (!classId) {
      toast.error('Pilih kelas terlebih dahulu');

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
        subjectId: currentschedules?.subjectId ?? 0,
        scheduleId: currentschedules?.id ?? 0,
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'hh:mm'),
        records: filteredStudents.map((student) => ({
          studentId: student.id,
          status: statuses[student.id],
          notes: notes[student.id] ?? '',
        })),
      });

      toast.success('Absensi berhasil disimpan');

      toast.success('Absensi berhasil disimpan');

      // Reset form
      setClassId(0);
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

          {currentschedules ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span>Jadwal hari ini:</span>
              <span className="font-semibold whitespace-nowrap">
                {SUBJECTS.find((s) => s.id === currentschedules?.subjectId)?.label}
              </span>
              <span className="whitespace-nowrap">({currentschedules?.time})</span>
            </div>
          ) : classId > 0 ? (
            <span className="text-sm text-secondary text-center">Tidak ada jadwal hari ini</span>
          ) : (
            <span className="text-sm text-secondary text-center">Belum ada jadwal hari ini</span>
          )}
        </Surface>

        <SegmentedControl value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
          <SegmentedControl.Item value="input" icon={<Plus size={16} />}>
            Isi Absensi
          </SegmentedControl.Item>

          <SegmentedControl.Item value="history" icon={<History size={16} />}>
            Riwayat
          </SegmentedControl.Item>
        </SegmentedControl>

        {activeTab === 'input' && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 items-center">
            <Select
              options={classes}
              value={classId}
              placeholder="Kelas"
              onChange={(value) => setClassId(Number(value))}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <DatePicker value={dateFilter} onChange={setDateFilter} placeholder="Pilih tanggal" />

            <Select
              options={[{ value: 0, label: 'Semua' }, ...classes]}
              value={classFilter}
              placeholder="Kelas"
              onChange={(value) => setClassFilter(Number(value))}
            />

            <Select
              options={subjectOptions}
              value={subjectFilter}
              placeholder="Mata pelajaran"
              onChange={(value) => setSubjectFilter(Number(value))}
            />
          </div>
        )}
      </PageLayout.Header>

      <PageLayout.Content className="flex flex-col gap-y-4 justify-between w-full">
        {activeTab === 'input' && (
          <>
            {!classId || !currentschedules ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Pilih kelas untuk memulai"
                description="Pilih kelas terlebih dahulu untuk mengisi absensi."
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
                disabled={!classId || !currentschedules?.subjectId || filteredStudents.length === 0}
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
                    classes={classes}
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
