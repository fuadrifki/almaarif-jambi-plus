import { notFound } from 'next/navigation';

import { ReportListPageClient } from './report-list-page-client';
import { getAttendanceReport } from '../../queries/get-attendance-report';
import { classRepository } from '@/features/classes/repositories';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { TEACHERS } from '@/lib/db/seed-teachers';

import type { ReportFilter } from '../../queries/types';

type AttendanceReportsPageProps = {
  search: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function parseStringParam(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  return undefined;
}

function parseNumberParam(value: string | string[] | undefined): number | undefined {
  const str = parseStringParam(value);
  if (str) {
    const num = Number(str);
    if (!Number.isNaN(num)) {
      return num;
    }
  }
  return undefined;
}

export async function AttendanceReportsPage({ search }: AttendanceReportsPageProps) {
  const searchParams = await search;

  const filter: ReportFilter = {
    month: parseStringParam(searchParams?.month) ?? getCurrentMonth(),
    classId: parseNumberParam(searchParams?.classId),
    teacherId: parseNumberParam(searchParams?.teacherId),
    subjectId: parseNumberParam(searchParams?.subjectId),
    status: parseStringParam(searchParams?.status),
  };

  const [report, classes] = await Promise.all([
    getAttendanceReport(filter),
    classRepository.findAll(),
  ]);

  if (!report) {
    notFound();
  }

  const teachers = TEACHERS.filter((t) => t.role === 'teacher').map((t) => ({
    id: t.id,
    name: t.name,
  }));

  const subjects = SUBJECTS.map((s) => ({
    id: s.id,
    name: s.label,
  }));

  return (
    <ReportListPageClient
      report={report}
      classes={classes}
      teachers={teachers}
      subjects={subjects}
    />
  );
}
