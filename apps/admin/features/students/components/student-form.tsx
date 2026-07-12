'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';

import { Button, Field, Input, Select, Surface, toast } from '@/components/ui';
import { CLASSES } from '@/config/lookups';

import { createStudent, updateStudent } from '../server';
import { studentSchema } from '../schemas';

import type { StudentFormData } from '../schemas';
import type { Student } from '../types';

type StudentFormProps = {
  student?: Student;
};

export const StudentForm = ({ student }: StudentFormProps) => {
  const router = useRouter();
  const isEdit = !!student;

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
          room: student.room,
          guardianName: student.guardianName,
          guardianPhone: student.guardianPhone,
          address: student.address,
        }
      : undefined,
  });

  const selectedClassId = watch('classId');

  const onSubmit = async (data: StudentFormData) => {
    try {
      if (isEdit) {
        await updateStudent(student.id, data);

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
    <Surface className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              options={CLASSES}
              value={selectedClassId}
              placeholder="Pilih kelas"
              onChange={(value) => setValue('classId', value)}
              status={errors.classId ? 'error' : 'idle'}
            />
          </Field>

          <Field label="Ruang" required error={errors.room?.message}>
            <Input
              placeholder="Masukkan ruang"
              {...register('room')}
              status={errors.room ? 'error' : 'idle'}
            />
          </Field>
        </div>

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

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={() => router.push('/students')}>
            Batal
          </Button>

          <Button type="submit" status={isSubmitting ? 'loading' : 'idle'}>
            {isEdit ? 'Simpan Perubahan' : 'Tambah Siswa'}
          </Button>
        </div>
      </form>
    </Surface>
  );
};
