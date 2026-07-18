'use client';
import { useState } from 'react';
import { Button, Input, Surface } from '@/components/ui';
import { cn } from '@/lib';
import { SectionPreview } from '../../components/section-preview';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const PopoverPage = () => {
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [klass, setKlass] = useState('');
  const [teacher, setTeacher] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('active');
  const [widthExample, setWidthExample] = useState('auto');

  const [placementExample, setPlacementExample] = useState('');

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium text-secondary">Components</p>
        <h1 className="text-4xl font-bold tracking-tight">Popover</h1>
        <p className="text-secondary max-w-2xl">
          Komponen konten mengambang yang membuka saat trigger diaktifkan. Mendukung penempatan,
          navigasi keyboard, dan perilaku klik-keluar. Dibangun berdasarkan radix-ui primitives
          untuk aksesibilitas dan fleksibilitas.
        </p>
      </header>

      <SectionPreview
        title="Basic"
        description="Popover sederhana dengan konten teks dasar. Menggambar contoh penggunaan paling dasar dari komponen."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      Filters
    </Button>
  </PopoverTrigger>

  <PopoverContent>
    <div className="p-3">
      <p className="text-sm text-secondary">
        Popover content goes here. This is useful for secondary actions or additional information.
      </p>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Filters</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-3">
              <p className="text-sm text-secondary">
                Popover content goes here. This is useful for secondary actions or additional
                information.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </SectionPreview>

      <SectionPreview
        title="Action Menu"
        description="Popover berisi tombol dan aksi. Menggambar menu konten kaya dengan beberapa tindakan yang dapat dilakukan."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">
      Actions
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-48">
    <div className="p-1">
      <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors">
        Edit
      </button>
      <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors">
        Duplicate
      </button>
      <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors text-red-400">
        Delete
      </button>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </PopoverTrigger>

          <PopoverContent className="w-48">
            <div className="p-1">
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors">
                Edit
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors">
                Duplicate
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors text-red-400">
                Delete
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </SectionPreview>

      <SectionPreview
        title="Form"
        description="Popover berisi kontrol form seperti input, select, checkbox, dan button. Demonstrates focus management dan form controls di dalam popover."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      Add User
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-72">
    <form className="space-y-3 p-1">
      <div className="space-y-1">
        <label className="text-sm font-medium">Name</label>
        <Input
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Status</label>
        <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="terms" className="w-4 h-4" />
        <label htmlFor="terms" className="text-sm">I agree to terms</label>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save
        </button>
      </div>
    </form>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Add User</Button>
          </PopoverTrigger>

          <PopoverContent className="w-72">
            <form className="space-y-3 p-1">
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms-popover" className="w-4 h-4" />
                <label htmlFor="terms-popover" className="text-sm">
                  I agree to terms
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </SectionPreview>

      <SectionPreview
        title="Advanced Filter"
        description="Filter form yang realistis untuk fitur Laporan Absensi. Merupakan contoh penggunaan dalam konteks attendance reports."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" leftIcon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12H2M12 2v20M5 12l7-7 7 7" stroke="currentColor" /></svg>}>
      Advanced Filters
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-[420px]">
    <div className="space-y-4 p-1">
      <div className="text-sm font-semibold">Advanced Filters</div>
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">Month</label>
          <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm">Class</label>
          <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
            <option>XI-A</option>
            <option>XI-B</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm">Teacher</label>
          <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
            <option>John Smith</option>
            <option>Jane Doe</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm">Subject</label>
          <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
            <option>Math</option>
            <option>Science</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm">Status</label>
          <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
        <button className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-white/10">
          Reset
        </button>
        <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
          Apply
        </button>
      </div>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Advanced Filters</Button>
          </PopoverTrigger>

          <PopoverContent className="w-[420px]">
            <div className="space-y-4 p-1">
              <div className="text-sm font-semibold">Advanced Filters</div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm">Month</label>
                  <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Class</label>
                  <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
                    <option>XI-A</option>
                    <option>XI-B</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Teacher</label>
                  <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
                    <option>John Smith</option>
                    <option>Jane Doe</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Subject</label>
                  <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
                    <option>Math</option>
                    <option>Science</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Status</label>
                  <select className="w-full rounded-lg border border-border bg-surface p-2 text-sm">
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-white/10">
                  Reset
                </button>
                <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                  Apply
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </SectionPreview>

      <SectionPreview
        title="Placement"
        description="Demonstrates semua sisi dan alinasi yang didukung: top, bottom, left, right, start, center, end."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Top Center</Button>
  </PopoverTrigger>

  <PopoverContent side="top" align="center" sideOffset={12} className="w-64">
    <div className="text-sm font-semibold text-center">Top Center</div>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Bottom Center</Button>
  </PopoverTrigger>

  <PopoverContent side="bottom" align="center" sideOffset={12} className="w-64">
    <div className="text-sm font-semibold text-center">Bottom Center</div>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Left Start</Button>
  </PopoverTrigger>

  <PopoverContent side="left" align="start" sideOffset={12} className="w-64">
    <div className="text-sm font-semibold">Left Start</div>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Right End</Button>
  </PopoverTrigger>

  <PopoverContent side="right" align="end" sideOffset={12} className="w-64">
    <div className="text-sm font-semibold text-right">Right End</div>
  </PopoverContent>
</Popover>`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Top Center</Button>
              </PopoverTrigger>

              <PopoverContent side="top" align="center" sideOffset={12} className="w-64">
                <div className="text-sm font-semibold text-center">Top Center</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Bottom Center</Button>
              </PopoverTrigger>

              <PopoverContent side="bottom" align="center" sideOffset={12} className="w-64">
                <div className="text-sm font-semibold text-center">Bottom Center</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Left Start</Button>
              </PopoverTrigger>

              <PopoverContent side="left" align="start" sideOffset={12} className="w-64">
                <div className="text-sm font-semibold">Left Start</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Right End</Button>
              </PopoverTrigger>

              <PopoverContent side="right" align="end" sideOffset={12} className="w-64">
                <div className="text-sm font-semibold text-right">Right End</div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </SectionPreview>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-sm font-semibold text-primary">Prop Types</h3>

        <div className="mt-3 space-y-2 text-xs text-secondary">
          <div>
            <code className="text-primary">children</code> — ReactNode. Konten yang akan dirender
            dalam popover.
          </div>
          <div>
            <code className="text-primary">side</code> — <code>top | right | bottom | left</code>.
            Sisi (atas, kanan, bawah, kiri) dari trigger di mana popover muncul. Default:{' '}
            <code>bottom</code>.
          </div>
          <div>
            <code className="text-primary">align</code> — <code>start | center | end</code>.
            Penyelarasan konten sepanjang sisi yang dipilih. Default: <code>center</code>.
          </div>
          <div>
            <code className="text-primary">sideOffset</code> — number. Jarak (px) dari trigger
            element. Default: <code>8</code>.
          </div>
          <div>
            <code className="text-primary">alignOffset</code> — number. Jarak untuk penyelarasan.
            Default: <code>0</code>.
          </div>
          <div>
            <code className="text-primary">className</code> — string, optional. Kelas CSS tambahan
            untuk konten popover.
          </div>
        </div>
      </section>
    </div>
  );
};
