'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  EmptyState,
  Field,
  PageLayout,
  Select,
  SelectOption,
  Surface,
  Textarea,
  toast,
} from '@/components/ui';
import { AlertTriangle, ClipboardCheck } from 'lucide-react';

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
import { AttendanceStudentRow } from './attendance-student-row';
import { formatDate } from '@/lib/utils/date';

type SessionWithRecords = AttendanceSession & { records: AttendanceRecord[] };

type AttendanceInputSectionProps = {
  teacherId: number;
  students: Student[];
  sessions: SessionWithRecords[];
  classes: SelectOption[];
};

export const AttendanceInputSection = ({
  teacherId,
  students,
  classes,
}: AttendanceInputSectionProps) => {
  const [classId, setClassId] = useState<number>(0);
  const [subjectId, setSubjectId] = useState<number>(0);
  const [statuses, setStatuses] = useState<Record<number, AttendanceStatus>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openTeacherSubstitute, setOpenTeacherSubstitute] = useState(false);
  const [originalTeacherStatus, setOriginalTeacherStatus] = useState('');
  const [substituteNotes, setSubstituteNotes] = useState('');
  const [substituteConfirmed, setSubstituteConfirmed] = useState(false);

  const currentDate = useMemo(() => {
    const day = formatDate(new Date(), 'EEEE');
    const time = formatDate(new Date(), 'HH:mm');

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
    setSubstituteConfirmed(false);
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
      </PageLayout.Header>

      <div className="flex flex-col gap-y-4 justify-between w-full">
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
              <p className="text-sm font-semibold">Guru Pengganti &mdash; {originalTeacherName}</p>
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
          <>
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
      </div>
    </PageLayout>
  );
};
