import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

import {
  attendanceSessionRepository,
  attendanceRecordRepository,
} from '@/features/attendance/repositories/';

import { AttendanceDetailPageClient } from '@/features/attendance/pages/attendance-detail-page-client';
import { studentRepository } from '@/features/students/repositories';

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
    redirect('/attendance');
  }

  const [records, students] = await Promise.all([
    attendanceRecordRepository.findBySessionId(id),
    studentRepository.findAll(),
  ]);

  return (
    <AttendanceDetailPageClient session={attendanceSession} records={records} students={students} />
  );
}
