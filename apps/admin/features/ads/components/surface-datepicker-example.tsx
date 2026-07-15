'use client';

import { useState } from 'react';
import { Field, DatePicker, Surface } from '@/components/ui';

export const InsideSurfaceDatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <Surface className="p-6">
      <Field label="Tanggal">
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Pilih tanggal di dalam surface"
        />
      </Field>
    </Surface>
  );
};
