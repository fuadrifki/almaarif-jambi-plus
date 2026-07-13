import { notFound } from 'next/navigation';

import { studentRepository } from '@/lib/data';

import { StudentForm } from '../components/student-form';

type StudentEditPageProps = {
  params: Promise<{ id: string }>;
};

export const StudentEditPage = async ({ params }: StudentEditPageProps) => {
  const { id } = await params;
  const student = studentRepository.findById(id);

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Edit Siswa</h1>

        <p className="mt-2 text-secondary">Ubah data siswa {student.name}.</p>
      </section>

      <StudentForm student={student} />
    </div>
  );
};
