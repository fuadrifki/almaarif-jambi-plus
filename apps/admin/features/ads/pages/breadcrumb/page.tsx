'use client';

import { useState } from 'react';

import { Breadcrumb } from '@/components/ui';
import { SectionPreview } from '../../components/section-preview';
import { User } from 'lucide-react';

export const BreadcrumbPage = () => {
  const [showHome, setShowHome] = useState(true);
  const [itemCount, setItemCount] = useState(3);
  const [useIcons, setUseIcons] = useState(false);
  const [labelLength, setLabelLength] = useState('normal');

  const items3 = [
    {
      label: 'Students',
      href: '/students',
      icon: useIcons ? User : undefined,
    },
    {
      label: 'Ahmad Fauzi',
      href: '/students/1',
    },
    {
      label: 'Edit',
    },
  ];

  const items2 = [
    {
      label: 'Students',
      href: '/students',
      icon: useIcons ? User : undefined,
    },
    {
      label: 'Create',
    },
  ];

  const itemsLong = [
    {
      label: 'Muhammed Abdullah Al-Zahar Al-Maārif',
      href: '/students',
    },
    {
      label: 'Al Baāqah Secondary School',
    },
  ];

  const itemsDeep = [
    {
      label: 'Administration',
      href: '/admin',
    },
    {
      label: 'Students',
      href: '/admin/students',
    },
    {
      label: 'Ahmad Fauzi',
      href: '/admin/students/1',
    },
    {
      label: 'Edit',
    },
  ];

  const getItems = () => {
    if (itemCount === 3) return items3;
    if (itemCount === 2) return items2;
    if (labelLength === 'long') return itemsLong;
    return itemsDeep;
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-secondary">Components</p>

        <h1 className="text-4xl font-bold tracking-tight">Breadcrumb</h1>

        <p className="text-secondary">
          Komponen Breadcrumb digunakan untuk navigasi hierarkis dan menunjukkan path pengguna.
          Setiap item menampilkan label dan status, dengan item terakhir mewakili halaman saat ini.
        </p>
      </header>

      <SectionPreview
        title="Dasar-dasar"
        description="Breadcrumb sederhana tanpa home, hanya navigasi hierarkis yang jelas."
        code={`<Breadcrumb
  items={[{
    label: 'Students',
    href: '/students',
  },
  {
    label: 'Create',
  }]}
/>`}
      >
        <Breadcrumb
          items={[
            {
              label: 'Students',
              href: '/students',
            },
            {
              label: 'Create',
            },
          ]}
        />
      </SectionPreview>

      <SectionPreview
        title="Dengan Home"
        description="Dasar-dasar Breadcrumb dengan home di awal untuk path lengkap."
        code={`<Breadcrumb
  items={[{
    label: 'Students',
    href: '/students',
  },
  {
    label: 'Create',
  }]}
/>`}
      >
        <Breadcrumb
          items={[
            {
              label: 'Students',
              href: '/students',
            },
            {
              label: 'Create',
            },
          ]}
        />
      </SectionPreview>

      <SectionPreview
        title="Detail Santri"
        description="Breadcrumb detail santri untuk edit halaman student."
        code={`<Breadcrumb
  items={[{
    label: 'Students',
    href: '/students',
  },
  {
    label: 'Ahmad Fauzi',
    href: '/students/1',
  },
  {
    label: 'Edit',
  }]}
/>`}
      >
        <Breadcrumb
          items={[
            {
              label: 'Students',
              href: '/students',
            },
            {
              label: 'Ahmad Fauzi',
              href: '/students/1',
            },
            {
              label: 'Edit',
            },
          ]}
        />
      </SectionPreview>

      <SectionPreview
        title="Label Panjang"
        description="Tangani label panjang dengan truncate."
        code={`<Breadcrumb
  {
    label: 'Muhammad Abdullah Al-Zahar Al-Maārif',
    href: '/students',
  },
  {
    label: 'Al Baāqah Secondary School',
  }]}
/>`}
      >
        <Breadcrumb
          items={[
            {
              label: 'Muhammad Abdullah Al-Zahar Al-Maārif',
              href: '/students',
            },
            {
              label: 'Al Baāqah Secondary School',
            },
          ]}
        />
      </SectionPreview>

      <SectionPreview
        title="Dengan Ikon"
        description="Tambahkan ikon untuk memperkuat makna setiap item."
        code={`<Breadcrumb
  items={[{
    label: 'Dashboard',
    href: '/dashboard',
    icon: <svg>Icon</svg>,
  },
  {
    label: 'Attendance',
    href: '/dashboard/attendance',
    icon: <svg>Icon</svg>,
  },
  {
    label: 'Report',
    icon: <svg>Icon</svg>,
  }]}
/>`}
      >
        <Breadcrumb
          items={[
            {
              label: 'Dashboard',
              href: '/dashboard',
              icon: User,
            },
            {
              label: 'Attendance',
              href: '/dashboard/attendance',
              icon: User,
            },
            {
              label: 'Report',
              icon: User,
            },
          ]}
        />
      </SectionPreview>

      <SectionPreview
        title="Hierarki Lengkap"
        description="Path navigasi yang lebih dalam untuk aksesibilitas cepat."
        code={`<Breadcrumb
  {
    label: 'Administration',
    href: '/admin',
  },
  {
    label: 'Students',
    href: '/admin/students',
  },
  {
    label: 'Ahmad Fauzi',
    href: '/admin/students/1',
  },
  {
    label: 'Edit',
  }]}
/>`}
      >
        <Breadcrumb
          items={[
            {
              label: 'Administration',
              href: '/admin',
            },
            {
              label: 'Students',
              href: '/admin/students',
            },
            {
              label: 'Ahmad Fauzi',
              href: '/admin/students/1',
            },
            {
              label: 'Edit',
            },
          ]}
        />
      </SectionPreview>

      <SectionPreview
        title="Responsif"
        description="Breadcrumb yang mencukupi kebutuhan layout mobile dan desktop."
        code={`<div className="w-full space-y-4">
  <div className="px-4 py-3 bg-card border border-border rounded-lg">
    <div className="text-xs text-secondary mb-2">Desktop View</div>
    <Breadcrumb items={[
    {
      label: 'Administration',
      href: '/admin',
    },
    {
      label: 'Students',
      href: '/admin/students',
    },
    {
      label: 'Ahmad Fauzi',
      href: '/admin/students/1',
    },
    {
      label: 'Edit',
    }]} />
  </div>

  <div className="px-4 py-3 bg-card border border-border rounded-lg">
    <div className="text-xs text-secondary mb-2">Mobile View</div>
    <div className="overflow-x-auto pb-2">
      <Breadcrumb items={[
      {
        label: 'Administration',
        href: '/admin',
      },
      {
        label: 'Students',
        href: '/admin/students',
      },
      {
        label: 'Ahmad Fauzi',
        href: '/admin/students/1',
      },
      {
        label: 'Edit',
      }]} />
    </div>
  </div>
</div>`}
      >
        <div className="w-full space-y-4">
          <div className="px-4 py-3 bg-card border border-border rounded-lg">
            <div className="text-xs text-secondary mb-2">Desktop View</div>
            <Breadcrumb
              items={[
                {
                  label: 'Administration',
                  href: '/admin',
                },
                {
                  label: 'Students',
                  href: '/admin/students',
                },
                {
                  label: 'Ahmad Fauzi',
                  href: '/admin/students/1',
                },
                {
                  label: 'Edit',
                },
              ]}
            />
          </div>

          <div className="px-4 py-3 bg-card border border-border rounded-lg">
            <div className="text-xs text-secondary mb-2">Mobile View</div>
            <div className="overflow-x-auto pb-2">
              <Breadcrumb
                items={[
                  {
                    label: 'Administration',
                    href: '/admin',
                  },
                  {
                    label: 'Students',
                    href: '/admin/students',
                  },
                  {
                    label: 'Ahmad Fauzi',
                    href: '/admin/students/1',
                  },
                  {
                    label: 'Edit',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Simbol Status"
        description="Tampilan visual untuk berbagai status item."
        code={`<>
  <div className="space-y-4">
    <div>
      <p className="text-sm font-medium mb-2">Default</p>
      <Breadcrumb items={[
      {
        label: 'Students',
        href: '/students',
      },
      {
        label: 'Current',
      }]} />
    </div>

    <div>
      <p className="text-sm font-medium mb-2">Dengan Ikon</p>
      <Breadcrumb items={[{
        label: 'Home',
        href: '/',
        icon: <svg>Icon</svg>,
      },
      {
        label: 'Students',
        href: '/students',
        icon: <svg>Icon</svg>,
      },
      {
        label: 'Current',
      }]} />
    </div>
  </div>
</>`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Default</p>
            <Breadcrumb
              items={[
                {
                  label: 'Students',
                  href: '/students',
                },
                {
                  label: 'Current',
                },
              ]}
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Dengan Ikon</p>
            <Breadcrumb
              items={[
                {
                  label: 'Students',
                  href: '/students',
                  icon: User,
                },
                {
                  label: 'Current',
                },
              ]}
            />
          </div>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Real-World Implementation"
        description="Contoh implementasi yang sebenarnya digunakan di halaman aplikasi."
        code={`<div className="flex justify-between items-center p-4 bg-card border border-border rounded-lg">
  <Breadcrumb
      items={[{
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Attendance',
      href: '/dashboard/attendance',
    },
    {
      label: 'Report',
    }]}
  />

  <div className="text-sm text-secondary">
    Halaman ini /dashboard/attendance
  </div>
</div>`}
      >
        <div className="flex justify-between items-center p-4 bg-card border border-border rounded-lg">
          <Breadcrumb
            items={[
              {
                label: 'Dashboard',
                href: '/dashboard',
              },
              {
                label: 'Attendance',
                href: '/dashboard/attendance',
              },
              {
                label: 'Report',
              },
            ]}
          />

          <div className="text-sm text-secondary">Page: /dashboard/attendance</div>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Kode API Publik"
        description="Contoh penggunaan Breadcrate dengan API publik lengkap."
        code={`<Breadcrumb
      items={[{
        label: "Students",
        href: "/students",
    },
    {
        label: "Ahmad Fauzi",
        href: "/students/1",
    },
    {
        label: "Edit",
    }]}
/>`}
      >
        <Breadcrumb
          items={[
            {
              label: 'Students',
              href: '/students',
            },
            {
              label: 'Ahmad Fauzi',
              href: '/students/1',
            },
            {
              label: 'Edit',
            },
          ]}
        />
      </SectionPreview>

      <SectionPreview
        title="Gunakan Playground"
        description="Gunakan playground interaktif untuk mengubah props."
        code={`<>
  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium mb-2 block">showHome</label>
      <input
        type="checkbox"
        checked={showHome}
        onChange={(e) => setShowHome(e.target.checked)}
      />
      <span className="ml-2 text-sm">{showHome ? 'Aktif' : 'Nonaktif'}</span>
    </div>

    <div>
      <label className="text-sm font-medium mb-2 block">Ikon</label>
      <input
        type="checkbox"
        checked={useIcons}
        onChange={(e) => setUseIcons(e.target.checked)}
      />
      <span className="ml-2 text-sm">{useIcons ? 'Aktif' : 'Nonaktif'}</span>
    </div>

    <div>
      <label className="text-sm font-medium mb-2 block">Jumlah Item</label>
      <select
        value={itemCount}
        onChange={(e) => setItemCount(Number(e.target.value))}
        className="px-2 py-1 border rounded"
      >
        <option value="2">2 Item</option>
        <option value="3">3 Item</option>
        <option value="5">5 Item</option>
      </select>
    </div>

    <Breadcrumb showHome={showHome} items={getItems()} />
  </div>
</>`}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">showHome</label>
            <input
              type="checkbox"
              checked={showHome}
              onChange={(e) => setShowHome(e.target.checked)}
            />
            <span className="ml-2 text-sm">{showHome ? 'Aktif' : 'Nonaktif'}</span>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Ikon</label>
            <input
              type="checkbox"
              checked={useIcons}
              onChange={(e) => setUseIcons(e.target.checked)}
            />
            <span className="ml-2 text-sm">{useIcons ? 'Aktif' : 'Nonaktif'}</span>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Jumlah Item</label>
            <select
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              className="px-2 py-1 border rounded"
            >
              <option value="2">2 Item</option>
              <option value="3">3 Item</option>
              <option value="5">5 Item</option>
            </select>
          </div>

          <Breadcrumb showHome={showHome} items={getItems()} />
        </div>
      </SectionPreview>
    </div>
  );
};
