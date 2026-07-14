import { Badge, Surface } from '@/components/ui';
import { ATTENDANCE_STATUS } from '@/features/attendance/types';

import type { AttendanceRecord } from '@/features/attendance/types';
import type { Student } from '@/features/students/types';

type AttendanceRecordRowProps = {
  record: AttendanceRecord;
  students: Student[];
};

const STATUS_BADGE: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  [ATTENDANCE_STATUS.PRESENT]: 'success',
  [ATTENDANCE_STATUS.SICK]: 'warning',
  [ATTENDANCE_STATUS.PERMISSION]: 'info',
  [ATTENDANCE_STATUS.ABSENT]: 'danger',
};

const STATUS_LABEL: Record<string, string> = {
  [ATTENDANCE_STATUS.PRESENT]: 'Hadir',
  [ATTENDANCE_STATUS.SICK]: 'Sakit',
  [ATTENDANCE_STATUS.PERMISSION]: 'Izin',
  [ATTENDANCE_STATUS.ABSENT]: 'Alpha',
};

export const AttendanceRecordRow = ({ record, students }: AttendanceRecordRowProps) => {
  const student = students.find((s) => s.id === record.studentId);
  console.log('🚀 ~ AttendanceRecordRow ~ students:', { students, student });

  return (
    <Surface className="flex items-center gap-4 p-4">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-primary">
            {student?.name ?? record.studentId}
          </span>

          {student && (
            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-secondary">
              {student.nis}
            </span>
          )}
        </div>

        {record.notes && <p className="text-xs text-secondary">{record.notes}</p>}
      </div>

      <Badge variant={STATUS_BADGE[record.status]} className="shrink-0">
        {STATUS_LABEL[record.status]}
      </Badge>
    </Surface>
  );
};
