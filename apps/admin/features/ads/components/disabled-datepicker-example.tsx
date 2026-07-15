'use client';

import { useState } from 'react';
import { Field, DatePicker } from '@/components/ui';

export const DisabledDatePickerExample = () => {
  return (
    <Field label="Tanggal">
      <DatePicker disabled placeholder="Pilih tanggal" />
    </Field>
  );
};
