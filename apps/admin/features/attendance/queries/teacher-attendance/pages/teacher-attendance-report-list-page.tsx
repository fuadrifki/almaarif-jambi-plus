import { TEACHERS } from '@/lib/db/seed-teachers';

import { TeacherAttendanceReportListPageClient } from './teacher-attendance-report-list-page-client';
import type { TeacherAttendanceFilter } from '@/features/attendance/repositories/teacher-attendance.repository.types';
import type { TeacherRole } from '@/features/attendance/types';
import { getTeacherAttendanceSessionList } from '../get-teacher-attendance-session-list';

type TeacherAttendanceReportsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getParam = (value: string | string[] | undefined) =>
  typeof value === 'string' && value ? value : undefined;

const getNumberParam = (value: string | string[] | undefined) => {
  const number = Number(getParam(value));

  return Number.isNaN(number) ? undefined : number;
};

export async function TeacherAttendanceReportsPage({
  searchParams,
}: TeacherAttendanceReportsPageProps) {
  const params = await searchParams;

  const filter: TeacherAttendanceFilter = {
    search: getParam(params.search),
    date: getParam(params.date),
    month: getParam(params.month),
    teacherId: getNumberParam(params.teacherId),
    classId: getNumberParam(params.classId),
    subjectId: getNumberParam(params.subjectId),
    attendanceStatus: getParam(params.attendanceStatus),
    teachingRole: getParam(params.teachingRole) as TeacherRole | undefined,
  };

  const { rows, classes, subjects } = await getTeacherAttendanceSessionList(filter);

  return (
    <TeacherAttendanceReportListPageClient
      key={Object.values(filter).join('-')}
      rows={rows}
      teachers={TEACHERS.filter(({ role }) => role === 'teacher').map(({ id, name }) => ({
        id,
        name,
      }))}
      classes={classes}
      subjects={subjects}
    />
  );
}
