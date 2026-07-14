import { PageLayout } from '@/components/ui';
import { ClassForm } from '../components/class-form';

export const ClassCreatePage = () => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex flex-col w-full gap-y-6">
          <section>
            <h1 className="text-2xl font-semibold sm:text-3xl">Tambah Kelas</h1>

            <p className="mt-2 text-secondary">Masukkan data kelas baru.</p>
          </section>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <ClassForm />
      </PageLayout.Content>
    </PageLayout>
  );
};
