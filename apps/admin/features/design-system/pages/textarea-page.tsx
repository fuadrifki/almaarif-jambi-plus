import { Field, Textarea } from '@/components/ui';

import { SectionPreview } from '../components/section-preview';

export function TextareaPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-(--text-secondary)">Components</p>

        <h1 className="text-4xl font-bold tracking-tight">Textarea</h1>

        <p className="text-(--text-secondary)">
          Textarea digunakan untuk menerima input teks dengan panjang lebih dari satu baris. Gunakan
          untuk deskripsi, catatan, komentar, atau konten lain yang membutuhkan ruang lebih besar.
        </p>
      </header>

      <SectionPreview
        title="Default"
        description="Textarea standar untuk kebutuhan input multi-line."
        code={`<Field
  label="Description"
  required
>
  <Textarea placeholder="Masukkan deskripsi..." />
</Field>`}
      >
        <div className="max-w-xl">
          <Field label="Description" required>
            <Textarea placeholder="Masukkan deskripsi..." />
          </Field>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Sizes"
        description="Sesuaikan ukuran dengan kepadatan layout."
        code={`<>
  <Textarea size="sm" />

  <Textarea />

  <Textarea size="lg" />
</>`}
      >
        <div className="max-w-xl space-y-5">
          <Field label="Small">
            <Textarea size="sm" placeholder="Small textarea" />
          </Field>

          <Field label="Medium">
            <Textarea placeholder="Medium textarea" />
          </Field>

          <Field label="Large">
            <Textarea size="lg" placeholder="Large textarea" />
          </Field>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Resize"
        description="Atur kemampuan resize sesuai kebutuhan halaman."
        code={`<>
  <Textarea resize="none" />

  <Textarea resize="vertical" />

  <Textarea resize="horizontal" />

  <Textarea resize="both" />
</>`}
      >
        <div className="max-w-xl space-y-5">
          <Field label="None">
            <Textarea resize="none" placeholder="Resize none" />
          </Field>

          <Field label="Vertical">
            <Textarea resize="vertical" placeholder="Resize vertical" />
          </Field>

          <Field label="Horizontal">
            <Textarea resize="horizontal" placeholder="Resize horizontal" />
          </Field>

          <Field label="Both">
            <Textarea resize="both" placeholder="Resize both" />
          </Field>
        </div>
      </SectionPreview>

      <SectionPreview
        title="States"
        description="Textarea mendukung idle, error, disabled, dan readonly."
        code={`<>
  <Textarea status="error" />

  <Textarea disabled />

  <Textarea readOnly />
</>`}
      >
        <div className="max-w-xl space-y-5">
          <Field label="Error" error="Deskripsi wajib diisi.">
            <Textarea status="error" placeholder="Error state" />
          </Field>

          <Field label="Disabled">
            <Textarea disabled placeholder="Disabled textarea" />
          </Field>

          <Field label="Readonly">
            <Textarea readOnly defaultValue="Readonly value" />
          </Field>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Placeholder"
        description="Placeholder membantu pengguna memahami jenis data yang harus diisi."
        code={`<Textarea placeholder="Contoh: Jelaskan tujuan kegiatan..." />`}
      >
        <div className="max-w-xl">
          <Field label="Activity">
            <Textarea placeholder="Contoh: Jelaskan tujuan kegiatan..." />
          </Field>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Real Example"
        description="Contoh implementasi pada form aplikasi."
        code={`<>
  <Field
    label="Title"
    required
  >
    <Input placeholder="Masukkan judul" />
  </Field>

  <Field
    label="Description"
    required
  >
    <Textarea
      placeholder="Masukkan deskripsi..."
      resize="vertical"
    />
  </Field>
</>`}
      >
        <div className="max-w-xl space-y-5">
          <Field label="Title" required>
            <input className="ads-input rounded-full" placeholder="Masukkan judul" />
          </Field>

          <Field label="Description" required>
            <Textarea placeholder="Masukkan deskripsi..." resize="vertical" />
          </Field>
        </div>
      </SectionPreview>
    </div>
  );
}
