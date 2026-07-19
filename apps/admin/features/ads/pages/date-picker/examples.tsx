'use client';

import { useState } from 'react';
import { Field, DatePicker, Surface } from '@/components/ui';
import { SectionPreview } from '../../components/section-preview';

const longPlaceholder =
  'Pilih tanggal lengkap dengan bulan dan tahun yang detail untuk pencarian yang lebih spesifik';

export const DatePickerExamples = () => {
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();
  const [placeholderDate, setPlaceholderDate] = useState<Date | undefined>();
  const [controlledStartDate, setControlledStartDate] = useState<Date | undefined>(new Date());
  const [controlledEndDate, setControlledEndDate] = useState<Date | undefined>(new Date());
  const [errorDate, setErrorDate] = useState<Date | undefined>();
  const [smDate, setSmDate] = useState<Date | undefined>();
  const [mdDate, setMdDate] = useState<Date | undefined>();
  const [lgDate, setLgDate] = useState<Date | undefined>();
  const [surfaceDate, setSurfaceDate] = useState<Date | undefined>();
  const [multipleStartDate, setMultipleStartDate] = useState<Date | undefined>();
  const [multipleEndDate, setMultipleEndDate] = useState<Date | undefined>();
  const [longPlaceholderDate, setLongPlaceholderDate] = useState<Date | undefined>();
  const [resettableDate, setResettableDate] = useState<Date | undefined>();

  return (
    <>
      {/* Default */}
      <SectionPreview
        title="Default"
        description="DatePicker standar dengan placeholder."
        code={`<Field label="Tanggal">
  <DatePicker placeholder="Pilih tanggal" />
</Field>`}
      >
        <div className="w-full max-w-md">
          <Field label="Tanggal">
            <DatePicker value={defaultDate} onChange={setDefaultDate} placeholder="Pilih tanggal" />
          </Field>
        </div>
      </SectionPreview>

      {/* Placeholder */}
      <SectionPreview
        title="Placeholder"
        description="Gunakan placeholder untuk petunjuk pengguna."
        code={`<DatePicker
  placeholder="Pilih tanggal mulai"
/>`}
      >
        <div className="w-full max-w-md">
          <DatePicker
            value={placeholderDate}
            onChange={setPlaceholderDate}
            placeholder="Pilih tanggal mulai"
          />
        </div>
      </SectionPreview>

      {/* Controlled */}
      <SectionPreview
        title="Controlled"
        description="Gunakan controlled value untuk mengelola tanggal secara eksternal."
        code={`<>
  <div className="w-full max-w-xs">
    <Field label="Mulai">
      <DatePicker
        value={controlledStartDate}
        onChange={setControlledStartDate}
        placeholder="Pilih tanggal"
      />
    </Field>
  </div>

  <div className="w-full max-w-xs">
    <Field label="Selesai">
      <DatePicker
        value={controlledEndDate}
        onChange={setControlledEndDate}
        placeholder="Pilih tanggal"
      />
    </Field>
  </div>
</>`}
      >
        <div className="w-full max-w-2xl flex-wrap gap-4">
          <div className="w-full max-w-xs">
            <Field label="Mulai">
              <DatePicker
                value={controlledStartDate}
                onChange={setControlledStartDate}
                placeholder="Pilih tanggal"
              />
            </Field>
          </div>
          <div className="w-full max-w-xs">
            <Field label="Selesai">
              <DatePicker
                value={controlledEndDate}
                onChange={setControlledEndDate}
                placeholder="Pilih tanggal"
              />
            </Field>
          </div>
        </div>
      </SectionPreview>

      {/* Uncontrolled */}
      <SectionPreview
        title="Uncontrolled"
        description="Gunakan uncontrolled state untuk nilai internal."
        code={`<DatePicker
  defaultValue={new Date()}
/>`}
      >
        <div className="w-full max-w-md">
          <Field label="Tanggal">
            <DatePicker placeholder="Pilih tanggal" />
          </Field>
        </div>
      </SectionPreview>

      {/* Disabled */}
      <SectionPreview
        title="Disabled"
        description="Nonaktifkan DatePicker."
        code={`<DatePicker
  disabled
/>`}
      >
        <div className="w-full max-w-md">
          <Field label="Tanggal">
            <DatePicker disabled placeholder="Pilih tanggal" />
          </Field>
        </div>
      </SectionPreview>

      {/* Error */}
      <SectionPreview
        title="Error"
        description="Tampilkan state error."
        code={`<DatePicker
  status="error"
/>`}
      >
        <div className="w-full max-w-md">
          <Field label="Tanggal">
            <DatePicker
              value={errorDate}
              onChange={setErrorDate}
              status="error"
              placeholder="Pilih tanggal"
            />
          </Field>
        </div>
      </SectionPreview>

      {/* Sizes */}
      <SectionPreview
        title="Sizes"
        description="Gunakan ukuran sesuai kepadatan layout."
        code={`<>
  <DatePicker
    size="sm"
    placeholder="Small"
  />

  <DatePicker
    size="md"
    placeholder="Medium"
  />

  <DatePicker
    size="lg"
    placeholder="Large"
  />
</>`}
      >
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
      </SectionPreview>

      {/* Inside ADS Surface */}
      <SectionPreview
        title="Inside ADS Surface"
        description="DatePicker di dalam Surface."
        code={`<Surface className="p-6">
  <DatePicker placeholder="Pilih tanggal di dalam surface" />
</Surface>`}
      >
        <div className="w-full max-w-md">
          <Surface className="p-6">
            <Field label="Tanggal">
              <DatePicker
                value={surfaceDate}
                onChange={setSurfaceDate}
                placeholder="Pilih tanggal di dalam surface"
              />
            </Field>
          </Surface>
        </div>
      </SectionPreview>

      {/* Multiple DatePickers */}
      <SectionPreview
        title="Multiple DatePickers"
        description="Beberapa DatePicker dalam satu baris."
        code={`<>
  <DatePicker placeholder="Tanggal mulai" />
  <DatePicker placeholder="Tanggal selesai" />
</>`}
      >
        <div className="flex w-full max-w-2xl flex-wrap gap-4">
          <div className="w-full max-w-xs">
            <Field label="Mulai">
              <DatePicker
                value={multipleStartDate}
                onChange={setMultipleStartDate}
                placeholder="Tanggal mulai"
              />
            </Field>
          </div>
          <div className="w-full max-w-xs">
            <Field label="Selesai">
              <DatePicker
                value={multipleEndDate}
                onChange={setMultipleEndDate}
                placeholder="Tanggal selesai"
              />
            </Field>
          </div>
        </div>
      </SectionPreview>

      {/* Long Placeholder */}
      <SectionPreview
        title="Long Placeholder"
        description="Placeholder teks panjang."
        code={`<DatePicker
  placeholder="${longPlaceholder}"
/>`}
      >
        <div className="w-full max-w-md">
          <Field label="Tanggal">
            <DatePicker
              value={longPlaceholderDate}
              onChange={setLongPlaceholderDate}
              placeholder={longPlaceholder}
            />
          </Field>
        </div>
      </SectionPreview>

      {/* Resettable */}
      <SectionPreview
        title="Resettable"
        description="DatePicker with optional reset button. Reset only appears when resettable is enabled and a date is selected."
        code={`<DatePicker
  value={resettableDate}
  onChange={setResettableDate}
  placeholder="Pilih tanggal"
  resettable
/>`}
      >
        <div className="w-full max-w-md">
          <Field label="Tanggal">
            <DatePicker
              value={resettableDate}
              onChange={setResettableDate}
              placeholder="Pilih tanggal"
              resettable
            />
          </Field>
        </div>
      </SectionPreview>
    </>
  );
};
