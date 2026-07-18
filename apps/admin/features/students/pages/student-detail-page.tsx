import { notFound } from 'next/navigation';

import { classRepository } from '@/features/classes/repositories/index';
import { studentRepository } from '@/features/students/repositories/index';

import { StudentDetail } from '@/features/students/components/student-detail';

type StudentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const StudentDetailPage = async ({ params }: StudentDetailPageProps) => {
  const { id } = await params;
  const student = await studentRepository.findById(id);

  if (!student) {
    notFound();
  }

  const classData = await classRepository.findById(student.classId.toString());

  return <StudentDetail student={student} classData={classData} />;
};
