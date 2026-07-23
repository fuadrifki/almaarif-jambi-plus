'use client';

import { Button, EmptyState, SelectOption, Card } from '@/components/ui';
import { ClipboardCheck } from 'lucide-react';
import type { Student } from '@/features/students/types';
import { AttendanceStudentCard } from './attendance-student-card';
import { AttendanceStatus } from '../types';
import { useMemo } from 'react';

type AttendanceInputSectionProps = {
  classId: number;
  subjectsByClass: SelectOption[];
  subjectId: number;
  shouldShowStudentList: boolean;
  originalTeacherName: string;
  filteredStudents: Student[];
  statuses: Record<number, AttendanceStatus>;
  notes: Record<number, string>;
  isSubmitting: boolean;
  handleStatusChange: (studentId: number, status: AttendanceStatus) => void;
  handleNotesChange: (studentId: number, notes: string) => void;
  handleSubmit: () => void;
};

export const AttendanceInputSection = ({
  classId,
  subjectsByClass,
  subjectId,
  shouldShowStudentList,
  originalTeacherName,
  filteredStudents,
  statuses,
  notes,
  isSubmitting,
  handleStatusChange,
  handleNotesChange,
  handleSubmit,
}: AttendanceInputSectionProps) => {
  const isSubmitDisabled = useMemo(() => {
    const hasInvalidPermission = Object.entries(statuses).some(
      ([studentId, status]) => status === 'PERMISSION' && !notes[Number(studentId)]?.trim(),
    );

    return Object.keys(statuses).length !== filteredStudents.length || hasInvalidPermission;
  }, [statuses, notes, filteredStudents.length]);

  return (
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
        <Card className="p-4 space-y-2">
          <p className="text-secondary">Anda akan mengajar sebagai Guru Pengganti.</p>
          <p className="text-secondary">
            Guru sesuai jadwal:
            <span className="font-medium text-primary"> {originalTeacherName}</span>
          </p>

          <p className="text-secondary">
            Silakan isi keterangan guru asli terlebih dahulu sebelum memulai absensi.
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredStudents.map((student) => (
              <AttendanceStudentCard
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
              disabled={isSubmitDisabled}
              status={isSubmitting ? 'loading' : 'idle'}
            >
              Simpan Absensi
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
