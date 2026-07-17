'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui';
import { Field, Input, FieldValue } from '@/components/ui';

import { SectionPreview } from '../../components/section-preview';

export const FieldPage = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError(e.target.value.length > 0 && e.target.value.length < 3 ? 'Minimal 3 karakter' : '');
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold">Field</h1>

        <p className="mt-2 text-secondary">
          A layout wrapper for form controls. Provides consistent label, required indicator,
          description text, and error messages.
        </p>
      </section>

      <SectionPreview
        title="Basic"
        code={`<Field label="Nama Lengkap" required>
  <Input placeholder="Masukkan nama" />
</Field>`}
      >
        <Field label="Nama Lengkap" required>
          <Input placeholder="Masukkan nama" />
        </Field>
      </SectionPreview>

      <SectionPreview
        title="With Description"
        code={`<Field label="Email" description="Gunakan email aktif untuk notifikasi.">
  <Input type="email" placeholder="nama@email.com" />
</Field>`}
      >
        <Field label="Email" description="Gunakan email aktif untuk notifikasi.">
          <Input type="email" placeholder="nama@email.com" />
        </Field>
      </SectionPreview>

      <SectionPreview
        title="With Error"
        code={`<Field label="Nama" error="Minimal 3 karakter" required>
  <Input value="ab" status="error" />
</Field>`}
      >
        <Field label="Nama" error="Minimal 3 karakter" required>
          <Input value="ab" status="error" />
        </Field>
      </SectionPreview>

      <SectionPreview
        title="Interactive"
        code={`<Field label="Search" error={error} description="Ketik untuk mencari.">
  <Input value={value} onChange={handleChange} placeholder="Ketik..." />
</Field>`}
      >
        <Field label="Search" error={error} description="Ketik untuk mencari.">
          <Input value={value} onChange={handleChange} placeholder="Ketik..." />
        </Field>
      </SectionPreview>

      <SectionPreview
        title="Read-only FieldValue"
        description="FieldValue for displaying read-only content. Use in Student Detail and other view modes."
        code={`<Field label="Nama">
  <FieldValue>Ahmad Fauzi</FieldValue>
</Field>

<Field label="Alamat">
  <FieldValue className="whitespace-pre-wrap break-words">Jl. Merdeka No. 123, Jakarta</FieldValue>
</Field>`}
      >
        <Field label="Nama">
          <FieldValue>Ahmad Fauzi</FieldValue>
        </Field>

        <Field label="Alamat">
          <FieldValue className="whitespace-pre-wrap break-words">
            Jl. Merdeka No. 123, Jakarta
          </FieldValue>
        </Field>
      </SectionPreview>

      <SectionPreview
        title="FieldValue with Badge"
        description="FieldValue can contain Badge for status, labels, or indicators."
        code={`<Field label="Status">
  <FieldValue>
    <Badge variant="success">Aktif</Badge>
  </FieldValue>
</Field>`}
      >
        <Field label="Status">
          <FieldValue>
            <Badge variant="success">Aktif</Badge>
          </FieldValue>
        </Field>
      </SectionPreview>

      <SectionPreview
        title="FieldValue with ReactNode"
        description="FieldValue accepts ReactNode for rich content like links, icons, and custom layouts."
        code={`<Field label="Situs Web">
  <FieldValue>
    <div className="flex items-center gap-2">
      <a href="https://example.com" className="text-primary hover:underline">https://example.com</a>
    </div>
  </FieldValue>
</Field>`}
      >
        <Field label="Situs Web">
          <FieldValue>
            <div className="flex items-center gap-2">
              <a href="https://example.com" className="text-primary hover:underline">
                https://example.com
              </a>
            </div>
          </FieldValue>
        </Field>
      </SectionPreview>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-sm font-semibold text-primary">Props</h3>

        <div className="mt-3 space-y-2 text-xs text-secondary">
          <div>
            <code className="text-primary">label</code> — string, optional. Renders a
            <code> &lt;label&gt;</code> element above the input.
          </div>
          <div>
            <code className="text-primary">id</code> — string, optional. Associates the label with
            the input via <code>htmlFor</code>.
          </div>
          <div>
            <code className="text-primary">required</code> — boolean, default false. Shows a red
            asterisk next to the label.
          </div>
          <div>
            <code className="text-primary">description</code> — string, optional. Helper text below
            the input (hidden when error is present).
          </div>
          <div>
            <code className="text-primary">error</code> — string, optional. Error message below the
            input with <code>role=&quot;alert&quot;</code>.
          </div>
        </div>
      </section>
    </div>
  );
};
