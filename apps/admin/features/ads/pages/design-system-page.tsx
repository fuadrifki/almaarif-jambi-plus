import { GlassSurface } from '../components/glass-surface';

export function DesignSystemPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-10">
        <header className="space-y-2">
          <p className="text-sm font-medium text-(--text-secondary)">ADS Playground</p>

          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>

          <p className="max-w-2xl text-(--text-secondary)">
            Semua komponen ADS diuji di halaman ini sebelum digunakan di aplikasi.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Glass Surface</h2>

          <GlassSurface className="p-6">Surface preview</GlassSurface>
        </section>
      </div>
    </div>
  );
}
