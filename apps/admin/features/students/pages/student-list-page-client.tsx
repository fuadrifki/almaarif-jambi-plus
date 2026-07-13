'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, Input, PageLayout } from '@/components/ui';
import { Search } from 'lucide-react';

import { StudentList } from '../components/student-list';

import type { Student } from '../types';

type StudentListPageClientProps = {
  students: Student[];
};

export const StudentListPageClient = ({ students }: StudentListPageClientProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.nis.includes(query),
  );

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Siswa</h1>

        <p className="text-secondary">Kelola data siswa pesantren.</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <Input
            placeholder="Cari berdasarkan nama atau NIS..."
            leftIcon={<Search size={16} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-1/3"
          />

          <Button
            className="w-full sm:w-auto shrink-0"
            onClick={() => router.push('/students/new')}
          >
            Tambah Siswa
          </Button>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <StudentList students={filtered} />
      </PageLayout.Content>
    </PageLayout>
  );
};
