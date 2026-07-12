import { Field, Select } from '@/components/ui';

import { SectionPreview } from '../components/section-preview';

const options = [
  {
    label: 'Administrator',
    value: 'admin',
  },
  {
    label: 'Editor',
    value: 'editor',
  },
  {
    label: 'Viewer',
    value: 'viewer',
  },
];

const longOptions = Array.from({ length: 30 }, (_, index) => ({
  label: `User ${index + 1}`,
  value: `user-${index + 1}`,
}));

const disabledOptions = [
  {
    label: 'Administrator',
    value: 'admin',
  },
  {
    label: 'Disabled Option',
    value: 'disabled',
    disabled: true,
  },
  {
    label: 'Editor',
    value: 'editor',
  },
];

export const SelectPage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-(--text-secondary)">Components</p>

      <h1 className="text-4xl font-bold tracking-tight">Select</h1>

      <p className="text-(--text-secondary)">
        Select digunakan untuk memilih satu nilai dari beberapa pilihan dengan dukungan keyboard
        navigation, collision detection, dan liquid glass styling.
      </p>
    </header>

    <SectionPreview
      title="Default"
      description="Select digunakan bersama Field untuk menjaga konsistensi form."
      code={`<Field
  label="Role"
  required
>
  <Select
    options={options}
    placeholder="Pilih role"
  />
</Field>`}
    >
      <div className="w-full max-w-md">
        <Field label="Role" required>
          <Select options={options} placeholder="Pilih role" />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Sizes"
      description="Gunakan ukuran sesuai kepadatan layout."
      code={`<>
  <Select
    size="sm"
    options={options}
  />

  <Select
    size="md"
    options={options}
  />

  <Select
    size="lg"
    options={options}
  />
</>`}
    >
      <div className="w-full max-w-md space-y-4">
        <Field label="Small">
          <Select size="sm" options={options} />
        </Field>

        <Field label="Medium">
          <Select options={options} />
        </Field>

        <Field label="Large">
          <Select size="lg" options={options} />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Selected Value"
      description="Gunakan defaultValue untuk nilai awal."
      code={`<Select
  defaultValue="admin"
  options={options}
/>`}
    >
      <div className="w-full max-w-md">
        <Field label="Role">
          <Select defaultValue="admin" options={options} />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="States"
      description="Select mendukung error, loading, dan disabled state."
      code={`<>
  <Select
    status="error"
    options={options}
  />

  <Select
    status="loading"
    options={options}
  />

  <Select
    disabled
    options={options}
  />
</>`}
    >
      <div className="w-full max-w-md space-y-4">
        <Field label="Error">
          <Select status="error" options={options} />
        </Field>

        <Field label="Loading">
          <Select status="loading" options={options} />
        </Field>

        <Field label="Disabled">
          <Select disabled options={options} />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Disabled Option"
      description="Option tertentu dapat dinonaktifkan."
      code={`<Select
  options={[
    {
      label: "Disabled",
      value: "disabled",
      disabled: true,
    },
  ]}
/>`}
    >
      <div className="w-full max-w-md">
        <Field label="Role">
          <Select options={disabledOptions} />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Long Dropdown"
      description="Dropdown panjang otomatis memiliki batas tinggi dan scroll."
      code={`<Select
  options={longOptions}
/>`}
    >
      <div className="w-full max-w-md">
        <Field label="User">
          <Select options={longOptions} placeholder="Pilih user" />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Collision Detection"
      description="Dropdown otomatis menyesuaikan posisi ketika ruang di bawah tidak cukup."
      code={`<div className="flex h-[300px] items-end">
  <Field label="Position">
    <Select options={options} />
  </Field>
</div>`}
    >
      <div className="flex h-[300px] items-end">
        <Field label="Position">
          <Select options={options} />
        </Field>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Real Example"
      description="Contoh penggunaan Select pada form aplikasi."
      code={`<>
  <Field label="Department" required>
    <Select options={options} />
  </Field>

  <Field label="Status">
    <Select options={options} />
  </Field>
</>`}
    >
      <div className="w-full max-w-md space-y-4">
        <Field label="Department" required>
          <Select options={options} />
        </Field>

        <Field label="Status">
          <Select options={options} />
        </Field>
      </div>
    </SectionPreview>
  </div>
);
