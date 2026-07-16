'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Field, Input, Surface, toast, Select } from '@/components/ui';

import { createClass, updateClass } from '../server';

import { classSchema, type ClassFormData } from '../schemas';
import { Class } from '../types';

type ClassFormProps = {
  classData: Class;
};

export const ClassForm = ({ classData }: ClassFormProps) => {
  const router = useRouter();
  const isEdit = !!classData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: classData
      ? {
          code: classData.code,
          level: classData.level,
          academicLevel: classData.academicLevel,
          gender: classData.gender,
          description: classData.description,
        }
      : undefined,
  });

  const onSubmit = async (data: ClassFormData) => {
    try {
      if (isEdit) {
        await updateClass(classData.id, data);
        toast.success('Data kelas berhasil diperbarui');
      } else {
        await createClass(data);
        toast.success('Kelas baru berhasil ditambahkan');
      }

      router.push('/classes');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const generatedName = (() => {
    const level = watch('level') || 1;
    const academicLevel = watch('academicLevel') || 'Madin';
    const gender = watch('gender') || 'male';
    return `${level} ${academicLevel.toUpperCase()} ${
      gender === 'male' ? 'PA' : gender === 'female' ? 'PI' : ''
    }`.trim();
  })();

  return (
    <Surface className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Kode" required error={errors.code?.message}>
            <Input
              placeholder="Masukkan Kode"
              {...register('code')}
              status={errors.code ? 'error' : 'idle'}
            />
          </Field>
        </div>

        <Field label="Generated Class Name">
          <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
            <span className="text-sm text-gray-600">Preview:</span>
            <div className="font-medium text-gray-800 mt-1">{generatedName}</div>
          </div>
        </Field>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Level" required error={errors.level?.message}>
            <Input
              type="number"
              placeholder="Masukkan level"
              {...register('level', { valueAsNumber: true })}
              status={errors.level ? 'error' : 'idle'}
            />
          </Field>

          <Field label="Academic Level" required error={errors.academicLevel?.message}>
            <Input
              placeholder="Masukkan tingkat akademis"
              {...register('academicLevel')}
              status={errors.academicLevel ? 'error' : 'idle'}
            />
          </Field>

          <Field label="Gender" required error={errors.gender?.message}>
            <Select
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              value={watch('gender')}
              onChange={(value) => setValue('gender', value as 'male' | 'female')}
              placeholder="Pilih gender"
              status={errors.gender ? 'error' : 'idle'}
            />
          </Field>
        </div>

        <Field label="Deskripsi" error={errors.description?.message}>
          <Input
            placeholder="Masukkan deskripsi"
            {...register('description')}
            status={errors.description ? 'error' : 'idle'}
          />
        </Field>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={() => router.push('/classes')}>
            Batal
          </Button>

          <Button type="submit" status={isSubmitting ? 'loading' : 'idle'}>
            {isEdit ? 'Simpan Perubahan' : 'Tambah Kelas'}
          </Button>
        </div>
      </form>
    </Surface>
  );
};
