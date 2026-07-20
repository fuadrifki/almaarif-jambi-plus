'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  DatePicker,
  EmptyState,
  Field,
  PageLayout,
  Surface,
  Tabs,
  Select,
  SelectOption,
  Textarea,
  toast,
} from '@/components/ui';
import { AlertTriangle, ClipboardCheck, History, Plus } from 'lucide-react';

import { AttendanceSessionCard } from '../components/attendance-session-card';
import { AttendanceStudentRow } from '../components/attendance-student-row';
import { submitAttendance } from '../server';

import {
  ATTENDANCE_STATUS,
  ATTENDANCE_STATUS_OPTIONS,
  type AttendanceRecord,
  type AttendanceSession,
  type AttendanceStatus,
} from '../types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Student } from '@/features/students/types';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { SCHEDULES } from '@/lib/db/seed-schedule';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatDate } from '@/lib/utils/date';

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
  const [subjectId, setSubjectId] = useState<number>(0);
  const [statuses, setStatuses] = useState<Record<number, AttendanceStatus>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openTeacherSubstitute, setOpenTeacherSubstitute] = useState(false);
  const [originalTeacherStatus, setOriginalTeacherStatus] = useState('');
  const [substituteNotes, setSubstituteNotes] = useState('');
  const [substituteConfirmed, setSubstituteConfirmed] = useState(false);

  const [dateFilter, setDateFilter] = useState<Date | undefined>();

  const [classFilter, setClassFilter] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState(0);

  const currentDate = useMemo(() => {
    const day = format(new Date(), 'EEEE', { locale: id });
    const time = format(new Date(), 'HH:mm');

    return {
      day,
      time,
    };
  }, []);

  const matchedSchedule = useMemo(() => {
    if (!classId || !subjectId) return null;

    return (
      SCHEDULES.find((item) => {
        const [start, end] = item.time.split('-');
        const inRange = currentDate.time >= start && currentDate.time <= end;

        return (
          item.day === currentDate.day &&
          inRange &&
          item.classId === classId &&
          item.subjectId === subjectId
        );
      }) ?? null
    );
  }, [classId, subjectId, currentDate]);

  const isSubstituteMode = useMemo(() => {
    if (!matchedSchedule || matchedSchedule.teacherId === null) return false;
    return matchedSchedule.teacherId !== teacherId;
  }, [matchedSchedule, teacherId]);

  const originalTeacherName = useMemo(() => {
    if (!isSubstituteMode || !matchedSchedule?.teacherId) return null;
    return TEACHERS.find((t) => t.id === matchedSchedule.teacherId)?.name ?? null;
  }, [isSubstituteMode, matchedSchedule]);

  const shouldShowStudentList = useMemo(() => {
    if (isSubstituteMode) {
      return Boolean(
        substituteConfirmed &&
        (originalTeacherStatus !== ATTENDANCE_STATUS.PERMISSION || substituteNotes.trim()),
      );
    }
    return classId > 0;
  }, [isSubstituteMode, substituteConfirmed, originalTeacherStatus, substituteNotes, classId]);

  const filteredStudents = useMemo(
    () => (shouldShowStudentList ? students.filter((s) => s.classId === classId) : []),
    [shouldShowStudentList, students, classId],
  );

  const subjectsByClass = useMemo(() => {
    const schedules = SCHEDULES.filter((item) => {
      const [start, end] = item.time.split('-');
      const inRange = currentDate.time >= start && currentDate.time <= end;

      return item.day === currentDate.day && inRange && item.classId === classId;
    });

    const data = SUBJECTS.filter((item) => schedules.find((s) => s.subjectId === item.id));

    const res = data.sort((a, b) => a.label.localeCompare(b.label));

    return res.map((s) => ({ value: s.id, label: s.label }));
  }, [currentDate, classId]);

  const subjectOptions = useMemo((): SelectOption[] => {
    const data = SUBJECTS.map((s) => ({ value: s.id, label: s.label })).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    return [{ value: 0, label: 'Semua' }, ...data];
  }, []);

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
    setIsSubmitting(true);

    try {
      await submitAttendance({
        teacherId,
        classId,
        subjectId,
        scheduleId: matchedSchedule?.id ?? 0,
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'hh:mm'),
        originalTeacherStatus: isSubstituteMode ? originalTeacherStatus : undefined,
        substituteNotes: isSubstituteMode ? substituteNotes.trim() : undefined,
        records: filteredStudents.map((student) => ({
          studentId: student.id,
          status: statuses[student.id],
          notes: notes[student.id] ?? '',
        })),
      });

      toast.success('Absensi berhasil disimpan');

      onResetTab();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal menyimpan absensi. Silakan coba lagi.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetTab = () => {
    setClassId(0);
    setSubjectId(0);
    setStatuses({});
    setNotes({});
    setOriginalTeacherStatus('');
    setSubstituteNotes('');
    setDateFilter(undefined);
    setClassFilter(0);
    setSubjectFilter(0);
  };

  const disabledDetailOriginalTeacher = !Boolean(
    originalTeacherStatus &&
    (originalTeacherStatus !== ATTENDANCE_STATUS.PERMISSION || substituteNotes.trim()),
  );

  const handleSubstituteConfirmed = () => {
    if (disabledDetailOriginalTeacher) return;
    setSubstituteConfirmed(true);
    setOpenTeacherSubstitute(false);
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Absensi</h1>

        <Surface className="flex flex-wrap justify-between gap-x-2 gap-y-2 p-4 text-sm text-secondary">
          <span className="font-medium text-primary">{teacherLabel}</span>
          <span className="text-secondary">
            {formatDate(new Date(), 'EEEE, dd MMMM yyyy HH:mm')}
          </span>
        </Surface>

        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            onResetTab();
            setActiveTab(v as Tab);
          }}
        >
          <Tabs.Item value="input" icon={<Plus size={16} />}>
            Isi Absensi
          </Tabs.Item>

          <Tabs.Item value="history" icon={<History size={16} />}>
            Riwayat
          </Tabs.Item>
        </Tabs>

        {activeTab === 'input' && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center">
            <Select
              options={classes}
              value={classId}
              placeholder="Kelas"
              onChange={(value) => {
                setClassId(Number(value));
                setSubjectId(0);
                setSubstituteConfirmed(false);
                setOriginalTeacherStatus('');
                setSubstituteNotes('');
              }}
            />

            <Select
              options={subjectsByClass}
              value={subjectId}
              placeholder="Mata pelajaran"
              onChange={(value) => {
                setSubjectId(Number(value));
                setSubstituteConfirmed(false);
                setOriginalTeacherStatus('');
                setSubstituteNotes('');
              }}
              disabled={!classId}
            />

            {isSubstituteMode && matchedSchedule?.teacherId !== teacherId && (
              <Popover open={openTeacherSubstitute} onOpenChange={setOpenTeacherSubstitute}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Keterangan guru asli
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 space-y-4">
                  <div className="space-y-3">
                    <Field label="Status kehadiran guru asli" required>
                      <Select
                        options={ATTENDANCE_STATUS_OPTIONS.slice(1)}
                        value={originalTeacherStatus}
                        placeholder="Status kehadiran"
                        onChange={(value) => {
                          setOriginalTeacherStatus(String(value));
                          setSubstituteNotes('');
                        }}
                        disabled={!classId}
                      />
                    </Field>

                    {originalTeacherStatus === ATTENDANCE_STATUS.PERMISSION && (
                      <Field label="Catatan" required>
                        <Textarea
                          placeholder="Alasan guru asli tidak hadir"
                          value={substituteNotes}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSubstituteNotes(value);

                            if (!value) {
                              setSubstituteConfirmed(false);
                            }
                          }}
                          size="sm"
                          resize="none"
                          rows={2}
                        />
                      </Field>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1"
                      onClick={handleSubstituteConfirmed}
                      disabled={disabledDetailOriginalTeacher}
                    >
                      Simpan
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <DatePicker
              value={dateFilter}
              onChange={setDateFilter}
              placeholder="Pilih tanggal"
              resettable
            />

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
            {classId && !subjectsByClass.length ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Mata pelajaran belum tersedia"
                description="Tidak ada mata pelajaran di kelas ini."
              />
            ) : !classId || !subjectId ? (
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Pilih untuk memulai"
                description="Pilih kelas dan mata pelajaran terlebih dahulu untuk mengisi absensi."
              />
            ) : !shouldShowStudentList ? (
              <Surface className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle size={18} />
                  <p className="text-sm font-semibold">
                    Guru Pengganti &mdash; {originalTeacherName}
                  </p>
                </div>

                <p className="text-secondary">Anda akan mengajar sebagai Guru Pengganti.</p>
                <p className="text-secondary">
                  Guru sesuai jadwal:
                  <span className="font-medium text-primary"> {originalTeacherName}</span>
                </p>

                <p className="text-secondary">
                  Silakan isi status guru asli terlebih dahulu sebelum memulai absensi.
                </p>
              </Surface>
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
          </>
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
