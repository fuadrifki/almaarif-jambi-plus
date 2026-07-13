'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button, Surface } from '@/components/ui';

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
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle size={32} className="text-red-400" />
      </div>

      <h2 className="text-xl font-semibold text-primary">Terjadi Kesalahan</h2>

      <p className="mt-2 text-sm text-secondary">
        {error.message || 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.'}
      </p>

      {error.digest && <p className="mt-1 text-xs text-secondary">Error ID: {error.digest}</p>}

      <Button className="mt-6" leftIcon={<RefreshCw size={16} />} onClick={reset}>
        Coba Lagi
      </Button>
    </Surface>
  );
}
