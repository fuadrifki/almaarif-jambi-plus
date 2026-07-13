import Link from 'next/link';

import { Badge, Surface } from '@/components/ui';
import { ATTENDANCE_STATUS } from '@/features/attendance/types';
import { CLASSES, SUBJECTS } from '@/config/lookups';

import type { AttendanceRecord, AttendanceSession } from '@/features/attendance/types';

type AttendanceSessionCardProps = {
  session: AttendanceSession;
  records: AttendanceRecord[];
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

export const AttendanceSessionCard = ({ session, records }: AttendanceSessionCardProps) => {
  const className = CLASSES.find((c) => c.value === session.classId)?.label ?? session.classId;
  const subjectName =
    SUBJECTS.find((s) => s.value === session.subjectId)?.label ?? session.subjectId;

  const total = records.length;
  const present = records.filter((r) => r.status === ATTENDANCE_STATUS.PRESENT).length;
  const sick = records.filter((r) => r.status === ATTENDANCE_STATUS.SICK).length;
  const permission = records.filter((r) => r.status === ATTENDANCE_STATUS.PERMISSION).length;
  const absent = records.filter((r) => r.status === ATTENDANCE_STATUS.ABSENT).length;

  const displayDate = new Date(session.date + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/attendance/history/${session.id}`} className="block">
      <Surface className="space-y-3 p-4 transition hover:border-white/20">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">
              {className} &middot; {subjectName}
            </p>

            <p className="text-xs text-secondary">
              {displayDate} &middot; {session.time} WIB
            </p>
          </div>

          <span className="shrink-0 text-xs text-secondary">{total} siswa</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { status: ATTENDANCE_STATUS.PRESENT, count: present },
            { status: ATTENDANCE_STATUS.SICK, count: sick },
            { status: ATTENDANCE_STATUS.PERMISSION, count: permission },
            { status: ATTENDANCE_STATUS.ABSENT, count: absent },
          ].map(({ status, count }) => (
            <Badge key={status} variant={STATUS_BADGE[status]}>
              {STATUS_LABEL[status]} {count}
            </Badge>
          ))}
        </div>
      </Surface>
    </Link>
  );
};
