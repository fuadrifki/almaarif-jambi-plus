'use client';

import { useState } from 'react';
import { Field, DatePicker } from '@/components/ui';

export const ControlledDatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <Field label="Mulai">
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Pilih tanggal mulai"
      />
    </Field>
  );
};
