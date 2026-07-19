'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
  Button,
  EmptyState,
  InfiniteScroll,
  Input,
  PageLayout,
  SkeletonCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { ArrowLeft, Search, Users } from 'lucide-react';

import type { Student } from '@/features/students/types';
import Link from 'next/link';

type PortalStudent = Student & {
  className: string;
  attendancePercentage: number;
};

type PortalStudentListPageClientProps = {
  students: PortalStudent[];
  initialQuery: string;
};

const PAGE_SIZE = 20;
const LOAD_DELAY = 200;

export const PortalStudentListPageClient = ({
  students,
  initialQuery,
}: PortalStudentListPageClientProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
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
        <div className="flex flex-col w-full gap-y-4 pt-4">
          <Link href="/">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />}>
              Kembali ke Menu Utama
            </Button>
          </Link>

          <section>
            <h1 className="text-2xl font-semibold sm:text-3xl">Daftar Siswa</h1>
            <p className="text-secondary mt-2">Laporan kegiatan siswa dapat Anda lihat disini.</p>
          </section>

          <Input
            placeholder="Cari berdasarkan nama atau NIS..."
            leftIcon={<Search size={16} />}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full sm:w-1/3"
          />
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={48} />}
            title="Tidak ada siswa ditemukan"
            description="Tidak ada data siswa yang cocok dengan pencarian Anda."
          />
        ) : (
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
                Semua {filtered.length} siswa sudah dimuat
              </p>
            }
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIS</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Kehadiran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className="cursor-pointer hover:bg-surface-hover"
                    onClick={() => router.push(`/students/${student.id}`)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.nis}</TableCell>
                    <TableCell>{student.className}</TableCell>
                    <TableCell>{student.attendancePercentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
