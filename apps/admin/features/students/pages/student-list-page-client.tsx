'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Button, InfiniteScroll, Input, PageLayout, SkeletonCard } from '@/components/ui';
import { Search } from 'lucide-react';

import { StudentList } from '../components/student-list';

import type { Student } from '../types';

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

type StudentListPageClientProps = {
  students: Student[];
};

export const StudentListPageClient = ({ students }: StudentListPageClientProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.nis.includes(query),
  );

  const visible = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);

    setTimeout(() => {
      setDisplayCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, LOAD_DELAY);
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setDisplayCount(PAGE_SIZE);
  };

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
            onChange={(e) => handleQueryChange(e.target.value)}
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
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={isLoadingMore}
          onLoadMore={loadMore}
          loader={
            <div className="space-y-3 py-3">
              <SkeletonCard />
            </div>
          }
          end={
            <p className="py-4 text-center text-sm text-secondary">
              Semua {filtered.length} siswa sudah dimuat
            </p>
          }
        >
          <StudentList students={visible} />
        </InfiniteScroll>
      </PageLayout.Content>
    </PageLayout>
  );
};
