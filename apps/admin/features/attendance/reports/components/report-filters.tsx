'use client';
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { Button, Field, Select, Surface } from '@/components/ui';
import { CLASSES } from '@/config/lookups';
import { ReportFilter } from '../../queries/report/types';
import { Class } from '@/features/classes';

type ReportFiltersProps = {
  className?: string;
  classes: Class[];
};

export const ReportFilters = ({ className, classes }: ReportFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const classId = searchParams.get('classId') || '';
  const date = searchParams.get('date') || '';
  const page = searchParams.get('page') || '1';

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

  const handleClassChange = (value: string) => {
    updateSearchParams({ classId: value, page: 1 });
  };

  const handleDateChange = (value: string) => {
    updateSearchParams({ date: value, page: 1 });
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <Surface className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <Field label="Kelas">
          <Select
            options={classesOptions}
            value={classId}
            placeholder="Pilih Kelas"
            onChange={handleClassChange}
          />
        </Field>

        <Field label="Tanggal">
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Pilih Tanggal"
          />
        </Field>

        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Surface>
  );
};
