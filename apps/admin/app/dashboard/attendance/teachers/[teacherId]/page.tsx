import { notFound } from 'next/navigation';

import { getTeacherDetail } from '@/features/attendance/queries/teacher-attendance/get-teacher-detail';
import { TeacherDetail } from '@/features/attendance/queries/teacher-attendance/components/teacher-detail';

type TeacherDetailPageProps = {
  params: Promise<{ teacherId: string }>;
};

export default async function TeacherDetailPage({ params }: TeacherDetailPageProps) {
  const { teacherId } = await params;
  const data = await getTeacherDetail(teacherId);

  if (!data) {
    notFound();
  }

  return (
    <TeacherDetail
      teacher={data.teacher}
      history={data.history}
      report={data.report}
      summary={data.summary}
    />
  );
}
