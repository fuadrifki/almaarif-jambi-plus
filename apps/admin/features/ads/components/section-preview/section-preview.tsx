import type { ReactNode } from 'react';
import { CodePreview } from '../code-preview';

type SectionPreviewProps = {
  title: string;
  description?: string;
  code?: string;
  children: ReactNode;
};

export const SectionPreview = ({ title, description, code, children }: SectionPreviewProps) => (
  <section className="space-y-4">
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold">{title}</h2>

      {description && <p className="text-secondary">{description}</p>}
    </div>

    <div className="p-6 border border-border rounded-xl min-h-[200px]">{children}</div>

    {code && <CodePreview code={code} />}
  </section>
);
