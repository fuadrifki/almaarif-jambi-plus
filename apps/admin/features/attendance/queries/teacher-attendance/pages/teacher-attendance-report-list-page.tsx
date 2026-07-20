import { format } from 'date-fns';
import { notFound } from 'next/navigation';

import { classRepository } from '@/features/classes/repositories';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';

import { TeacherAttendanceReportListPageClient } from './teacher-attendance-report-list-page-client';
import { TeacherAttendanceFilter } from '@/features/attendance/repositories/teacher-attendance.repository.types';
import { getTeacherAttendanceReport } from '../get-teacher-attendance-report';

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
    month: getParam(params.month) ?? format(new Date(), 'yyyy-MM'),
    classId: getNumberParam(params.classId),
    teacherId: getNumberParam(params.teacherId),
    subjectId: getNumberParam(params.subjectId),
  };

  const [report, classes] = await Promise.all([
    getTeacherAttendanceReport(filter),
    classRepository.findAll(),
  ]);

  if (!report || report.total === 0) {
    notFound();
  }

  return (
    <TeacherAttendanceReportListPageClient
      key={Object.values(filter).join('-')}
      report={report}
      classes={classes}
      teachers={TEACHERS.filter(({ role }) => role === 'teacher').map(({ id, name }) => ({
        id,
        name,
      }))}
      subjects={SUBJECTS.map(({ id, label }) => ({
        id,
        name: label,
      }))}
    />
  );
}
