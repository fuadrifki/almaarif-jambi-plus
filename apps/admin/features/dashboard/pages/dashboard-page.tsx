import { Surface } from '@/components/ui';

export function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-10">
      <Surface className="max-w-md p-8">
        <h1 className="text-2xl font-semibold">Almaarif Design System</h1>

        <p className="mt-3 text-(--text-secondary)">Surface pertama berhasil dibuat.</p>
      </Surface>
    </main>
  );
}
