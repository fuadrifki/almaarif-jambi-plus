import { teacherRepository } from '@/features/teachers/repositories';

import type { Teacher } from '@/features/teachers/types';

export type TeacherDetailProfile = Pick<
  Teacher,
  | 'id'
  | 'code'
  | 'name'
  | 'email'
  | 'photo'
  | 'birthPlace'
  | 'birthDate'
  | 'address'
  | 'phone'
  | 'formalEducation'
  | 'boardingEducation'
  | 'position'
>;

export const getTeacherDetail = async (teacherId: string): Promise<TeacherDetailProfile | null> => {
  const numericId = Number(teacherId);

  if (Number.isNaN(numericId)) {
    return null;
  }

  const teacher = await teacherRepository.findById(numericId);

  if (!teacher) {
    return null;
  }

  return {
    id: teacher.id,
    code: teacher.code,
    name: teacher.name,
    email: teacher.email,
    photo: teacher.photo,
    birthPlace: teacher.birthPlace,
    birthDate: teacher.birthDate,
    address: teacher.address,
    phone: teacher.phone,
    formalEducation: teacher.formalEducation,
    boardingEducation: teacher.boardingEducation,
    position: teacher.position,
  };
};
