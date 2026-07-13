import { Card, PageLayout } from '@/components/ui';

export const DashboardPage = () => (
  <PageLayout>
    <PageLayout.Header>
      <section>
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <p className="mt-2 text-secondary">Welcome back, manage your Almaarif system here.</p>
      </section>
    </PageLayout.Header>

    <PageLayout.Content>
      <section className="grid gap-6 md:grid-cols-3">
        <Card title="Students" description="Total registered students">
          <p className="text-3xl font-semibold">0</p>
        </Card>

        <Card title="Teachers" description="Active teachers">
          <p className="text-3xl font-semibold">0</p>
        </Card>

        <Card title="Reports" description="Monthly reports">
          <p className="text-3xl font-semibold">0</p>
        </Card>
      </section>
    </PageLayout.Content>
  </PageLayout>
);
