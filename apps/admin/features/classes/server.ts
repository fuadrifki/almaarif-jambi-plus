'use server';

import { revalidatePath } from 'next/cache';
import type { ClassFormData } from './schemas';
import { Class } from './types';
import { classRepository } from '@/features/classes/repositories';

export const createClass = async (data: ClassFormData) => {
  const existing = await classRepository.findByCode(data.code);

  if (existing) {
    throw new Error('Kode kelas sudah digunakan');
  }

  await classRepository.create(data as Class);

  revalidatePath('/classes');

  return { success: true };
};

export const updateClass = async (id: string, data: ClassFormData) => {
  const existing = await classRepository.findById(id);

  if (!existing) {
    throw new Error('Kelas tidak ditemukan');
  }

  const duplicate = await classRepository.findByCode(data.code);

  if (duplicate && duplicate.id !== id) {
    throw new Error('Kode kelas sudah digunakan');
  }

  await classRepository.update(id, data);

  revalidatePath('/classes');
};

export const deleteClass = async (id: string) => {
  const referenced = await classRepository.checkReferenced(id);

  if (referenced.students > 0 || referenced.attendanceSessions > 0) {
    throw new Error(
      `Tidak dapat menghapus kelas. ${referenced.students} siswa dan ${referenced.attendanceSessions} sesi attendance masih merujuk ke kelas ini.`,
    );
  }

  const deleted = await classRepository.delete(id);

  if (!deleted) {
    throw new Error('Kelas tidak ditemukan');
  }

  revalidatePath('/classes');
};
