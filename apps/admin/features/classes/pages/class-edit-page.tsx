import { notFound } from 'next/navigation';

import { PageLayout } from '@/components/ui';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ClassForm } from '../components/class-form';
import { classRepository } from '../repositories';

type ClassEditPageProps = {
  params: Promise<{ id: string }>;
};

export const ClassEditPage = async ({ params }: ClassEditPageProps) => {
  const { id } = await params;
  const classDetail = await classRepository.findById(id);

  if (!classDetail) {
    notFound();
  }

  return (
    <PageLayout>
      <PageLayout.Header>
        <Breadcrumb
          items={[
            { label: 'Classes', href: '/classes' },
            { label: classDetail.name, href: `/classes/${id}` },
            { label: 'Edit' },
          ]}
        />
        <section>
          <h1 className="text-2xl font-semibold sm:text-3xl">Edit Kelas</h1>

          <p className="mt-2 text-secondary">Ubah data kelas {classDetail.name}.</p>
        </section>
      </PageLayout.Header>

      <PageLayout.Content>
        <ClassForm classData={classDetail} />
      </PageLayout.Content>
    </PageLayout>
  );
};
