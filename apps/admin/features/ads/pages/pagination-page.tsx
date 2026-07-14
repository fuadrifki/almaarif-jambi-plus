'use client';

import { useState } from 'react';

import { Pagination } from '@/components/ui';

import { SectionPreview } from '../components/section-preview';

export const PaginationPage = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(10);
  const [page3, setPage3] = useState(1);
  const [page4, setPage4] = useState(5);
  const [page5, setPage5] = useState(20);
  const [page6, setPage6] = useState(1);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-secondary">Components</p>

        <h1 className="text-4xl font-bold tracking-tight">Pagination</h1>

        <p className="text-secondary">
          Pagination digunakan untuk navigasi antar halaman data. Mendukung Previous, Next, nomor
          halaman, ellipsis, dan status disabled.
        </p>
      </header>

      <SectionPreview
        title="Few Pages"
        description="Tampilan sederhana untuk jumlah halaman sedikit (5 atau kurbih). Tidak ada ellipsis."
        code={`<Pagination
  page={1}
  pageSize={10}
  totalItems={35}
  onPageChange={setPage}
/>`}
      >
        <Pagination page={page1} pageSize={10} totalItems={35} onPageChange={setPage1} />
      </SectionPreview>

      <SectionPreview
        title="Many Pages"
        description="Untuk jumlah halaman banyak, ellipsis ditampilkan untuk indikasi halaman tersembunyi."
        code={`<Pagination
  page={10}
  pageSize={10}
  totalItems={200}
  onPageChange={setPage}
/>`}
      >
        <Pagination page={page2} pageSize={10} totalItems={200} onPageChange={setPage2} />
      </SectionPreview>

      <SectionPreview
        title="First Page"
        description="Tombol Previous disabled saat berada di halaman pertama."
        code={`<Pagination
  page={1}
  pageSize={10}
  totalItems={100}
  onPageChange={setPage}
/>`}
      >
        <Pagination page={page3} pageSize={10} totalItems={100} onPageChange={setPage3} />
      </SectionPreview>

      <SectionPreview
        title="Middle Page"
        description="Halaman tengah menampilkan nomor halaman di sekitar halaman aktif."
        code={`<Pagination
  page={5}
  pageSize={10}
  totalItems={100}
  onPageChange={setPage}
/>`}
      >
        <Pagination page={page4} pageSize={10} totalItems={100} onPageChange={setPage4} />
      </SectionPreview>

      <SectionPreview
        title="Last Page"
        description="Tombol Next disabled saat berada di halaman terakhir."
        code={`<Pagination
  page={20}
  pageSize={10}
  totalItems={200}
  onPageChange={setPage}
/>`}
      >
        <Pagination page={page5} pageSize={10} totalItems={200} onPageChange={setPage5} />
      </SectionPreview>

      <SectionPreview
        title="Mobile"
        description="Tampilan compact di mobile — label Prev/Next disembunyikan, hanya ikon yang tampil."
        code={`<div className="max-w-xs">
  <Pagination
    page={3}
    pageSize={10}
    totalItems={100}
    onPageChange={setPage}
  />
</div>`}
      >
        <div className="max-w-xs">
          <Pagination page={page6} pageSize={10} totalItems={100} onPageChange={setPage6} />
        </div>
      </SectionPreview>

      <SectionPreview
        title="Disabled"
        description="Saat totalItems 0 atau hanya 1 halaman, pagination tidak ditampilkan."
        code={`<Pagination
  page={1}
  pageSize={10}
  totalItems={5}
  onPageChange={setPage}
/>`}
      >
        <Pagination page={1} pageSize={10} totalItems={5} onPageChange={() => {}} />

        <p className="mt-2 text-sm text-secondary">
          Tidak ada pagination — totalItems hanya menghasilkan 1 halaman.
        </p>
      </SectionPreview>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-sm font-semibold text-primary">Props</h3>

        <div className="mt-3 space-y-2 text-xs text-secondary">
          <div>
            <code className="text-primary">page</code> — Halaman aktif (1-indexed).
          </div>
          <div>
            <code className="text-primary">pageSize</code> — Jumlah item per halaman.
          </div>
          <div>
            <code className="text-primary">totalItems</code> — Total jumlah item.
          </div>
          <div>
            <code className="text-primary">onPageChange</code> — Callback saat halaman berubah.
          </div>
        </div>

        <div className="mt-4 space-y-2 text-xs text-secondary">
          <h4 className="font-semibold text-primary">Behavior</h4>
          <div>Previous disabled di halaman pertama.</div>
          <div>Next disabled di halaman terakhir.</div>
          <div>Ellipsis ditampilkan untuk jumlah halaman besar.</div>
          <div>Halaman aktif menggunakan ADS active styling.</div>
          <div>Keyboard navigation: Enter dan Space untuk aktivasi.</div>
          <div>Mobile: label Prev/Next disembunyikan, hanya ikon tampil.</div>
        </div>
      </section>
    </div>
  );
};
