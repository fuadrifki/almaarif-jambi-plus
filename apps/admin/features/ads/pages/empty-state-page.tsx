import { EmptyState, Button } from '@/components/ui';
import { Users, Search, FileX } from 'lucide-react';

import { SectionPreview } from '../components/section-preview';

export const EmptyStatePage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Empty State</h1>

      <p className="mt-2 text-secondary">
        A placeholder for areas with no data yet. Provides clear messaging and an optional action to
        guide the user toward their next step.
      </p>
    </section>

    <SectionPreview
      title="Basic"
      code={`<EmptyState
  icon={<Users size={32} />}
  title="Belum ada data"
  description="Data siswa belum tersedia."
/>`}
    >
      <EmptyState
        icon={<Users size={32} />}
        title="Belum ada data"
        description="Data siswa belum tersedia."
      />
    </SectionPreview>

    <SectionPreview
      title="With Action"
      code={`<EmptyState
  icon={<Users size={32} />}
  title="Belum ada siswa"
  description="Mulai dengan menambahkan siswa baru."
  action={<Button>Tambah Siswa</Button>}
/>`}
    >
      <EmptyState
        icon={<Users size={32} />}
        title="Belum ada siswa"
        description="Mulai dengan menambahkan siswa baru."
        action={<Button>Tambah Siswa</Button>}
      />
    </SectionPreview>

    <SectionPreview
      title="No Search Results"
      code={`<EmptyState
  icon={<Search size={32} />}
  title="Tidak ada hasil"
  description="Coba kata kunci yang berbeda."
/>`}
    >
      <EmptyState
        icon={<Search size={32} />}
        title="Tidak ada hasil"
        description="Coba kata kunci yang berbeda."
      />
    </SectionPreview>

    <SectionPreview
      title="Error State"
      code={`<EmptyState
  icon={<FileX size={32} />}
  title="Gagal memuat data"
  description="Terjadi kesalahan saat memuat data. Silakan coba lagi."
  action={<Button variant="secondary">Coba Lagi</Button>}
/>`}
    >
      <EmptyState
        icon={<FileX size={32} />}
        title="Gagal memuat data"
        description="Terjadi kesalahan saat memuat data. Silakan coba lagi."
        action={<Button variant="secondary">Coba Lagi</Button>}
      />
    </SectionPreview>

    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-primary">Props</h3>

      <div className="mt-3 space-y-2 text-xs text-secondary">
        <div>
          <code className="text-primary">icon</code> — ReactNode, optional. Icon displayed in the
          circle above the title.
        </div>
        <div>
          <code className="text-primary">title</code> — string, required. Primary message.
        </div>
        <div>
          <code className="text-primary">description</code> — string, optional. Supplementary
          explanation below the title.
        </div>
        <div>
          <code className="text-primary">action</code> — ReactNode, optional. Button or link for the
          user&apos;s next action.
        </div>
      </div>
    </section>
  </div>
);
