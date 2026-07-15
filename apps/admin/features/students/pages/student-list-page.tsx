import { studentRepository } from '@/features/students/repositories/index';

import { StudentListPageClient } from './student-list-page-client';

export const StudentListPage = async () => {
  const students = await studentRepository.findAll();

  return <StudentListPageClient students={students} />;
};
