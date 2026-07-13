'use client';

import { useMemo, useState } from 'react';

import { Button, EmptyState, PageLayout, Select, Surface, toast } from '@/components/ui';
import { ClipboardCheck } from 'lucide-react';

import { CLASSES, SUBJECTS, TEACHERS } from '@/config/lookups';

import { AttendanceStudentRow } from '../components/attendance-student-row';
import { submitAttendance } from '../server';

import type { AttendanceStatus } from '../types';
import type { Student } from '@/features/students/types';

type AttendancePageClientProps = {
  teacherId: string;
  teacherName: string;
  students: Student[];
};

export const AttendancePageClient = ({
  teacherId,
  teacherName,
  students,
}: AttendancePageClientProps) => {
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

  const filteredStudents = useMemo(
    () => (classId ? students.filter((s) => s.classId === classId) : []),
    [students, classId],
  );

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

        <Surface className="flex flex-wrap gap-x-6 gap-y-2 p-4 text-sm text-secondary">
          <span>{displayDate}</span>

          <span>{time}</span>

          <span className="font-medium text-primary">{teacherLabel}</span>
        </Surface>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Kelas <span className="ml-1 text-red-400">*</span>
            </label>

            <Select
              options={CLASSES}
              value={classId}
              placeholder="Pilih kelas"
              onChange={setClassId}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Mata Pelajaran <span className="ml-1 text-red-400">*</span>
            </label>

            <Select
              options={SUBJECTS}
              value={subjectId}
              placeholder="Pilih mata pelajaran"
              onChange={setSubjectId}
            />
          </div>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
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
          <div className="space-y-3">
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
      </PageLayout.Content>

      <PageLayout.Footer>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!classId || !subjectId || filteredStudents.length === 0}
            status={isSubmitting ? 'loading' : 'idle'}
          >
            Simpan Absensi
          </Button>
        </div>
      </PageLayout.Footer>
    </PageLayout>
  );
};
