import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';
import { attendanceSessionRepository, attendanceRecordRepository } from '@/lib/data';

import { AttendanceHistoryPageClient } from '@/features/attendance/pages/attendance-history-page-client';

export default async function AttendanceHistoryPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const sessions = await attendanceSessionRepository.findByTeacherId(session.id);

  const sessionsWithRecords = await Promise.all(
    sessions.map(async (s) => {
      const records = await attendanceRecordRepository.findBySessionId(s.id);
      return { ...s, records };
    }),
  );

  return <AttendanceHistoryPageClient sessions={sessionsWithRecords} />;
}
