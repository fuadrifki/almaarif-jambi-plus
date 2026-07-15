'use client';

import { useState } from 'react';
import { Field, DatePicker } from '@/components/ui';

const longPlaceholder =
  'Pilih tanggal lengkap dengan bulan dan tahun yang detail untuk pencarian yang lebih spesifik';

export const LongPlaceholderDatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <Field label="Tanggal">
      <DatePicker value={selectedDate} onChange={setSelectedDate} placeholder={longPlaceholder} />
    </Field>
  );
};
