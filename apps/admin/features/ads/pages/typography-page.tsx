import { SectionPreview } from '../components/section-preview';
import { TokenPreview } from '../components/token-preview';

const typographyExamples = [
  {
    title: 'Display',
    description: 'Untuk judul utama halaman atau hero section.',
    className: 'text-5xl font-bold tracking-tight',
    text: 'Almaarif Dashboard',
    code: `<h1 className="text-5xl font-bold tracking-tight">
  Almaarif Dashboard
</h1>`,
  },
  {
    title: 'Heading 1',
    description: 'Judul utama halaman aplikasi.',
    className: 'text-4xl font-bold tracking-tight',
    text: 'Dashboard',
    code: `<h1 className="text-4xl font-bold tracking-tight">
  Dashboard
</h1>`,
  },
  {
    title: 'Heading 2',
    description: 'Sub bagian utama dalam halaman.',
    className: 'text-2xl font-semibold',
    text: 'User Management',
    code: `<h2 className="text-2xl font-semibold">
  User Management
</h2>`,
  },
  {
    title: 'Body',
    description: 'Text utama untuk konten aplikasi.',
    className: 'text-base',
    text: 'Kelola data pengguna dan aktivitas sistem.',
    code: `<p className="text-base">
  Kelola data pengguna dan aktivitas sistem.
</p>`,
  },
  {
    title: 'Caption',
    description: 'Informasi tambahan dan metadata.',
    className: 'text-sm text-(--text-secondary)',
    text: 'Updated 2 minutes ago',
    code: `<span className="text-sm text-(--text-secondary)">
  Updated 2 minutes ago
</span>`,
  },
];

export const TypographyPage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-(--text-secondary)">Foundations</p>

      <h1 className="text-4xl font-bold tracking-tight">Typography</h1>

      <p className="text-(--text-secondary)">
        Sistem tipografi yang digunakan pada aplikasi Almaarif.
      </p>
    </header>

    {typographyExamples.map((item) => (
      <SectionPreview
        key={item.title}
        title={item.title}
        description={item.description}
        code={item.code}
      >
        <p className={item.className}>{item.text}</p>
      </SectionPreview>
    ))}

    <SectionPreview title="Tokens" description="Token typography yang digunakan ADS.">
      <TokenPreview
        items={[
          {
            name: 'Font Family',
            value: 'Montserrat',
          },
          {
            name: 'Display',
            value: 'text-5xl font-bold',
          },
          {
            name: 'Heading',
            value: 'text-4xl font-bold',
          },
          {
            name: 'Body',
            value: 'text-base',
          },
          {
            name: 'Caption',
            value: 'text-sm',
          },
        ]}
      />
    </SectionPreview>
  </div>
);
