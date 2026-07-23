import { notFound } from 'next/navigation';

import { getTeacherDetail } from '@/features/attendance/queries/teacher-attendance/get-teacher-detail';
import { getTeacherDetailData } from '@/features/attendance/queries/teacher-attendance/get-teacher-detail-data';
import { TeacherDetail } from '@/features/attendance/queries/teacher-attendance/components/teacher-detail';

type TeacherAttendanceReportDetailPageProps = {
  params: Promise<{ teacherId: string }>;
};

export async function TeacherAttendanceReportDetailPage({
  params,
}: TeacherAttendanceReportDetailPageProps) {
  const { teacherId } = await params;
  const teacher = await getTeacherDetail(teacherId);

  if (!teacher) {
    notFound();
  }

  const detailData = await getTeacherDetailData(teacher.id);

  return (
    <TeacherDetail
      teacher={teacher}
      sessionRows={detailData.sessionRows}
      monthlyReport={detailData.monthlyReport}
    />
  );
}
