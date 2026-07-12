import { Field, Input } from '@/components/ui';
import { SectionPreview } from '../components/section-preview';

export const InputPage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-(--text-secondary)">Components</p>

      <h1 className="text-4xl font-bold tracking-tight">Input</h1>

      <p className="text-(--text-secondary)">
        Input digunakan bersama Field untuk menerima data pengguna dengan dukungan validasi dan
        berbagai interaction state.
      </p>
    </header>

    <SectionPreview
      title="Default"
      description="Input standar dengan label."
      code={`<Field label="Nama Lengkap">
  <Input placeholder="Masukkan nama" />
</Field>`}
    >
      <div className="w-full max-w-md">
        <Field label="Nama Lengkap">
          <Input placeholder="Masukkan nama" />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Required"
      description="Gunakan required ketika field wajib diisi."
      code={`<Field
  label="Email"
  required
>
  <Input placeholder="Email" />
</Field>`}
    >
      <div className="w-full max-w-md">
        <Field label="Email" required>
          <Input placeholder="Email" />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Error"
      description="Error ditampilkan melalui Field."
      code={`<Field
  label="Password"
  required
  error="Password wajib diisi"
>
  <Input
    status="error"
    type="password"
  />
</Field>`}
    >
      <div className="w-full max-w-md">
        <Field label="Password" required error="Password wajib diisi">
          <Input status="error" type="password" placeholder="Password" />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Description"
      description="Gunakan description untuk memberikan bantuan kepada user."
      code={`<Field
  label="Username"
  description="Gunakan minimal 6 karakter"
>
  <Input />
</Field>`}
    >
      <div className="w-full max-w-md">
        <Field label="Username" description="Gunakan minimal 6 karakter">
          <Input placeholder="Username" />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Password"
      description="Password input menyediakan toggle visibility."
      code={`<Field label="Password">
  <Input
    type="password"
  />
</Field>`}
    >
      <div className="w-full max-w-md">
        <Field label="Password">
          <Input type="password" placeholder="Masukkan password" />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Loading & Disabled"
      description="Gunakan loading saat proses berjalan."
      code={`<>
<Field label="Saving">
  <Input status="loading" />
</Field>

<Field label="Disabled">
  <Input disabled />
</Field>
</>`}
    >
      <div className="flex w-full max-w-md flex-col gap-4">
        <Field label="Saving">
          <Input status="loading" />
        </Field>

        <Field label="Disabled">
          <Input disabled />
        </Field>
      </div>
    </SectionPreview>
  </div>
);
