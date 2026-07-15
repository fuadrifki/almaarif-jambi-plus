import { ColorPreview } from '../../components/color-preview';
import { SectionPreview } from '../../components/section-preview';

const colors = [
  {
    name: 'Brand',
    token: '--brand',
    value: 'var(--brand)',
  },
  {
    name: 'Surface',
    token: '--surface',
    value: 'var(--surface)',
  },
  {
    name: 'Background',
    token: '--background',
    value: 'var(--background)',
  },
  {
    name: 'Text Primary',
    token: '--text-primary',
    value: 'var(--text-primary)',
  },
  {
    name: 'Text Secondary',
    token: '--text-secondary',
    value: 'var(--text-secondary)',
  },
  {
    name: 'Border',
    token: '--border',
    value: 'var(--border)',
  },
  {
    name: 'Success',
    token: '--success',
    value: 'var(--success)',
  },
  {
    name: 'Warning',
    token: '--warning',
    value: 'var(--warning)',
  },
  {
    name: 'Danger',
    token: '--danger',
    value: 'var(--danger)',
  },
];

export const ColorsPage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-secondary">Foundations</p>

      <h1 className="text-4xl font-bold tracking-tight">Colors</h1>

      <p className="text-secondary">Semantic color tokens yang digunakan ADS.</p>
    </header>

    <SectionPreview title="Color Tokens" description="Preview warna berdasarkan CSS variables.">
      <ColorPreview items={colors} />
    </SectionPreview>
  </div>
);
