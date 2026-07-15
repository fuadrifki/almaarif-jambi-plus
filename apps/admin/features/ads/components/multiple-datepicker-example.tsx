'use client';

import { useState } from 'react';
import { Field, DatePicker } from '@/components/ui';

export const MultipleDatePickerExamples = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  return (
    <div className="flex w-full max-w-2xl flex-wrap gap-4">
      <div className="w-full max-w-xs">
        <Field label="Mulai">
          <DatePicker value={startDate} onChange={setStartDate} placeholder="Tanggal mulai" />
        </Field>
      </div>

      <div className="w-full max-w-xs">
        <Field label="Selesai">
          <DatePicker value={endDate} onChange={setEndDate} placeholder="Tanggal selesai" />
        </Field>
      </div>
    </div>
  );
};
