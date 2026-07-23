'use server';

import { searchStudent as searchStudentServerAction } from '@/features/students/server';

export async function searchStudent(formData: FormData) {
  const student = await searchStudentServerAction(formData);

  return {
    id: student.id,
  };
}
