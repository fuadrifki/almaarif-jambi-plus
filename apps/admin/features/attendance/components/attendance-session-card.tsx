import Link from 'next/link';

import { Badge, SelectOption, Card } from '@/components/ui';
import { ATTENDANCE_STATUS, ATTENDANCE_STATUS_OPTIONS } from '@/features/attendance/types';

import type { AttendanceRecord, AttendanceSession } from '@/features/attendance/types';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { formatDate } from '@/lib/utils/date';
import { Ban, Calendar1, Dot } from 'lucide-react';
import { parse } from 'date-fns';

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

  const subject = SUBJECTS.find((s) => s.id === session.subjectId);

  const total = records.length;
  const present = records.filter((r) => r.status === ATTENDANCE_STATUS.PRESENT).length;
  const sick = records.filter((r) => r.status === ATTENDANCE_STATUS.SICK).length;
  const permission = records.filter((r) => r.status === ATTENDANCE_STATUS.PERMISSION).length;
  const absent = records.filter((r) => r.status === ATTENDANCE_STATUS.ABSENT).length;

  const isSubstitute =
    session.scheduledTeacherId && session.scheduledTeacherId !== session?.teacherId;

  const isAssigned = !session.scheduledTeacherId;

  const isSubjectTeacher =
    session.scheduledTeacherId && session.scheduledTeacherId === session?.teacherId;

  const originalTeacherLabel = isSubstitute
    ? ATTENDANCE_STATUS_OPTIONS.find((o) => o.value === session.scheduledTeacherStatus!)?.label
    : null;

  return (
    <Link href={`/dashboard/attendance/${session.id}`} className="block">
      <Card hoverable className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm text-primary font-bold flex flex-wrap items-center space-y-1">
              <span>{className}</span>

              <Dot size={20} className="shrink-0" />

              <span className="font-medium text-secondary">{subject?.label}</span>

              {isSubstitute && (
                <>
                  <Dot size={20} className="shrink-0" />
                  <Badge variant="info" className="w-max">
                    Pengganti
                  </Badge>
                </>
              )}

              {isAssigned && (
                <>
                  <Dot size={20} className="shrink-0" />
                  <Badge variant="warning" className="w-max">
                    Ditugaskan
                  </Badge>
                </>
              )}

              {isSubjectTeacher && (
                <>
                  <Dot size={20} className="shrink-0" />
                  <Badge variant="success" className="w-max">
                    Ustad mata pelajaran
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <Calendar1 size={12} className="shrink-0" />

              <span>
                {formatDate(
                  parse(`${session.date} ${session.time}`, 'yyyy-MM-dd HH:mm', new Date()),
                )}
              </span>
            </div>

            {isSubstitute && (
              <div className="flex items-start gap-1.5 text-xs text-secondary">
                <Ban size={12} className="shrink-0 mt-0.5" />

                <div className="text-xs text-secondary">
                  <span>Keterangan berhalangan : </span>
                  <span className="font-medium">
                    {originalTeacherLabel}{' '}
                    {`${session.substituteNotes ? `(${session.substituteNotes})` : ''}`}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end justify-center space-y-2">
            <span className="shrink-0 text-sm text-secondary font-semibold">{total} santri</span>
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
          </div>
        </div>
      </Card>
    </Link>
  );
};
