import { Badge } from '@/components/ui';

import { SectionPreview } from '../../components/section-preview';

export const BadgePage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-secondary">Components</p>

      <h1 className="text-4xl font-bold tracking-tight">Badge</h1>

      <p className="text-secondary">
        Badge digunakan untuk menampilkan status atau label singkat. Gunakan variant yang sesuai
        untuk mengkomunikasikan makna secara visual.
      </p>
    </header>

    <SectionPreview
      title="Variants"
      description="Gunakan variant untuk menunjukkan status: default untuk netral, success untuk berhasil, warning untuk peringatan, danger untuk error, dan info untuk informasi."
      code={`<>
  <Badge>Default</Badge>

  <Badge variant="success">
    Berhasil
  </Badge>

  <Badge variant="warning">
    Peringatan
  </Badge>

  <Badge variant="danger">
    Error
  </Badge>

  <Badge variant="info">
    Info
  </Badge>
</>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Default</Badge>

        <Badge variant="success">Berhasil</Badge>

        <Badge variant="warning">Peringatan</Badge>

        <Badge variant="danger">Error</Badge>

        <Badge variant="info">Info</Badge>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Real Example"
      description="Contoh penggunaan badge pada tampilan data santri atau absensi."
      code={`<div className="flex flex-wrap items-center gap-3">
  <Badge variant="success">Hadir</Badge>

  <Badge variant="danger">Alpha</Badge>

  <Badge variant="warning">Sakit</Badge>

  <Badge variant="info">Izin</Badge>
</div>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="success">Hadir</Badge>

        <Badge variant="danger">Alpha</Badge>

        <Badge variant="warning">Sakit</Badge>

        <Badge variant="info">Izin</Badge>
      </div>
    </SectionPreview>
  </div>
);
