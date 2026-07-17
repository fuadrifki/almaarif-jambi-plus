'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, X } from 'lucide-react';
import type { Resolver } from 'react-hook-form';

import { Button, Card, Field, Input, Select, SelectOption, Surface, toast } from '@/components/ui';

import { createStudent, updateStudent, uploadStudentPhoto, deleteStudentPhoto } from '../server';
import { studentSchema } from '../schemas';

import type { StudentFormData } from '../schemas';
import type { Student } from '../types';

type StudentFormProps = {
  student?: Student;
  classes: SelectOption[];
};

export const StudentForm = ({ student, classes }: StudentFormProps) => {
  const router = useRouter();
  const isEdit = !!student;
  const [photoPreview, setPhotoPreview] = useState<string | null>(student?.photoUrl ?? null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(student?.photoUrl ?? null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    // zod v4.4.3 runtime is compatible with @hookform/resolvers v5.4.0,
    // but the bundled type definitions are version-locked to an earlier zod v4 beta.
    resolver: zodResolver(studentSchema as never) as Resolver<StudentFormData>,
    defaultValues: student
      ? {
          nis: student.nis,
          name: student.name,
          classId: student.classId,
          guardianName: student.guardianName,
          guardianPhone: student.guardianPhone,
          address: student.address,
          photoUrl: student.photoUrl,
        }
      : undefined,
  });

  const selectedClassId = watch('classId');

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 2MB.');
      e.target.value = '';
      return;
    }

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowed.includes(file.type)) {
      toast.error('Format file tidak didukung. Gunakan JPG, JPEG, PNG, atau WebP.');
      e.target.value = '';
      return;
    }

    setPhotoPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append('photo', file);

      const { photoUrl: newUrl } = await uploadStudentPhoto(formData);

      setPhotoUrl(newUrl);
      setValue('photoUrl', newUrl);
    } catch (error) {
      setPhotoPreview(student?.photoUrl ?? null);
      toast.error(error instanceof Error ? error.message : 'Gagal mengunggah foto.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handlePhotoRemove = async () => {
    if (photoUrl && isEdit) {
      try {
        await deleteStudentPhoto(photoUrl);
      } catch {
        // Ignore — file may already be gone.
      }
    }

    setPhotoPreview(null);
    setPhotoUrl(null);
    setValue('photoUrl', null);
  };

  const onSubmit = async (data: StudentFormData) => {
    try {
      if (isEdit) {
        await updateStudent(String(student.id), data);

        toast.success('Data siswa berhasil diperbarui');
      } else {
        await createStudent(data);

        toast.success('Siswa baru berhasil ditambahkan');
      }

      router.push('/students');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card title="Foto Siswa">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {photoPreview ? (
              <Surface className="rounded-full!">
                <Card className="flex w-max h-max items-center justify-center rounded-full! text-sm font-semibold text-primary p-0">
                  <Image
                    src={photoPreview}
                    alt="Foto siswa"
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </Card>
              </Surface>
            ) : (
              <Surface className="rounded-full!">
                <Card className="flex h-20 w-20 items-center justify-center rounded-full text-sm font-semibold text-secondary">
                  {student?.name?.charAt(0)?.toUpperCase() ?? '?'}
                </Card>
              </Surface>
            )}

            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs text-secondary">Format: JPG, JPEG, PNG, WebP. Maks 2MB.</p>

            <div className="flex gap-2">
              <label>
                <Surface className="cursor-pointer px-3 py-1.5 text-xs hover:bg-white/10">
                  <Camera size={14} className="mr-1 inline" />
                  {photoPreview ? 'Ganti' : 'Unggah'}
                </Surface>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handlePhotoChange}
                  disabled={uploading}
                />
              </label>

              {photoPreview && (
                <Button type="button" variant="ghost" size="sm" onClick={handlePhotoRemove}>
                  <X size={14} className="mr-1" />
                  Hapus
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card title="Detail Siswa">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="NIS" required error={errors.nis?.message}>
            <Input
              placeholder="Masukkan NIS"
              {...register('nis')}
              status={errors.nis ? 'error' : 'idle'}
            />
          </Field>

          <Field label="Nama Siswa" required error={errors.name?.message}>
            <Input
              placeholder="Masukkan nama siswa"
              {...register('name')}
              status={errors.name ? 'error' : 'idle'}
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Kelas" required error={errors.classId?.message}>
            <Select
              options={classes}
              value={selectedClassId}
              placeholder="Pilih kelas"
              onChange={(value) => setValue('classId', Number(value))}
              status={errors.classId ? 'error' : 'idle'}
            />
          </Field>
        </div>
      </Card>

      <Card title="Detail Wali">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nama Wali" required error={errors.guardianName?.message}>
            <Input
              placeholder="Masukkan nama wali"
              {...register('guardianName')}
              status={errors.guardianName ? 'error' : 'idle'}
            />
          </Field>

          <Field label="Telepon Wali" required error={errors.guardianPhone?.message}>
            <Input
              placeholder="Masukkan telepon wali"
              {...register('guardianPhone')}
              status={errors.guardianPhone ? 'error' : 'idle'}
            />
          </Field>
        </div>

        <Field label="Alamat" required error={errors.address?.message}>
          <Input
            placeholder="Masukkan alamat"
            {...register('address')}
            status={errors.address ? 'error' : 'idle'}
          />
        </Field>
      </Card>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        {isEdit && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push(`/students/${student.id}`)}
          >
            Kembali ke Detail
          </Button>
        )}

        <Button type="button" variant="ghost" onClick={() => router.push('/students')}>
          Batal
        </Button>

        <Button type="submit" status={isSubmitting ? 'loading' : 'idle'}>
          {isEdit ? 'Simpan Perubahan' : 'Tambah Siswa'}
        </Button>
      </div>
    </form>
  );
};
