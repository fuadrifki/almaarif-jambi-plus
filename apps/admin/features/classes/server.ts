'use server';

import { revalidatePath } from 'next/cache';
import { generateClassName } from '@/lib/utils';

import type { ClassFormData } from './schemas';
import type { UpdateClassData } from './repositories/class.repository.types';
import { classRepository } from '@/features/classes/repositories';

export const createClass = async (data: ClassFormData) => {
  const existing = await classRepository.findByCode(data.code);

  if (existing) {
    throw new Error('Kode kelas sudah digunakan');
  }

  const name = generateClassName(data.level, data.academicLevel, data.gender);

  await classRepository.create({
    code: data.code,
    name,
    level: Number(data.level),
    academicLevel: data.academicLevel,
    gender: data.gender,
    description: data.description,
  });

  revalidatePath('/classes');

  return { success: true };
};

export const updateClass = async (id: string, data: ClassFormData) => {
  const existing = await classRepository.findById(id);

  if (!existing) {
    throw new Error('Kelas tidak ditemukan');
  }

  const duplicate = await classRepository.findByCode(data.code);

  if (duplicate && duplicate.id !== Number(id)) {
    throw new Error('Kode kelas sudah digunakan');
  }

  const name = generateClassName(data.level, data.academicLevel, data.gender);

  const updateData: UpdateClassData = {
    code: data.code,
    name,
    level: Number(data.level),
    academicLevel: data.academicLevel,
    gender: data.gender,
  };

  if (data.description !== undefined) {
    updateData.description = data.description;
  } else {
    updateData.description = existing.description;
  }

  await classRepository.update(id, updateData);

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
