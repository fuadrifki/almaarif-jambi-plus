'use client';

import { useMemo, useState } from 'react';

import { PageLayout, Card, Tabs, SelectOption, toast } from '@/components/ui';
import { History, Plus } from 'lucide-react';

import {
  ATTENDANCE_STATUS,
  AttendanceStatus,
  Schedule,
  type AttendanceRecord,
  type AttendanceSession,
} from '../types';
import type { Student } from '@/features/students/types';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { formatDate } from '@/lib/utils/date';
import { AttendanceInputSection } from '../components/attendance-input-section';
import { AttendanceHistorySection } from '../components/attendance-history-section';
import { AttendanceFilterInput } from '../components/attendance-filter-input';
import { SCHEDULES } from '@/lib/db/seed-schedule';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { submitAttendance } from '../server';
import { format } from 'date-fns';
import { AttendanceFilterHistory } from '../components/attendance-filter-history';

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

  // INPUT ATTENDANCE
  const [classId, setClassId] = useState<number>(0);
  const [subjectId, setSubjectId] = useState<number>(0);
  const [statuses, setStatuses] = useState<Record<number, AttendanceStatus>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [scheduledTeacherStatus, setscheduledTeacherStatus] = useState('');
  const [substituteNotes, setSubstituteNotes] = useState('');
  const [substituteConfirmed, setSubstituteConfirmed] = useState(false);

  const teacherLabel = useMemo(() => TEACHERS.find((t) => t.id === teacherId)?.name, [teacherId]);

  const currentDate = useMemo(() => {
    const day = formatDate(new Date(), 'EEEE');
    const time = formatDate(new Date(), 'HH:mm');

    return {
      day,
      time,
    };
  }, []);

  const matchedSchedule = useMemo((): Schedule | null => {
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
    if (!isSubstituteMode || !matchedSchedule?.teacherId) return '';
    return TEACHERS.find((t) => t.id === matchedSchedule.teacherId)?.name ?? '';
  }, [isSubstituteMode, matchedSchedule]);

  const shouldShowStudentList = useMemo(() => {
    if (isSubstituteMode) {
      return Boolean(
        substituteConfirmed &&
        (scheduledTeacherStatus !== ATTENDANCE_STATUS.PERMISSION || substituteNotes.trim()),
      );
    }
    return classId > 0;
  }, [isSubstituteMode, substituteConfirmed, scheduledTeacherStatus, substituteNotes, classId]);

  const filteredStudents = useMemo(
    () => (shouldShowStudentList ? students.filter((s) => s.classId === classId) : []),
    [shouldShowStudentList, students, classId],
  );

  const subjectsByClass = useMemo((): SelectOption[] => {
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
        scheduledTeacherId: matchedSchedule?.teacherId ?? null,
        classId,
        subjectId,
        scheduleId: matchedSchedule?.id ?? 0,
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'hh:mm'),
        scheduledTeacherStatus: isSubstituteMode ? scheduledTeacherStatus : '',
        substituteNotes: isSubstituteMode ? substituteNotes.trim() : undefined,
        records: filteredStudents.map((student) => ({
          studentId: student.id,
          status: statuses[student.id],
          notes: notes[student.id] ?? '',
        })),
      });

      toast.success('Absensi berhasil disimpan');
      setActiveTab('history');
      onResetTab();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal menyimpan absensi. Silakan coba lagi.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChangeTab = (v: string) => {
    setActiveTab(v as Tab);
    onResetTab();
  };

  const onResetTab = () => {
    setClassId(0);
    setSubjectId(0);
    setStatuses({});
    setNotes({});
    setscheduledTeacherStatus('');
    setSubstituteNotes('');
    setSubstituteConfirmed(false);
  };

  const handleSubstituteConfirmed = () => {
    setSubstituteConfirmed(true);
  };

  const onSelectClass = (value: number) => {
    setClassId(Number(value));
    setSubjectId(0);
    setSubstituteConfirmed(false);
    setscheduledTeacherStatus('');
    setSubstituteNotes('');
  };

  const onSelectSubject = (value: number) => {
    setSubjectId(Number(value));
    setSubstituteConfirmed(false);
    setscheduledTeacherStatus('');
    setSubstituteNotes('');
  };

  const onSelectscheduledTeacherStatus = (value: string) => {
    setscheduledTeacherStatus(value);
    setSubstituteNotes('');
  };

  const onChangeSubstituteNotes = (value: string) => {
    setSubstituteNotes(value);

    if (!value) {
      setSubstituteConfirmed(false);
    }
  };

  // HISTORY ATTENDANCE
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [classFilter, setClassFilter] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState(0);

  const subjectOptions = useMemo(() => {
    const data = SUBJECTS.map((s) => ({ value: s.id, label: s.label })).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    return [{ value: 0, label: 'Semua' }, ...data];
  }, []);

  const handleDateChange = (date: Date | undefined) => {
    setDateFilter(date);
  };

  const handleClassChange = (value: number) => {
    setClassFilter(value);
  };

  const handleSubjectChange = (value: number) => {
    setSubjectFilter(value);
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Absensi</h1>

        <Card className="flex flex-wrap justify-between gap-x-2 text-sm text-secondary">
          <span className="font-medium text-primary">{teacherLabel}</span>
          <span className="text-secondary">{formatDate(new Date())}</span>
        </Card>

        <Tabs value={activeTab} onValueChange={onChangeTab}>
          <Tabs.Item value="input" icon={<Plus size={16} />}>
            Isi Absensi
          </Tabs.Item>

          <Tabs.Item value="history" icon={<History size={16} />}>
            Riwayat
          </Tabs.Item>
        </Tabs>

        {activeTab === 'input' && (
          <AttendanceFilterInput
            classes={classes}
            classId={classId}
            subjectsByClass={subjectsByClass}
            subjectId={subjectId}
            isSubstituteMode={isSubstituteMode}
            scheduledTeacherStatus={scheduledTeacherStatus}
            substituteNotes={substituteNotes}
            onSelectClass={onSelectClass}
            onSelectSubject={onSelectSubject}
            onSelectscheduledTeacherStatus={onSelectscheduledTeacherStatus}
            onChangeSubstituteNotes={onChangeSubstituteNotes}
            handleSubstituteConfirmed={handleSubstituteConfirmed}
          />
        )}

        {activeTab === 'history' && (
          <AttendanceFilterHistory
            classes={classes}
            subjectOptions={subjectOptions}
            classFilter={classFilter}
            subjectFilter={subjectFilter}
            dateFilter={dateFilter}
            handleClassChange={handleClassChange}
            handleSubjectChange={handleSubjectChange}
            handleDateChange={handleDateChange}
          />
        )}
      </PageLayout.Header>

      <PageLayout.Content>
        {activeTab === 'input' && (
          <AttendanceInputSection
            classId={classId}
            subjectsByClass={subjectsByClass}
            subjectId={subjectId}
            shouldShowStudentList={shouldShowStudentList}
            originalTeacherName={originalTeacherName}
            filteredStudents={filteredStudents}
            statuses={statuses}
            notes={notes}
            isSubmitting={isSubmitting}
            handleStatusChange={handleStatusChange}
            handleNotesChange={handleNotesChange}
            handleSubmit={handleSubmit}
          />
        )}

        {activeTab === 'history' && (
          <AttendanceHistorySection
            sessions={sessions}
            classes={classes}
            subjectOptions={subjectOptions}
            classFilter={classFilter}
            subjectFilter={subjectFilter}
            dateFilter={dateFilter}
          />
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
