'use server';

import { revalidatePath } from 'next/cache';
import { studentRepository } from '@/features/students/repositories/index';
import type { StudentFormData } from './schemas';

export const createStudent = async (data: StudentFormData) => {
  const existing = await studentRepository.findByNis(data.nis);

  if (existing) {
    throw new Error('NIS sudah terdaftar');
  }

  await studentRepository.create(data);

  revalidatePath('/students');

  return { success: true };
};

export const updateStudent = async (id: string, data: StudentFormData) => {
  const existing = await studentRepository.findById(id);

  if (!existing) {
    throw new Error('Siswa tidak ditemukan');
  }

  const duplicate = await studentRepository.findByNis(data.nis);

  if (duplicate && duplicate.id !== Number(id)) {
    throw new Error('NIS sudah terdaftar');
  }

  await studentRepository.update(id, data);

  revalidatePath('/students');
};

export const deleteStudent = async (id: string) => {
  const deleted = await studentRepository.delete(id);

  if (!deleted) {
    throw new Error('Siswa tidak ditemukan');
  }

  revalidatePath('/students');
};
