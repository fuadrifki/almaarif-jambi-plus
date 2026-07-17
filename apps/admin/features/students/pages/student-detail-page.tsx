import { notFound } from 'next/navigation';

import { classRepository } from '@/features/classes/repositories/index';
import { studentRepository } from '@/features/students/repositories/index';

import { StudentForm } from '@/features/students/components/student-form';
import { PageLayout } from '@/components/ui';

type StudentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const StudentDetailPage = async ({ params }: StudentDetailPageProps) => {
  const { id } = await params;
  const student = await studentRepository.findById(id);
  const classes = await classRepository.findAll();
  const classesOptions = classes.map((c) => ({ label: c.name, value: c.id }));

  if (!student) {
    notFound();
  }

  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex flex-col w-full gap-y-6">
          <section>
            <h1 className="text-2xl font-semibold sm:text-3xl">Detail Siswa</h1>

            <p className="mt-2 text-secondary">Ubah data siswa {student.name}.</p>
          </section>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <StudentForm student={student} classes={classesOptions} />
      </PageLayout.Content>
    </PageLayout>
  );
};
