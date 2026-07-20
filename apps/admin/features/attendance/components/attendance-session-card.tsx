import Link from 'next/link';

import { Badge, SelectOption, Surface } from '@/components/ui';
import { ATTENDANCE_STATUS, ATTENDANCE_STATUS_OPTIONS } from '@/features/attendance/types';

import type { AttendanceRecord, AttendanceSession } from '@/features/attendance/types';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type AttendanceSessionCardProps = {
  session: AttendanceSession;
  records: AttendanceRecord[];
  classes: SelectOption[];
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

export const AttendanceSessionCard = ({
  session,
  records,
  classes,
}: AttendanceSessionCardProps) => {
  const className = classes.find((c) => c.value === session.classId)?.label;

  const subjectName = SUBJECTS.find((s) => s.id === session.subjectId)?.label;

  const total = records.length;
  const present = records.filter((r) => r.status === ATTENDANCE_STATUS.PRESENT).length;
  const sick = records.filter((r) => r.status === ATTENDANCE_STATUS.SICK).length;
  const permission = records.filter((r) => r.status === ATTENDANCE_STATUS.PERMISSION).length;
  const absent = records.filter((r) => r.status === ATTENDANCE_STATUS.ABSENT).length;

  const isSubstitute = session.originalTeacherStatus !== null;
  const originalTeacherLabel = isSubstitute
    ? ATTENDANCE_STATUS_OPTIONS.find((o) => o.value === session.originalTeacherStatus!)?.label
    : null;

  return (
    <Link href={`/dashboard/attendance/${session.id}`} className="block">
      <Surface className="space-y-3 p-4 transition hover:border-white/20">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm text-primary font-bold">
              <span>{className}</span> &middot;{' '}
              <span className="font-medium text-secondary">{subjectName}</span>
            </p>

            <p className="text-xs text-secondary">
              {format(new Date(session.date), 'EEEE, dd MMMM yyyy', { locale: id })} &middot;{' '}
              {session.time} WIB
            </p>

            {isSubstitute && (
              <p className="text-xs text-amber-400">Pengganti &middot; {originalTeacherLabel}</p>
            )}
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

          {isSubstitute && <Badge variant="warning">Pengganti</Badge>}
        </div>
      </Surface>
    </Link>
  );
};
