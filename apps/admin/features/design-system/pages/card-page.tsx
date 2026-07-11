import { Card } from '@/components/ui';
import { SectionPreview } from '../components/section-preview';

export function CardPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-(--text-secondary)">Components</p>

        <h1 className="text-4xl font-bold tracking-tight">Card</h1>
      </header>

      <SectionPreview
        title="Basic Card"
        description="Card menggunakan Surface sebagai base."
        code={`<Card
  title="Dashboard"
  description="Ringkasan informasi"
>
  Content
</Card>`}
      >
        <Card title="Dashboard" description="Ringkasan informasi">
          <p>Isi card berada di sini.</p>
        </Card>
      </SectionPreview>
    </div>
  );
}
