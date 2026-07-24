import {
  Badge,
  Button,
  EmptyState,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { CLASSES } from '@/config/lookups';
import { ClipboardCheck, Eye, MapPin, Pencil, Phone, Trash2, User } from 'lucide-react';

import { SectionPreview } from '../../components/section-preview';

const sampleStudents = [
  {
    nis: '001',
    name: 'Ahmad Rabbani',
    classId: 'VII-A',
    room: '101',
    phone: '0812-3456-7890',
    status: 'active',
  },
  {
    nis: '002',
    name: 'Fatimah Azzahra',
    classId: 'VII-A',
    room: '101',
    phone: '0812-3456-7891',
    status: 'active',
  },
  {
    nis: '003',
    name: 'Muhammad Fadil',
    classId: 'VII-B',
    room: '102',
    phone: '0812-3456-7892',
    status: 'inactive',
  },
  {
    nis: '004',
    name: 'Aisyah Putri',
    classId: 'VII-B',
    room: '102',
    phone: '0812-3456-7893',
    status: 'active',
  },
  {
    nis: '005',
    name: 'Umar Faruq',
    classId: 'VIII-A',
    room: '201',
    phone: '0812-3456-7894',
    status: 'active',
  },
];

const longContentRows = Array.from({ length: 20 }, (_, i) => ({
  nis: String(i + 1).padStart(3, '0'),
  name: `Santri Nomor ${i + 1} dengan Nama Panjang yang Cukup Panjang untuk Demonstrasi`,
  classId: ['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A'][i % 5],
  room: String(101 + (i % 5)),
  guardian: `Orang Tua ${i + 1} dengan Nama Juga Panjang`,
  address: `Jl. Pendidikan No. ${i + 1}, Kecamatan Pesantren, Kota Islamic Boarding School, Provinsi Jambi`,
}));

const getClassLabel = (classId: string) =>
  CLASSES.find((c) => c.value === classId)?.label ?? classId;

export const TablePage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Table</h1>

      <p className="mt-2 text-secondary">
        Compound component for displaying tabular data. Built with semantic HTML, glass container,
        and sticky header support.
      </p>
    </section>

    <SectionPreview
      title="Basic"
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead>Ruang</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {students.map((s) => (
      <TableRow key={s.nis}>
        <TableCell>{s.nis}</TableCell>
        <TableCell>{s.name}</TableCell>
        <TableCell>{s.classId}</TableCell>
        <TableCell>{s.room}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Ruang</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleStudents.map((s) => (
            <TableRow key={s.nis}>
              <TableCell>{s.nis}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{getClassLabel(s.classId)}</TableCell>
              <TableCell>{s.room}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionPreview>

    <SectionPreview
      title="Table with Icons"
      description="Combine icons with text for richer data presentation."
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nama</TableHead>
      <TableHead>Telepon</TableHead>
      <TableHead>Alamat</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {students.map((s) => (
      <TableRow key={s.nis}>
        <TableCell>
          <div className="flex items-center gap-2">
            <User size={14} className="text-secondary" />
            <span>{s.name}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-secondary" />
            <span>{s.phone}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-secondary" />
            <span className="truncate max-w-[200px]">{s.address}</span>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Telepon</TableHead>
            <TableHead>Alamat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleStudents.map((s) => (
            <TableRow key={s.nis}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-secondary" />
                  <span>{s.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-secondary" />
                  <span>{s.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-secondary" />
                  <span className="truncate max-w-[200px]">
                    Jl. Pendidikan No. {s.nis}, Kecamatan Pesantren
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionPreview>

    <SectionPreview
      title="Table with Badges"
      description="Use Badge to display status or categorical data."
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {students.map((s) => (
      <TableRow key={s.nis}>
        <TableCell>{s.nis}</TableCell>
        <TableCell>{s.name}</TableCell>
        <TableCell>{s.classId}</TableCell>
        <TableCell>
          <Badge variant={s.status === 'active' ? 'success' : 'danger'}>
            {s.status === 'active' ? 'Aktif' : 'Nonaktif'}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleStudents.map((s) => (
            <TableRow key={s.nis}>
              <TableCell>{s.nis}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{getClassLabel(s.classId)}</TableCell>
              <TableCell>
                <Badge variant={s.status === 'active' ? 'success' : 'danger'}>
                  {s.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionPreview>

    <SectionPreview
      title="Table with Actions"
      description="Include action buttons in the last column for row-level operations."
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead className="text-right">Aksi</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {students.map((s) => (
      <TableRow key={s.nis}>
        <TableCell>{s.nis}</TableCell>
        <TableCell>{s.name}</TableCell>
        <TableCell>{s.classId}</TableCell>
        <TableCell>
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
              Lihat
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<Pencil size={14} />}>
              Edit
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />}>
              Hapus
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleStudents.map((s) => (
            <TableRow key={s.nis}>
              <TableCell>{s.nis}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{getClassLabel(s.classId)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
                    Lihat
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<Pencil size={14} />}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />}>
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionPreview>

    <SectionPreview
      title="Loading"
      description="Use Skeleton inside cells to indicate loading state. Vary widths to simulate real content."
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {Array.from({ length: 5 }, (_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-10" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[140px]" style={{ width: 100 + (i % 3) * 20 }} /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-5 w-14 rounded-full" /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" style={{ width: 100 + (i % 3) * 20 }} />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-14 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionPreview>

    <SectionPreview
      title="Empty State"
      description="Use EmptyState when there is no data to display."
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama</TableHead>
      <TableHead>Kelas</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell colSpan={3}>
        <EmptyState
          icon={<ClipboardCheck size={32} />}
          title="Belum ada absensi"
          description="Mulai mencatat kehadiran santri hari ini."
        />
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>
              <EmptyState
                icon={<ClipboardCheck size={32} />}
                title="Belum ada absensi"
                description="Mulai mencatat kehadiran santri hari ini."
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </SectionPreview>

    <SectionPreview
      title="Sticky Header"
      description="Header stays fixed when scrolling vertically. Set maxHeight on the Table to enable vertical scrolling with a glass header."
      code={`<Table maxHeight={300}>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead>Ruang</TableHead>
      <TableHead>Wali</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {manyRows.map((s) => (
      <TableRow key={s.nis}>
        <TableCell>{s.nis}</TableCell>
        <TableCell>{s.name}</TableCell>
        <TableCell>{s.classId}</TableCell>
        <TableCell>{s.room}</TableCell>
        <TableCell>{s.guardian}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
    >
      <Table maxHeight={300}>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Ruang</TableHead>
            <TableHead>Wali</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {longContentRows.map((s) => (
            <TableRow key={s.nis}>
              <TableCell>{s.nis}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{getClassLabel(s.classId)}</TableCell>
              <TableCell>{s.room}</TableCell>
              <TableCell>{s.guardian}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionPreview>

    <SectionPreview
      title="Horizontal Scroll"
      description="Table scrolls horizontally on smaller screens when content overflows."
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama Santri</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead>Ruang</TableHead>
      <TableHead>Wali Murid</TableHead>
      <TableHead>Alamat Lengkap</TableHead>
      <TableHead>No. Telepon</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>...</TableBody>
</Table>`}
    >
      <div className="max-w-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIS</TableHead>
              <TableHead>Nama Santri</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Ruang</TableHead>
              <TableHead>Wali Murid</TableHead>
              <TableHead>Alamat Lengkap</TableHead>
              <TableHead>No. Telepon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {longContentRows.slice(0, 5).map((s) => (
              <TableRow key={s.nis}>
                <TableCell>{s.nis}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{getClassLabel(s.classId)}</TableCell>
                <TableCell>{s.room}</TableCell>
                <TableCell>{s.guardian}</TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>0812-3456-7890</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Long Content"
      description="Table with many rows and wide content. Sticky header keeps context visible while scrolling."
      code={`<Table maxHeight={400}>
  <TableHeader>
    <TableRow>
      <TableHead>NIS</TableHead>
      <TableHead>Nama Santri</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead>Ruang</TableHead>
      <TableHead>Wali Murid</TableHead>
      <TableHead>Alamat</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {longContentRows.map((s) => (
      <TableRow key={s.nis}>
        <TableCell>{s.nis}</TableCell>
        <TableCell className="max-w-[200px] truncate">{s.name}</TableCell>
        <TableCell>{s.classId}</TableCell>
        <TableCell>{s.room}</TableCell>
        <TableCell className="max-w-[150px] truncate">{s.guardian}</TableCell>
        <TableCell className="max-w-[250px] truncate">{s.address}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
    >
      <Table maxHeight={400}>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama Santri</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Ruang</TableHead>
            <TableHead>Wali Murid</TableHead>
            <TableHead>Alamat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {longContentRows.map((s) => (
            <TableRow key={s.nis}>
              <TableCell>{s.nis}</TableCell>
              <TableCell className="max-w-[200px] truncate">{s.name}</TableCell>
              <TableCell>{getClassLabel(s.classId)}</TableCell>
              <TableCell>{s.room}</TableCell>
              <TableCell className="max-w-[150px] truncate">{s.guardian}</TableCell>
              <TableCell className="max-w-[250px] truncate">{s.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionPreview>

    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-primary">Components</h3>

      <div className="mt-3 space-y-2 text-xs text-secondary">
        <div>
          <code className="text-primary">Table</code> — Root container. Wraps content in Card
          (glass) with scrollable area. Accepts <code>maxHeight</code> for sticky header.
        </div>
        <div>
          <code className="text-primary">TableHeader</code> — Renders <code>&lt;thead&gt;</code>.
          Sticky by default.
        </div>
        <div>
          <code className="text-primary">TableBody</code> — Renders <code>&lt;tbody&gt;</code>.
        </div>
        <div>
          <code className="text-primary">TableFooter</code> — Renders <code>&lt;tfoot&gt;</code>.
        </div>
        <div>
          <code className="text-primary">TableRow</code> — Renders <code>&lt;tr&gt;</code>. Hover
          highlight included.
        </div>
        <div>
          <code className="text-primary">TableHead</code> — Renders <code>&lt;th&gt;</code>.
          Uppercase, secondary color, glass background.
        </div>
        <div>
          <code className="text-primary">TableCell</code> — Renders <code>&lt;td&gt;</code>.
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs text-secondary">
        <h4 className="font-semibold text-primary">Modifier Classes</h4>
        <div>
          <code className="text-primary">ads-table--compact</code> — Reduced padding and font size.
        </div>
        <div>
          <code className="text-primary">ads-table--striped</code> — Alternating row backgrounds.
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs text-secondary">
        <h4 className="font-semibold text-primary">Usage Notes</h4>
        <div>
          Loading state: Use <code>Skeleton</code> inside cells with varying widths.
        </div>
        <div>
          Empty state: Use <code>EmptyState</code> inside a <code>TableCell</code> with{' '}
          <code>colSpan</code>.
        </div>
        <div>
          Sticky header: Set <code>maxHeight</code> on <code>Table</code> to enable vertical
          scrolling. Header uses Liquid Glass styling.
        </div>
        <div>
          Actions: Use <code>Button</code> with <code>variant=&quot;ghost&quot;</code> in the last
          column.
        </div>
      </div>
    </section>
  </div>
);
