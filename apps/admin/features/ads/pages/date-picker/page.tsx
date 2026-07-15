import { DatePickerExamples } from './examples';

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

    <DatePickerExamples />
  </div>
);
