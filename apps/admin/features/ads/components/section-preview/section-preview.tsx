import type { ReactNode } from 'react';
import { CodePreview } from '../code-preview';

interface SectionPreviewProps {
  title: string;
  description?: string;
  code?: string;
  children: ReactNode;
}

export function SectionPreview({ title, description, code, children }: SectionPreviewProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{title}</h2>

        {description && <p className="text-(--text-secondary)">{description}</p>}
      </div>

      <div className="p-6 border border-(--border) rounded-xl">{children}</div>

      {code && <CodePreview code={code} />}
    </section>
  );
}
