'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input, PageLayout } from '@/components/ui';
import { Search } from 'lucide-react';

export const PortalLandingPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/students?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/students');
    }
  };

  return (
    <PageLayout>
      <PageLayout.Content className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-3xl font-bold">Portal Orang Tua</h1>

          <p className="text-secondary">
            Cari informasi kehadiran siswa berdasarkan nama atau NIS.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Masukkan nama atau NIS..."
              leftIcon={<Search size={16} />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="w-full"
            />

            <Button onClick={handleSearch} className="w-full sm:w-auto shrink-0">
              Cari
            </Button>
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};
