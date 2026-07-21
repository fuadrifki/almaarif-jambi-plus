'use client';

import { X, Calendar } from 'lucide-react';
import { Surface, Button, Input, Select } from '@/components/ui';

type AttendanceHeaderProps = {
  dateFilter: Date | undefined;
  classFilter: number;
  subjectFilter: number;
  classOptions: Array<{ value: number; label: string }>;
  subjectOptions: Array<{ value: number; label: string }>;
  onDateChange: (date: Date | undefined) => void;
  onClassChange: (value: number) => void;
  onSubjectChange: (value: number) => void;
  clearFilters: () => void;
};

export const AttendanceHeader = ({
  dateFilter,
  classFilter,
  subjectFilter,
  classOptions,
  subjectOptions,
  onDateChange,
  onClassChange,
  onSubjectChange,
  clearFilters,
}: AttendanceHeaderProps) => {
  return (
    <Surface className="p-4 space-y-4">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Riwayat Absensi</h1>

        {!!dateFilter ||
          classFilter > 0 ||
          (subjectFilter > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters} className="h-8 px-3">
              <X size={14} className="mr-1" /> Hapus Filter
            </Button>
          ))}
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        <div className="relative">
          <Calendar
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary"
          />
          <Input
            type="date"
            value={dateFilter ? dateFilter.toISOString().split('T')[0] : ''}
            onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : undefined)}
            placeholder="Pilih tanggal"
            className="pl-9"
          />
        </div>

        <Select
          options={[{ value: 0, label: 'Semua' }, ...classOptions]}
          value={classFilter}
          placeholder="Kelas"
          onChange={(value) => onClassChange(Number(value))}
        />

        <Select
          options={subjectOptions}
          value={subjectFilter}
          placeholder="Mata pelajaran"
          onChange={(value) => onSubjectChange(Number(value))}
        />
      </div>
    </Surface>
  );
};
