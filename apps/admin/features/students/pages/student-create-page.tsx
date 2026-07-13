import { PageLayout } from '@/components/ui';
import { StudentForm } from '../components/student-form';

export const StudentCreatePage = () => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex flex-col w-full gap-y-6">
          <section>
            <h1 className="text-2xl font-semibold sm:text-3xl">Tambah Siswa</h1>

            <p className="mt-2 text-secondary">Masukkan data siswa baru.</p>
          </section>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <StudentForm />
      </PageLayout.Content>
    </PageLayout>
  );
};
