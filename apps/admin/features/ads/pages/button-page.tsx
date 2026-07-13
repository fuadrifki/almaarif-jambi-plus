import { Button } from '@/components/ui';
import { Check, ChevronRight, Plus } from 'lucide-react';

import { SectionPreview } from '../components/section-preview';

export const ButtonPage = () => (
  <div className="space-y-10">
    <header className="space-y-2">
      <p className="text-sm font-medium text-secondary">Components</p>

      <h1 className="text-4xl font-bold tracking-tight">Button</h1>

      <p className="text-secondary">
        Button digunakan untuk menjalankan aksi pengguna. Selalu gunakan variant yang sesuai dengan
        tingkat prioritas aksi.
      </p>
    </header>

    <SectionPreview
      title="Variants"
      description="Gunakan primary untuk aksi utama, secondary untuk aksi pendukung, ghost untuk aksi ringan, dan danger untuk aksi destruktif."
      code={`<>
  <Button>Primary</Button>

  <Button variant="secondary">
    Secondary
  </Button>

  <Button variant="ghost">
    Ghost
  </Button>

  <Button variant="danger">
    Delete
  </Button>
</>`}
    >
      <div className="flex flex-wrap gap-4">
        <Button>Primary</Button>

        <Button variant="secondary">Secondary</Button>

        <Button variant="ghost">Ghost</Button>

        <Button variant="danger">Delete</Button>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Sizes"
      description="Gunakan ukuran sesuai kepadatan layout."
      code={`<>
  <Button size="sm">
    Small
  </Button>

  <Button>
    Medium
  </Button>

  <Button size="lg">
    Large
  </Button>
</>`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>

        <Button>Medium</Button>

        <Button size="lg">Large</Button>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Icons"
      description="Icon membantu pengguna mengenali aksi lebih cepat."
      code={`<>
  <Button leftIcon={<Plus />}>
    Tambah Data
  </Button>

  <Button rightIcon={<ChevronRight />}>
    Selanjutnya
  </Button>

  <Button
    variant="secondary"
    leftIcon={<Check />}
  >
    Simpan
  </Button>
</>`}
    >
      <div className="flex flex-wrap gap-4">
        <Button leftIcon={<Plus size={18} />}>Tambah Data</Button>

        <Button rightIcon={<ChevronRight size={18} />}>Selanjutnya</Button>

        <Button variant="secondary" leftIcon={<Check size={18} />}>
          Simpan
        </Button>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Loading & Disabled"
      description="Gunakan loading ketika proses sedang berjalan agar pengguna tidak melakukan klik berulang."
      code={`<>
  <Button status="loading">
    Menyimpan...
  </Button>

  <Button disabled>
    Disabled
  </Button>
</>`}
    >
      <div className="flex flex-wrap gap-4">
        <Button status="loading">Menyimpan...</Button>

        <Button disabled>Disabled</Button>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Real Example"
      description="Contoh implementasi yang umum digunakan pada halaman aplikasi."
      code={`<div className="flex justify-end gap-3">
  <Button variant="ghost">
    Batal
  </Button>

  <Button variant="secondary">
    Simpan Draft
  </Button>

  <Button>
    Publikasikan
  </Button>
</div>`}
    >
      <div className="flex justify-end gap-3">
        <Button variant="ghost">Batal</Button>

        <Button variant="secondary">Simpan Draft</Button>

        <Button>Publikasikan</Button>
      </div>
    </SectionPreview>
  </div>
);
