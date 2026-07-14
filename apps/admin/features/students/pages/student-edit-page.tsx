import { notFound } from 'next/navigation';

import { studentRepository } from '@/lib/data';

import { StudentForm } from '../components/student-form';
import { PageLayout } from '@/components/ui';
import { classRepository } from '@/lib/data/class-repository';

type StudentEditPageProps = {
  params: Promise<{ id: string }>;
};

export const StudentEditPage = async ({ params }: StudentEditPageProps) => {
  const { id } = await params;
  const student = await studentRepository.findById(id);
  const classes = await classRepository.findAll();

  if (!student) {
    notFound();
  }

  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex flex-col w-full gap-y-6">
          <section>
            <h1 className="text-2xl font-semibold sm:text-3xl">Edit Siswa</h1>

            <p className="mt-2 text-secondary">Ubah data siswa {student.name}.</p>
          </section>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <StudentForm student={student} classes={classes} />
      </PageLayout.Content>
    </PageLayout>
  );
};
