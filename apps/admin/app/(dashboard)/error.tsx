'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui';
import { Surface } from '@/components/ui';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Surface className="mx-auto mt-12 max-w-md p-8 text-center">
      <h2 className="text-xl font-semibold text-(--text-primary)">Terjadi Kesalahan</h2>

      <p className="mt-2 text-sm text-(--text-secondary)">
        {error.message || 'Terjadi kesalahan yang tidak terduga.'}
      </p>

      <Button className="mt-6" onClick={reset}>
        Coba Lagi
      </Button>
    </Surface>
  );
}
