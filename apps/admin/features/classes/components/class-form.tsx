'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';

import { Button, Field, Input, Surface, toast } from '@/components/ui';

import { createClass, updateClass } from '../server';

import { classSchema, type ClassFormData } from '../schemas';
import type { Class } from '../types';

type ClassFormProps = {
  class?: Class;
};

export const ClassForm = ({ class: classData }: ClassFormProps) => {
  const router = useRouter();
  const isEdit = !!classData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormData>({
    // zod v4.4.3 runtime is compatible with @hookform/resolvers v5.4.0,
    // but the bundled type definitions are version-locked to an earlier zod v4 beta.
    resolver: zodResolver(classSchema as never) as Resolver<ClassFormData>,
    defaultValues: classData
      ? {
          code: classData.code,
          name: classData.name,
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

          <Field label="Nama Kelas" required error={errors.name?.message}>
            <Input
              placeholder="Masukkan nama kelas"
              {...register('name')}
              status={errors.name ? 'error' : 'idle'}
            />
          </Field>
        </div>

        <Field label="Deskripsi" required error={errors.description?.message}>
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
