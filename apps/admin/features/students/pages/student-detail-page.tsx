import { notFound } from 'next/navigation';

import { classRepository } from '@/features/classes/repositories/index';
import { studentRepository } from '@/features/students/repositories/index';

import { StudentDetail } from '@/features/students/components/student-detail';
import { PageLayout } from '@/components/ui';

type StudentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const StudentDetailPage = async ({ params }: StudentDetailPageProps) => {
  const { id } = await params;
  const student = await studentRepository.findById(id);

  if (!student) {
    notFound();
  }

  const classData = await classRepository.findById(student.classId.toString());

  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex flex-col w-full gap-y-6">
          <section>
            <h1 className="text-2xl font-semibold sm:text-3xl text-primary">Student Profile</h1>

            <p className="mt-2 text-secondary">
              View the detailed information of student {student.name}.
            </p>
          </section>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <StudentDetail student={student} classData={classData} />
      </PageLayout.Content>
    </PageLayout>
  );
};
