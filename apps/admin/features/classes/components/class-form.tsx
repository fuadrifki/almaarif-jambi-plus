'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Field,
  Input,
  toast,
  Select,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Card,
} from '@/components/ui';

import { createClass, updateClass } from '../server';

import { classSchema, type ClassFormData } from '../schemas';
import { Class } from '../types';
import { SCHEDULES } from '@/lib/db/seed-schedule';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { useMemo } from 'react';
import { generateClassName } from '@/lib';
import Link from 'next/link';

type ClassFormProps = {
  classData?: Class;
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
          level: String(classData.level),
          academicLevel: classData.academicLevel,
          gender: classData.gender,
          description: classData.description,
        }
      : undefined,
  });

  const onSubmit = async (data: ClassFormData) => {
    try {
      if (isEdit) {
        await updateClass(String(classData.id), data);
        toast.success('Data kelas berhasil diperbarui');
      } else {
        await createClass(data);
        toast.success('Kelas baru berhasil ditambahkan');
      }

      router.push('/dashboard/classes');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const classSchedules = useMemo(
    () => SCHEDULES.filter((sch) => sch.classId === Number(classData?.id)),
    [classData],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card className="space-y-4">
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
            <div className="font-medium text-gray-800 mt-1">
              {generateClassName(watch('level'), watch('academicLevel'), watch('gender'))}
            </div>
          </div>
        </Field>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Level" required error={errors.level?.message}>
            <Select
              options={Array(6)
                .fill('')
                .map((_, i) => ({ label: String(i + 1), value: String(i + 1) }))}
              value={watch('level')}
              onChange={(value) => setValue('level', String(value))}
              placeholder="Pilih level"
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
                { label: 'Putra', value: 'male' },
                { label: 'Putri', value: 'female' },
                { label: 'Lainnya', value: 'mixed' },
              ]}
              value={watch('gender')}
              onChange={(value) => setValue('gender', value as 'male' | 'female' | 'mixed')}
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

        {classData?.id && classSchedules.length > 0 && (
          <Field label="Jadwal">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hari</TableHead>
                  <TableHead>Jam</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead>Guru</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classSchedules.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.day}</TableCell>
                    <TableCell>{s.time}</TableCell>
                    <TableCell>{SUBJECTS.find((sub) => sub.id === s.subjectId)?.label}</TableCell>
                    <TableCell>{TEACHERS.find((t) => t.id === s.teacherId)?.name ?? '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Field>
        )}
      </Card>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Link href={`/dashboard/classes`} className="w-full sm:w-max">
          <Button type="button" variant="ghost">
            Kembali
          </Button>
        </Link>

        <Button type="submit" status={isSubmitting ? 'loading' : 'idle'}>
          {isEdit ? 'Simpan Perubahan' : 'Tambah Kelas'}
        </Button>
      </div>
    </form>
  );
};
