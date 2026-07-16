import { studentRepository } from '@/features/students/repositories/index';

import { StudentListPageClient } from './student-list-page-client';
import { classRepository } from '@/features/classes/repositories';

export const StudentListPage = async () => {
  const students = await studentRepository.findAll();
  const classes = await classRepository.findAll();

  return <StudentListPageClient students={students} classes={classes} />;
};
