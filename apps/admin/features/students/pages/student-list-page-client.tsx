'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Button, InfiniteScroll, Input, PageLayout, SkeletonCard } from '@/components/ui';
import { Search } from 'lucide-react';

import { StudentList } from '../components/student-list';

import type { Student } from '../types';
import { Class } from '@/features/classes';
import type { Permission } from '@/lib/permissions';

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

export type StudentListPageClientProps = {
  students: Student[];
  classes: Class[];
  permissions: Permission;
};

export const StudentListPageClient = ({
  students,
  classes,
  permissions,
}: StudentListPageClientProps) => {
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
        <h1 className="text-2xl font-semibold sm:text-3xl">Santri</h1>

        <p className="text-secondary">Kelola data santri pesantren.</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <Input
            placeholder="Cari berdasarkan nama atau NIS..."
            leftIcon={<Search size={16} />}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full sm:w-1/3"
          />

          {permissions?.canCreateStudent && (
            <Button
              className="w-full sm:w-auto shrink-0"
              onClick={() => router.push('/dashboard/students/new')}
            >
              Tambah Santri
            </Button>
          )}
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
            <p className="pt-4 text-center text-sm text-secondary">
              Semua {filtered.length} santri sudah dimuat
            </p>
          }
        >
          <StudentList students={visible} classes={classes} permissions={permissions} />
        </InfiniteScroll>
      </PageLayout.Content>
    </PageLayout>
  );
};
