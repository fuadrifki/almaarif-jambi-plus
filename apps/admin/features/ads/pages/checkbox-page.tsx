'use client';

import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { SectionPreview } from '../components/section-preview';

export const CheckboxPage = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Checkbox</h1>

        <p className="text-(--text-secondary)">
          Checkbox digunakan untuk memilih satu atau lebih opsi dalam sebuah form.
        </p>
      </header>

      <SectionPreview title="Default" description="Checkbox default.">
        <Field label="Agreement">
          <Checkbox />
        </Field>
      </SectionPreview>

      <SectionPreview title="Checked" description="Controlled checkbox.">
        <Field label="Receive newsletter">
          <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />
        </Field>
      </SectionPreview>

      <SectionPreview title="Disabled" description="Disabled state.">
        <div className="space-y-4">
          <Field label="Disabled">
            <Checkbox disabled />
          </Field>

          <Field label="Disabled Checked">
            <Checkbox disabled checked />
          </Field>
        </div>
      </SectionPreview>

      <SectionPreview title="Validation" description="Used together with Field.">
        <Field label="Terms & Conditions" error="You must accept the terms.">
          <Checkbox aria-invalid />
        </Field>
      </SectionPreview>

      <SectionPreview title="Real Example" description="Example inside a form.">
        <div className="space-y-4">
          <Field label="Remember me" description="Keep me signed in on this device.">
            <Checkbox />
          </Field>

          <Field label="Subscribe" description="Receive product updates via email.">
            <Checkbox />
          </Field>
        </div>
      </SectionPreview>
    </div>
  );
};
