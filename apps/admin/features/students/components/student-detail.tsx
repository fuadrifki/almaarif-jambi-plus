import { Button, Card, Field, FieldValue, Surface } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

import { Class } from '@/features/classes';

import type { Student } from '../types';

type StudentDetailProps = {
  student: Student;
  classData: Class | null;
};

export const StudentDetail = ({ student, classData }: StudentDetailProps) => {
  return (
    <div className="space-y-4">
      <Card title="Foto Siswa">
        <div className="flex items-center justify-center sm:justify-start gap-4">
          <div className="relative shrink-0">
            {student.photoUrl ? (
              <Surface className="rounded-full!">
                <Card className="flex w-max h-max items-center justify-center rounded-full! text-sm font-semibold text-primary p-0">
                  <Image
                    src={student.photoUrl}
                    alt="Foto siswa"
                    width={160}
                    height={160}
                    className="h-40 w-4h-40 rounded-full object-cover"
                  />
                </Card>
              </Surface>
            ) : (
              <Surface className="rounded-full!">
                <Card className="flex h-40 w-40 items-center justify-center rounded-full text-6xl font-semibold text-secondary">
                  {student?.name?.charAt(0)?.toUpperCase() ?? '?'}
                </Card>
              </Surface>
            )}
          </div>
        </div>
      </Card>

      <Card title="Detail Siswa">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="NIS">
            <FieldValue>{student.nis}</FieldValue>
          </Field>

          <Field label="Nama Siswa">
            <FieldValue>{student.name}</FieldValue>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Kelas">
            <FieldValue>{classData?.name}</FieldValue>
          </Field>
        </div>
      </Card>

      <Card title="Detail Wali">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nama Wali">
            <FieldValue>{student.guardianName}</FieldValue>
          </Field>

          <Field label="Telepon Wali">
            <FieldValue>{student.guardianPhone}</FieldValue>
          </Field>
        </div>

        <Field label="Alamat">
          <FieldValue>{student.address}</FieldValue>
        </Field>
      </Card>

      <div className="flex gap-3 pt-2 items-center justify-center sm:justify-end">
        <Link href="/students" className="w-full sm:w-max">
          <Button type="button" variant="ghost" className="w-full">
            Kembali
          </Button>
        </Link>

        <Link href={`/students/${student.id}/edit`} className="w-full sm:w-max">
          <Button type="submit" className="w-full">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};
