'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { Badge, Button, Input, Select, Surface } from '@/components/ui';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import type { Class } from '@/features/classes/types';
import { Plus, Search } from 'lucide-react';

type ReportFiltersProps = {
  classes: Class[];
  teachers: { id: number; name: string }[];
  subjects: { id: number; name: string }[];
  className?: string;
};

function generateMonthOptions() {
  const now = new Date();
  const options: { label: string; value: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    options.push({ label, value });
  }
  return options;
}

const STATUS_OPTIONS = [
  { label: 'Semua', value: '' },
  { label: 'Hadir', value: 'PRESENT' },
  { label: 'Sakit', value: 'SICK' },
  { label: 'Izin', value: 'PERMISSION' },
  { label: 'Alpha', value: 'ABSENT' },
  { label: 'Belum Absen', value: 'NOT_SUBMITTED' },
];

export const ReportFilters = ({ classes, teachers, subjects }: ReportFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const monthOptions = useMemo(() => generateMonthOptions(), []);

  const search = searchParams.get('search') || '';
  const month = searchParams.get('month') || '';
  const classId = searchParams.get('classId') || '';
  const teacherId = searchParams.get('teacherId') || '';
  const subjectId = searchParams.get('subjectId') || '';
  const status = searchParams.get('status') || '';

  const advancedFilterCount = [month, classId, teacherId, subjectId, status].filter(Boolean).length;

  const classOptions = useMemo(
    () => [{ label: 'Semua', value: '' }, ...classes.map((c) => ({ label: c.name, value: c.id }))],
    [classes],
  );

  const teacherOptions = useMemo(
    () =>
      [
        { label: 'Semua', value: '' },
        ...teachers.map((t) => ({ label: t.name, value: t.id })),
      ].sort((a, b) => a.label.localeCompare(b.label)),
    [teachers],
  );

  const subjectOptions = useMemo(
    () =>
      [
        { label: 'Semua', value: '' },
        ...subjects.map((s) => ({ label: s.name, value: s.id })),
      ].sort((a, b) => a.label.localeCompare(b.label)),
    [subjects],
  );

  const updateSearchParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router],
  );

  const handleSearchChange = (value: string) => {
    updateSearchParams({ search: String(value) || undefined });
  };

  const handleMonthChange = (value: string | number) => {
    updateSearchParams({ month: String(value) || undefined });
  };

  const handleClassChange = (value: string | number) => {
    updateSearchParams({ classId: String(value) || undefined });
  };

  const handleTeacherChange = (value: string | number) => {
    updateSearchParams({ teacherId: String(value) || undefined });
  };

  const handleSubjectChange = (value: string | number) => {
    updateSearchParams({ subjectId: String(value) || undefined });
  };

  const handleStatusChange = (value: string | number) => {
    updateSearchParams({ status: String(value) || undefined });
  };

  const handleReset = () => {
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsPopoverOpen(false);
  };

  return (
    <Surface className="p-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          placeholder="Cari berdasarkan nama atau NIS..."
          leftIcon={<Search />}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full sm:w-1/3"
        />

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={true}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Filter
              {advancedFilterCount > 0 && <Badge variant="info">{advancedFilterCount}</Badge>}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-full sm:w-80 p-0"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="flex flex-col h-full w-full">
              <div className="px-4 py-3 border-b border-border flex items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>

                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </div>

              <div className="px-4 py-4 space-y-4 overflow-y-auto flex-1 w-full">
                <Select
                  options={monthOptions}
                  value={month}
                  placeholder="Bulan"
                  onChange={handleMonthChange}
                />

                <Select
                  options={classOptions}
                  value={classId}
                  placeholder="Kelas"
                  onChange={handleClassChange}
                />

                <Select
                  options={teacherOptions}
                  value={teacherId}
                  placeholder="Guru"
                  onChange={handleTeacherChange}
                />

                <Select
                  options={subjectOptions}
                  value={subjectId}
                  placeholder="Mata Pelajaran"
                  onChange={handleSubjectChange}
                />

                <Select
                  options={STATUS_OPTIONS}
                  value={status}
                  placeholder="Status"
                  onChange={handleStatusChange}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Surface>
  );
};
