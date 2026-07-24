'use server';

import { revalidatePath } from 'next/cache';
import { mkdir, writeFile, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import { studentRepository } from '@/features/students/repositories';
import type { StudentFormData } from './schemas';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'students');
const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const uploadStudentPhoto = async (formData: FormData): Promise<{ photoUrl: string }> => {
  const file = formData.get('photo') as File | null;

  if (!file || file.size === 0) {
    throw new Error('File tidak ditemukan');
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Format file tidak didukung. Gunakan JPG, JPEG, PNG, atau WebP.');
  }

  if (file.size > MAX_SIZE) {
    throw new Error('Ukuran file maksimal 2MB.');
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const filename = `${crypto.randomUUID()}.${ext}`;

  await mkdir(UPLOAD_DIR, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const photoUrl = `/uploads/students/${filename}`;

  return { photoUrl };
};

export const deleteStudentPhoto = async (photoUrl: string): Promise<void> => {
  if (!photoUrl) return;

  const filePath = path.join(process.cwd(), 'public', photoUrl);

  try {
    await stat(filePath);
    await unlink(filePath);
  } catch {
    // File may already be deleted; ignore.
  }
};

export const searchStudent = async (formData: FormData) => {
  const nis = formData.get('nis') as string;
  const guardianPhone = formData.get('guardianPhone') as string;

  if (!nis && !guardianPhone) {
    throw new Error('NIS atau nomor telepon wali harus diisi');
  }

  let student = null;

  if (nis) {
    student = await studentRepository.findByNis(nis);
  }

  if (guardianPhone && !student) {
    student = await studentRepository.findByGuardianPhone(guardianPhone);
  }

  if (!student) {
    throw new Error('Data santri tidak ditemukan');
  }

  return student;
};

export const createStudent = async (data: StudentFormData) => {
  const existing = await studentRepository.findByNis(data.nis);

  if (existing) {
    throw new Error('NIS sudah terdaftar');
  }

  await studentRepository.create({
    ...data,
    photoUrl: data.photoUrl ?? null,
  });

  revalidatePath('/students');

  return { success: true };
};

export const updateStudent = async (id: string, data: StudentFormData) => {
  const existing = await studentRepository.findById(id);

  if (!existing) {
    throw new Error('Santri tidak ditemukan');
  }

  const duplicate = await studentRepository.findByNis(data.nis);

  if (duplicate && duplicate.id !== Number(id)) {
    throw new Error('NIS sudah terdaftar');
  }

  const newPhotoUrl = data.photoUrl ?? null;

  if (existing.photoUrl && newPhotoUrl !== existing.photoUrl) {
    await deleteStudentPhoto(existing.photoUrl);
  }

  await studentRepository.update(id, {
    ...data,
    photoUrl: newPhotoUrl,
  });

  revalidatePath('/students');
};

export const deleteStudent = async (id: string) => {
  const existing = await studentRepository.findById(id);

  const deleted = await studentRepository.delete(id);

  if (!deleted) {
    throw new Error('Santri tidak ditemukan');
  }

  if (existing?.photoUrl) {
    await deleteStudentPhoto(existing.photoUrl);
  }

  revalidatePath('/students');
};
