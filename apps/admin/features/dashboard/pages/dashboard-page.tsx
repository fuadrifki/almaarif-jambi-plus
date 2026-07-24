import { PageLayout } from '@/components/ui';

export const DashboardPage = () => (
  <PageLayout>
    <PageLayout.Header>
      <section>
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <p className="mt-2 text-secondary">
          Selamat datang, <br />
          Sistem kelola data digitalisasi Pondok Pesantren dan menjadi platform terintegrasi yang
          menghubungkan administrasi pondok, sekolah formal, guru, santri, orang tua, hingga yayasan
          dalam satu sistem informasi yang efisien dan mudah digunakan.
        </p>
      </section>
    </PageLayout.Header>
  </PageLayout>
);
