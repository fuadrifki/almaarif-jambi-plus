import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';
import {
  attendanceSessionRepository,
  attendanceRecordRepository,
  studentRepository,
} from '@/lib/data';

import { AttendancePageClient } from '@/features/attendance/pages/attendance-page-client';
import { classRepository } from '@/lib/data/class-repository';

export default async function AttendancePage() {
  const session = await getSession();

  const classes = await classRepository.findAll();
  const classesOptions = classes.map((c) => ({ label: c.name, value: c.id }));

  if (!session) {
    redirect('/login');
  }

  const [students, sessions] = await Promise.all([
    studentRepository.findAll(),
    attendanceSessionRepository.findByTeacherId(session.id),
  ]);

  const sessionsWithRecords = await Promise.all(
    sessions.map(async (s) => {
      const records = await attendanceRecordRepository.findBySessionId(s.id);
      return { ...s, records };
    }),
  );

  return (
    <AttendancePageClient
      teacherId={session.id}
      teacherName={session.name}
      students={students}
      sessions={sessionsWithRecords}
      classes={classesOptions}
    />
  );
}
