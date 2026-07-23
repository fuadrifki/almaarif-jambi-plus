'use client';

import {
  Badge,
  RadioGroup,
  RadioItem,
  Card,
  Textarea,
  Popover,
  PopoverContent,
} from '@/components/ui';

import type { AttendanceStatus } from '../types';
import type { Student } from '@/features/students/types';
import { PopoverAnchor, PopoverTrigger } from '@radix-ui/react-popover';
import { useState } from 'react';

type AttendanceStudentCardProps = {
  student: Student;
  status: AttendanceStatus | undefined;
  notes: string;
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
  onNotesChange: (studentId: number, notes: string) => void;
};

export const AttendanceStudentCard = ({
  student,
  status,
  notes,
  onStatusChange,
  onNotesChange,
}: AttendanceStudentCardProps) => {
  const [openPermissionNotes, setOpenPermissionNotes] = useState(false);

  return (
    <Card hoverable className="p-4 flex flex-col gap-y-2 max-h-max">
      <div className="flex items-center gap-3">
        <Badge variant="info" className="text-xs text-secondary px-2">
          {student.nis}
        </Badge>

        <span className="truncate text-sm font-semibold text-primary">{student.name}</span>
      </div>

      <RadioGroup
        value={status}
        onValueChange={(value) => onStatusChange(student.id, value as AttendanceStatus)}
        className="flex flex-wrap gap-1"
      >
        <RadioItem value="PRESENT">Hadir</RadioItem>

        <RadioItem value="SICK">Sakit</RadioItem>

        <RadioItem value="ABSENT">Alpha</RadioItem>

        <RadioItem value="PERMISSION" onClick={() => setOpenPermissionNotes(true)}>
          Izin
        </RadioItem>

        <Popover open={openPermissionNotes} onOpenChange={setOpenPermissionNotes}>
          <PopoverAnchor />
          <PopoverContent className="w-80 p-4 space-y-4">
            {status === 'PERMISSION' && (
              <Textarea
                placeholder="Catatan izin"
                value={notes}
                onChange={(e) => onNotesChange(student.id, e.target.value)}
                size="sm"
                resize="none"
                rows={1}
              />
            )}
          </PopoverContent>
        </Popover>
      </RadioGroup>
    </Card>
  );
};
