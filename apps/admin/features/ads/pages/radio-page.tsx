'use client';

import { useState } from 'react';

import { Field } from '@/components/ui/field';
import { RadioGroup, RadioItem } from '@/components/ui/radio';
import { SectionPreview } from '../components/section-preview';

export const RadioPage = () => {
  const [value, setValue] = useState('male');

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Radio</h1>

        <p className="text-(--text-secondary)">
          Radio digunakan ketika pengguna hanya dapat memilih satu pilihan.
        </p>
      </header>

      <SectionPreview title="Default" description="Basic radio group.">
        <Field label="Gender">
          <RadioGroup defaultValue="male">
            <RadioItem value="male">Male</RadioItem>
            <RadioItem value="female">Female</RadioItem>
            <RadioItem value="other">Other</RadioItem>
          </RadioGroup>
        </Field>
      </SectionPreview>

      <SectionPreview title="Controlled" description="Controlled radio group.">
        <Field label="Selected" description={`Current value: ${value}`}>
          <RadioGroup value={value} onValueChange={setValue}>
            <RadioItem value="male">Male</RadioItem>
            <RadioItem value="female">Female</RadioItem>
            <RadioItem value="other">Other</RadioItem>
          </RadioGroup>
        </Field>
      </SectionPreview>

      <SectionPreview title="Disabled" description="Disabled state.">
        <Field label="Plan">
          <RadioGroup defaultValue="pro">
            <RadioItem value="free">Free</RadioItem>

            <RadioItem value="pro">Pro</RadioItem>

            <RadioItem value="enterprise" disabled>
              Enterprise
            </RadioItem>
          </RadioGroup>
        </Field>
      </SectionPreview>

      <SectionPreview title="Validation" description="Used together with Field.">
        <Field label="Agreement" error="Please choose one option.">
          <RadioGroup>
            <RadioItem value="yes">Yes</RadioItem>
            <RadioItem value="no">No</RadioItem>
          </RadioGroup>
        </Field>
      </SectionPreview>
    </div>
  );
};
