'use client';

import { useState } from 'react';
import { Field, DatePicker } from '@/components/ui';

export const SizeDatePickerExamples = () => {
  const [smDate, setSmDate] = useState<Date | undefined>();
  const [mdDate, setMdDate] = useState<Date | undefined>();
  const [lgDate, setLgDate] = useState<Date | undefined>();

  return (
    <div className="w-full max-w-md space-y-4">
      <Field label="Small">
        <DatePicker size="sm" value={smDate} onChange={setSmDate} placeholder="Small" />
      </Field>

      <Field label="Medium">
        <DatePicker value={mdDate} onChange={setMdDate} placeholder="Medium" />
      </Field>

      <Field label="Large">
        <DatePicker size="lg" value={lgDate} onChange={setLgDate} placeholder="Large" />
      </Field>
    </div>
  );
};
