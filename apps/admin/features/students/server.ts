'use server';

import { redirect } from 'next/navigation';

import { studentRepository } from '@/lib/data';

import type { StudentFormData } from './schemas';

export const createStudent = async (data: StudentFormData) => {
  const existing = studentRepository.findByNis(data.nis);

  if (existing) {
    throw new Error('NIS sudah terdaftar');
  }

  studentRepository.create(data);

  redirect('/students');
};

export const updateStudent = async (id: string, data: StudentFormData) => {
  const existing = studentRepository.findById(id);

  if (!existing) {
    throw new Error('Siswa tidak ditemukan');
  }

  const duplicate = studentRepository.findByNis(data.nis);

  if (duplicate && duplicate.id !== id) {
    throw new Error('NIS sudah terdaftar');
  }

  studentRepository.update(id, data);

  redirect('/students');
};

export const deleteStudent = async (id: string) => {
  const deleted = studentRepository.delete(id);

  if (!deleted) {
    throw new Error('Siswa tidak ditemukan');
  }
};
