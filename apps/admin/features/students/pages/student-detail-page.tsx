import { notFound } from 'next/navigation';

import { classRepository } from '@/features/classes/repositories';
import { studentRepository } from '@/features/students/repositories';
import { getStudentAttendanceHistory } from '@/features/students/queries/get-student-attendance-history';
import { getStudentAttendanceReport } from '@/features/students/queries/get-student-attendance-report';
import { getSession } from '@/lib/auth';
import { getPermissions } from '@/lib/permissions';

import { StudentDetail } from '@/features/students/components/student-detail';

type StudentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const StudentDetailPage = async ({ params }: StudentDetailPageProps) => {
  const { id } = await params;
  const session = await getSession();
  const permissions = getPermissions(session?.role || 'admin');
  const student = await studentRepository.findById(id);

  if (!student) {
    notFound();
  }

  const classData = await classRepository.findById(student.classId.toString());

  const [attendanceHistory, attendanceReport] = await Promise.all([
    getStudentAttendanceHistory({ studentId: id }),
    getStudentAttendanceReport({ studentId: id }),
  ]);

  return (
    <StudentDetail
      student={student}
      classData={classData}
      attendanceHistory={attendanceHistory.rows}
      attendanceReport={attendanceReport.rows}
      permissions={permissions}
    />
  );
};
