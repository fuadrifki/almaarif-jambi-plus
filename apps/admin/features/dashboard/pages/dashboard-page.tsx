import { Page } from '@/components/common/page';
import { PageHeader } from '@/components/common/page-header';
import { PageSection } from '@/components/common/page-section';

export function DashboardPage() {
  return (
    <Page>
      <PageHeader title="Dashboard" description="Selamat datang di Almaarif Jambi Plus." />

      <PageSection>Dashboard Content</PageSection>
    </Page>
  );
}
