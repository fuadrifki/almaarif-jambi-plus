'use client';

import { RadioGroup, RadioItem, Textarea } from '@/components/ui';

import type { AttendanceStatus } from '../types';
import type { Student } from '@/features/students/types';

type AttendanceStudentRowProps = {
  student: Student;
  status: AttendanceStatus | undefined;
  notes: string;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onNotesChange: (studentId: string, notes: string) => void;
};

export const AttendanceStudentRow = ({
  student,
  status,
  notes,
  onStatusChange,
  onNotesChange,
}: AttendanceStudentRowProps) => (
  <div className="space-y-3 rounded-xl border border-white/10 p-4">
    <div className="flex items-center gap-3">
      <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-secondary">
        {student.nis}
      </span>

      <span className="truncate text-sm font-medium text-primary">{student.name}</span>
    </div>

    <RadioGroup
      value={status}
      onValueChange={(value) => onStatusChange(student.id, value as AttendanceStatus)}
      className="flex flex-wrap gap-3"
    >
      <RadioItem value="PRESENT">Hadir</RadioItem>

      <RadioItem value="SICK">Sakit</RadioItem>

      <RadioItem value="PERMISSION">Izin</RadioItem>

      <RadioItem value="ABSENT">Alpha</RadioItem>
    </RadioGroup>

    <Textarea
      placeholder="Catatan (opsional)"
      value={notes}
      onChange={(e) => onNotesChange(student.id, e.target.value)}
      size="sm"
      resize="none"
      rows={1}
    />
  </div>
);
