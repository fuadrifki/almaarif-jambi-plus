'use client';

import { useState } from 'react';
import { Field, DatePicker } from '@/components/ui';

export const DefaultDatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <Field label="Tanggal">
      <DatePicker value={selectedDate} onChange={setSelectedDate} placeholder="Pilih tanggal" />
    </Field>
  );
};
