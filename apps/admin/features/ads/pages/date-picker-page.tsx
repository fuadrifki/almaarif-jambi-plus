import { DefaultDatePickerExample } from '../components/default-datepicker-example';
import { PlaceholderDatePickerExample } from '../components/placeholder-datepicker-example';
import { ControlledDatePickerExample } from '../components/controlled-datepicker-example';
import { UncontrolledDatePickerExample } from '../components/uncontrolled-datepicker-example';
import { DisabledDatePickerExample } from '../components/disabled-datepicker-example';
import { ErrorDatePickerExample } from '../components/error-datepicker-example';
import { SizeDatePickerExamples } from '../components/size-datepicker-example';
import { InsideSurfaceDatePickerExample } from '../components/surface-datepicker-example';
import { MultipleDatePickerExamples } from '../components/multiple-datepicker-example';
import { LongPlaceholderDatePickerExample } from '../components/long-placeholder-datepicker-example';

import { DatePicker, Field, Surface } from '@/components/ui';
import { SectionPreview } from '../components/section-preview';

const longPlaceholder =
  'Pilih tanggal lengkap dengan bulan dan tahun yang detail untuk pencarian yang lebih spesifik';

export const DatePickerPage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-secondary">Components</p>

      <h1 className="text-4xl font-bold tracking-tight">DatePicker</h1>

      <p className="text-secondary">
        DatePicker digunakan untuk memilih tanggal dengan kalender yang dapat di-popup, kompatibel
        dengan keyboard navigation, collision detection, dan liquid glass styling.
      </p>
    </header>

    <SectionPreview
      title="Default"
      description="DatePicker standar dengan placeholder."
      code={`<Field label="Tanggal">
  <DatePicker placeholder="Pilih tanggal" />
</Field>`}
    >
      <DefaultDatePickerExample />
    </SectionPreview>

    <SectionPreview
      title="Placeholder"
      description="Gunakan placeholder untuk petunjuk pengguna."
      code={`<DatePicker
  placeholder="Pilih tanggal mulai"
/>`}
    >
      <PlaceholderDatePickerExample />
    </SectionPreview>

    <SectionPreview
      title="Controlled"
      description="Gunakan controlled value untuk mengelola tanggal secara eksternal."
      code={`<DatePicker
  value={new Date()}
  onChange={(date) => console.log(date)}
/>`}
    >
      <ControlledDatePickerExample />
    </SectionPreview>

    <SectionPreview
      title="Uncontrolled"
      description="Gunakan uncontrolled state untuk nilai internal."
      code={`<DatePicker
  defaultValue={new Date()}
/>`}
    >
      <UncontrolledDatePickerExample />
    </SectionPreview>

    <SectionPreview
      title="Disabled"
      description="Nonaktifkan DatePicker."
      code={`<DatePicker
  disabled
/>`}
    >
      <DisabledDatePickerExample />
    </SectionPreview>

    <SectionPreview
      title="Error"
      description="Tampilkan state error."
      code={`<DatePicker
  status="error"
/>`}
    >
      <ErrorDatePickerExample />
    </SectionPreview>

    <SectionPreview
      title="Sizes"
      description="Gunakan ukuran sesuai kepadatan layout."
      code={`<>
  <DatePicker size="sm" placeholder="Small" />
  <DatePicker size="md" placeholder="Medium" />
  <DatePicker size="lg" placeholder="Large" />
</>`}
    >
      <SizeDatePickerExamples />
    </SectionPreview>

    <SectionPreview
      title="Inside ADS Surface"
      description="DatePicker di dalam Surface."
      code={`<Surface className="p-6">
  <DatePicker placeholder="Pilih tanggal di dalam surface" />
</Surface>`}
    >
      <InsideSurfaceDatePickerExample />
    </SectionPreview>

    <SectionPreview
      title="Multiple DatePickers"
      description="Beberapa DatePicker dalam satu baris."
      code={`<>
  <DatePicker placeholder="Tanggal mulai" />
  <DatePicker placeholder="Tanggal selesai" />
</>`}
    >
      <MultipleDatePickerExamples />
    </SectionPreview>

    <SectionPreview
      title="Long Placeholder"
      description="Placeholder teks panjang."
      code={`<DatePicker
  placeholder="${longPlaceholder}"
/>`}
    >
      <LongPlaceholderDatePickerExample />
    </SectionPreview>
  </div>
);
