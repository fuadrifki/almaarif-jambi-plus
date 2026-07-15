'use client';

import { useState } from 'react';
import { Field, DatePicker } from '@/components/ui';

export const UncontrolledDatePickerExample = () => {
  return (
    <Field label="Tanggal">
      <DatePicker placeholder="Pilih tanggal" />
    </Field>
  );
};
