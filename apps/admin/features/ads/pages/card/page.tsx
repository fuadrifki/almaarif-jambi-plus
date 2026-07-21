import { Card } from '@/components/ui';
import { SectionPreview } from '../../components/section-preview';

export const CardPage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-secondary">Components</p>

      <h1 className="text-4xl font-bold tracking-tight">Card</h1>

      <p className="text-secondary">
        Komponen dasar ADS untuk membuat container dengan efek glass, blur, border, dan elevation.
      </p>
    </header>

    <SectionPreview
      title="Basic Card"
      description="Card menggunakan Card sebagai base."
      code={`<Card
  title="Dashboard"
  description="Ringkasan informasi"
>
  Isi card berada di sini.
</Card>`}
    >
      <Card title="Dashboard" description="Ringkasan informasi">
        <p>Isi card berada di sini.</p>
      </Card>
    </SectionPreview>
  </div>
);
