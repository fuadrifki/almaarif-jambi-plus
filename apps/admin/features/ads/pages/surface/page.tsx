import { Surface } from '@/components/ui';
import { SectionPreview } from '../../components/section-preview';

export const SurfacePage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-secondary">Components</p>

      <h1 className="text-4xl font-bold tracking-tight">Surface</h1>

      <p className="text-secondary">
        Komponen dasar ADS untuk membuat container dengan efek glass, blur, border, dan elevation.
      </p>
    </header>

    <SectionPreview
      title="Default"
      description="Surface utama ADS."
      code={`<Surface className="p-6">
  Content
</Surface>`}
    >
      <Surface className="p-6">
        <p className="font-medium">Surface Preview</p>

        <p className="mt-2 text-sm text-secondary">Glass surface component.</p>
      </Surface>
    </SectionPreview>

    <SectionPreview
      title="Panel Content"
      description="Surface dapat digunakan sebagai container informasi."
      code={`<Surface className="max-w-md p-6">
  <h3 className="font-semibold">
    Title
  </h3>

  <p>
    Description
  </p>
</Surface>`}
    >
      <Surface className="max-w-md p-6">
        <h3 className="font-semibold">Dashboard Card</h3>

        <p className="mt-2 text-sm text-secondary">
          Surface menjadi primitive untuk komponen lain.
        </p>
      </Surface>
    </SectionPreview>
  </div>
);
