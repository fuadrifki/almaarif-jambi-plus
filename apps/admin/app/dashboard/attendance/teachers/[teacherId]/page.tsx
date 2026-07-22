import { notFound } from 'next/navigation';

import { getTeacherDetail } from '@/features/attendance/queries/teacher-attendance/get-teacher-detail';
import { getTeacherAttendanceHistory } from '@/features/attendance/queries/teacher-attendance/get-teacher-attendance-history';
import { getTeacherAttendanceReport } from '@/features/attendance/queries/teacher-attendance/get-teacher-attendance-report';
import { TeacherDetail } from '@/features/attendance/queries/teacher-attendance/components/teacher-detail';

type TeacherDetailPageProps = {
  params: Promise<{ teacherId: string }>;
};

export default async function TeacherDetailPage({ params }: TeacherDetailPageProps) {
  const { teacherId } = await params;
  const teacher = await getTeacherDetail(teacherId);

  if (!teacher) {
    notFound();
  }

  const [attendanceHistory, attendanceReport] = await Promise.all([
    getTeacherAttendanceHistory({ teacherId }),
    getTeacherAttendanceReport({ teacherId: teacher.id, allDates: true }),
  ]);

  return (
    <TeacherDetail
      teacher={teacher}
      attendanceHistory={attendanceHistory.rows}
      attendanceReport={attendanceReport}
    />
  );
}
