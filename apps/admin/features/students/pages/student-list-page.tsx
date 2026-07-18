import { studentRepository } from '@/features/students/repositories/index';

import { StudentListPageClient } from './student-list-page-client';
import { classRepository } from '@/features/classes/repositories';
import { getPermissions } from '@/lib/permissions';

import { getSession } from '@/lib/auth';

export const StudentListPage = async () => {
  const session = await getSession();
  const permissions = getPermissions(session?.role || 'admin');

  const students = await studentRepository.findAll();
  const classes = await classRepository.findAll();

  return <StudentListPageClient students={students} classes={classes} permissions={permissions} />;
};
