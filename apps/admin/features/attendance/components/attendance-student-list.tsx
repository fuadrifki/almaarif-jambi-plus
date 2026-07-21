'use client';

import { Badge, RadioGroup, RadioItem, Card, Textarea } from '@/components/ui';

import type { AttendanceStatus } from '../types';
import type { Student } from '@/features/students/types';

type AttendanceStudentListProps = {
  students: Student[];
  statuses: Record<number, AttendanceStatus>;
  notes: Record<number, string>;
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
  onNotesChange: (studentId: number, notes: string) => void;
};

export const AttendanceStudentList = ({
  students,
  statuses,
  notes,
  onStatusChange,
  onNotesChange,
}: AttendanceStudentListProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
      {students.map((student) => (
        <Card key={student.id} className="p-4 flex flex-col gap-y-2 max-h-max">
          <div className="flex items-center gap-3">
            <Badge variant="info" className="text-xs text-secondary px-2">
              {student.nis}
            </Badge>

            <span className="truncate text-sm font-semibold text-primary">{student.name}</span>
          </div>

          <RadioGroup
            value={statuses[student.id]}
            onValueChange={(value) => onStatusChange(student.id, value as AttendanceStatus)}
            className="flex flex-wrap gap-1"
          >
            <RadioItem value="PRESENT">Hadir</RadioItem>

            <RadioItem value="SICK">Sakit</RadioItem>

            <RadioItem value="ABSENT">Alpha</RadioItem>

            <RadioItem value="PERMISSION">Izin</RadioItem>
          </RadioGroup>

          {statuses[student.id] === 'PERMISSION' && (
            <Textarea
              placeholder="Catatan izin"
              value={notes[student.id] || ''}
              onChange={(e) => onNotesChange(student.id, e.target.value)}
              size="sm"
              resize="none"
              rows={1}
            />
          )}
        </Card>
      ))}
    </div>
  );
};
