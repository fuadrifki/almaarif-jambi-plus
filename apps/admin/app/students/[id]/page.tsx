import { notFound } from 'next/navigation';

import { classRepository } from '@/features/classes/repositories';
import { studentRepository } from '@/features/students/repositories';
import { getStudentAttendanceHistory } from '@/features/students/queries/get-student-attendance-history';
import { getStudentAttendanceReport } from '@/features/students/queries/get-student-attendance-report';
import { StudentDetail } from '@/features/students/components/student-detail';

type StudentDetailPublicPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudentDetailPublicPage({ params }: StudentDetailPublicPageProps) {
  const { id } = await params;
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
      basePath="/students"
      showEditButton={false}
      isPublic
    />
  );
}
