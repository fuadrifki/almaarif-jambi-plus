import { Badge, Card } from '@/components/ui';
import { ATTENDANCE_STATUS } from '@/features/attendance/types';

import type { AttendanceRecord } from '@/features/attendance/types';
import type { Student } from '@/features/students/types';
import { FilePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="min-w-0 flex-1 flex items-center gap-2">
        <div className="shrink-0">
          {student?.photoUrl ? (
            <Card className="rounded-full!">
              <Card className="flex w-max h-max items-center justify-center rounded-full! text-sm font-semibold text-primary p-0">
                <Image
                  src={student.photoUrl}
                  alt={student.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </Card>
            </Card>
          ) : (
            <Card className="rounded-full!">
              <Card className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-secondary">
                {student?.name.charAt(0).toUpperCase()}
              </Card>
            </Card>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/students/${record.studentId}`}>
              <span className="truncate text-sm font-medium text-primary">
                {student?.name ?? record.studentId}
              </span>
            </Link>

            {student && (
              <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-secondary">
                {student.nis}
              </span>
            )}
          </div>

          {record.notes && (
            <div className="flex items-center gap-1.5">
              <FilePen size={12} className="shrink-0" />

              <p className="text-xs text-secondary">{record.notes}</p>
            </div>
          )}
        </div>
      </div>

      <Badge variant={STATUS_BADGE[record.status]} className="shrink-0">
        {STATUS_LABEL[record.status]}
      </Badge>
    </Card>
  );
};
