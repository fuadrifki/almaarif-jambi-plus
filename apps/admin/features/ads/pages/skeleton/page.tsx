import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, Surface } from '@/components/ui';

import { SectionPreview } from '../../components/section-preview';

export const SkeletonPage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Skeleton</h1>

      <p className="mt-2 text-secondary">
        Placeholder loading indicators that approximate the shape of content. Used while data is
        being fetched to reduce perceived wait time.
      </p>
    </section>

    <SectionPreview
      title="Basic"
      code={`<Skeleton className="h-10 w-full" />
<Skeleton className="h-10 w-2/3" />
<Skeleton className="h-10 w-1/2" />`}
    >
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-2/3" />

        <Skeleton className="h-10 w-1/2" />
      </div>
    </SectionPreview>

    <SectionPreview title="Text Block" code={`<SkeletonText lines={3} />`}>
      <SkeletonText lines={3} />
    </SectionPreview>

    <SectionPreview
      title="Avatar"
      code={`<SkeletonAvatar size={40} />
<SkeletonAvatar size={32} />
<SkeletonAvatar size={24} />`}
    >
      <div className="flex items-end gap-4">
        <SkeletonAvatar size={40} />

        <SkeletonAvatar size={32} />

        <SkeletonAvatar size={24} />
      </div>
    </SectionPreview>

    <SectionPreview
      title="Card Skeleton"
      code={`<Surface className="p-0">
  <SkeletonCard />
</Surface>`}
    >
      <Surface className="p-0">
        <SkeletonCard />
      </Surface>
    </SectionPreview>

    <SectionPreview
      title="Full Page Example"
      code={`<div className="space-y-4">
  <Skeleton className="h-8 w-1/3" />
  <Surface className="p-0">
    <SkeletonCard />
  </Surface>
  <Surface className="p-0">
    <SkeletonCard />
  </Surface>
</div>`}
    >
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />

        <Surface className="p-0">
          <SkeletonCard />
        </Surface>

        <Surface className="p-0">
          <SkeletonCard />
        </Surface>
      </div>
    </SectionPreview>

    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-primary">Components</h3>

      <div className="mt-3 space-y-2 text-xs text-secondary">
        <div>
          <code className="text-primary">Skeleton</code> — Base block. Accepts{' '}
          <code>className</code> for custom sizing.
        </div>
        <div>
          <code className="text-primary">SkeletonText</code> — Multi-line text placeholder.
          <code> lines</code> prop defaults to 3.
        </div>
        <div>
          <code className="text-primary">SkeletonAvatar</code> — Circular avatar placeholder.{' '}
          <code>size</code> prop defaults to 40px.
        </div>
        <div>
          <code className="text-primary">SkeletonCard</code> — Composite card skeleton with avatar +
          text lines.
        </div>
      </div>
    </section>
  </div>
);
