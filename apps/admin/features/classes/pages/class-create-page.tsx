import { PageLayout } from '@/components/ui';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ClassForm } from '../components/class-form';

export const ClassCreatePage = () => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <Breadcrumb items={[{ label: 'Classes', href: '/classes' }, { label: 'Create' }]} />
        <section>
          <h1 className="text-2xl font-semibold sm:text-3xl">Tambah Kelas</h1>

          <p className="mt-2 text-secondary">Masukkan data kelas baru.</p>
        </section>
      </PageLayout.Header>

      <PageLayout.Content>
        <ClassForm />
      </PageLayout.Content>
    </PageLayout>
  );
};
