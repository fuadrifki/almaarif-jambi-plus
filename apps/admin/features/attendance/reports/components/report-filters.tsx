'use client';
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { Button, Select, Surface, DatePicker } from '@/components/ui';
import { ReportFilter } from '../../queries/types';
import { Class } from '@/features/classes/types';

type ReportFiltersProps = {
  className?: string;
  classes: Class[];
};

export const ReportFilters = ({ classes }: ReportFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const classId = searchParams.get('classId') || '';
  const date = searchParams.get('date') || '';

  const classesOptions = classes.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const updateSearchParams = useCallback(
    (updates: Partial<ReportFilter>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router],
  );

  const handleDateChange = (selectedDate: Date | undefined) => {
    updateSearchParams({
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : undefined,
    });
  };

  const handleClassChange = (value: string) => {
    updateSearchParams({ classId: value, page: 1 });
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <Surface className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <Select
          options={classesOptions}
          value={classId}
          placeholder="Kelas"
          onChange={(value) => handleClassChange(String(value))}
        />

        <DatePicker
          value={date ? new Date(date) : undefined}
          onChange={handleDateChange}
          size="md"
        />

        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Surface>
  );
};
