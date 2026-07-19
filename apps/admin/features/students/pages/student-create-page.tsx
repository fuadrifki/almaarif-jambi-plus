import { PageLayout } from '@/components/ui';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { StudentForm } from '@/features/students/components/student-form';
import { classRepository } from '@/features/classes/repositories';

export const StudentCreatePage = async () => {
  const classes = await classRepository.findAll();
  const classesOptions = classes.map((c) => ({ label: c.name, value: c.id }));

  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex flex-col w-full gap-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Students', href: '/dashboard/students' },
              { label: 'Create' },
            ]}
          />
          <section>
            <h1 className="text-2xl font-semibold sm:text-3xl">Tambah Siswa</h1>
            <p className="mt-2 text-secondary">Masukkan data siswa baru.</p>
          </section>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <StudentForm classes={classesOptions} />
      </PageLayout.Content>
    </PageLayout>
  );
};
