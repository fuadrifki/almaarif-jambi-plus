import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

import {
  attendanceSessionRepository,
  attendanceRecordRepository,
} from '@/features/attendance/repositories';

import { AttendanceDetailPageClient } from '@/features/attendance/pages/attendance-detail-page-client';
import { studentRepository } from '@/features/students/repositories';
import { classRepository } from '@/features/classes/repositories';

export default async function AttendanceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const attendanceSession = await attendanceSessionRepository.findById(id);

  if (!attendanceSession || attendanceSession.teacherId !== session.id) {
    redirect('/dashboard/attendance');
  }

  const [records, students, classes] = await Promise.all([
    attendanceRecordRepository.findBySessionId(Number(id)),
    studentRepository.findAll(),
    classRepository.findAll(),
  ]);

  return (
    <AttendanceDetailPageClient
      session={attendanceSession}
      records={records}
      students={students}
      classes={classes}
    />
  );
}
