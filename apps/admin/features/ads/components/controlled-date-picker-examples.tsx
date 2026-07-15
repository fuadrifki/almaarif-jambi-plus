'use client';

import { Field, DatePicker } from '@/components/ui';

export const ControlledDatePickerExamples = () => (
  <div className="w-full max-w-md space-y-4">
    <Field label="Mulai">
      <DatePicker
        value={new Date()}
        onChange={(date) => console.log('Mulai:', date)}
        placeholder="Pilih tanggal mulai"
      />
    </Field>

    <Field label="Selesai">
      <DatePicker
        value={new Date(Date.now() + 86400000)}
        onChange={(date) => console.log('Selesai:', date)}
        placeholder="Pilih tanggal selesai"
      />
    </Field>
  </div>
);
