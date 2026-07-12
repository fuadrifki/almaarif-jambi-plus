'use client';

import { useState } from 'react';

import { Field } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { SectionPreview } from '../components/section-preview';

export const SwitchPage = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Switch</h1>

        <p className="text-(--text-secondary)">
          Switch digunakan untuk mengubah nilai antara aktif dan tidak aktif.
        </p>
      </header>

      <SectionPreview title="Default" description="Basic switch.">
        <Field label="Notifications">
          <Switch />
        </Field>
      </SectionPreview>

      <SectionPreview title="Controlled" description="Controlled switch.">
        <Field label="Dark Mode" description={`Status: ${enabled ? 'Enabled' : 'Disabled'}`}>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </Field>
      </SectionPreview>

      <SectionPreview title="Disabled" description="Disabled state.">
        <div className="space-y-4">
          <Field label="Disabled">
            <Switch disabled />
          </Field>

          <Field label="Disabled Checked">
            <Switch disabled checked />
          </Field>
        </div>
      </SectionPreview>
    </div>
  );
};
