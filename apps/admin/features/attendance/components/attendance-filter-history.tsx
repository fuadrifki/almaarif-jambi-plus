'use client';

import { DatePicker, Select, SelectOption } from '@/components/ui';

type AttendanceFilterHistoryProps = {
  classes: SelectOption[];
  subjectOptions: SelectOption[];
  dateFilter?: Date;
  classFilter: number;
  subjectFilter: number;
  handleDateChange?: (date: Date | undefined) => void;
  handleClassChange: (value: number) => void;
  handleSubjectChange: (value: number) => void;
};

export const AttendanceFilterHistory = ({
  classes,
  subjectOptions,
  classFilter,
  subjectFilter,
  dateFilter,
  handleClassChange,
  handleSubjectChange,
  handleDateChange,
}: AttendanceFilterHistoryProps) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
      <DatePicker
        value={dateFilter}
        onChange={handleDateChange}
        placeholder="Pilih tanggal"
        resettable
      />

      <Select
        options={[{ value: 0, label: 'Semua' }, ...classes]}
        value={classFilter}
        placeholder="Kelas"
        onChange={(value) => handleClassChange(Number(value))}
      />

      <Select
        options={subjectOptions}
        value={subjectFilter}
        placeholder="Mata pelajaran"
        onChange={(value) => handleSubjectChange(Number(value))}
      />
    </div>
  );
};
