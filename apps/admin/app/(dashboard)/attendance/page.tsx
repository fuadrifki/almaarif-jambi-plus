import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';
import { studentRepository } from '@/lib/data';

import { AttendancePageClient } from '@/features/attendance/pages/attendance-page-client';

export default async function AttendancePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const students = await studentRepository.findAll();

  return (
    <AttendancePageClient teacherId={session.id} teacherName={session.name} students={students} />
  );
}
