'use client';

import { Button, toast } from '@/components/ui';

import { SectionPreview } from '../components/section-preview';

export const ToastPage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Toast</h1>

      <p className="mt-2 text-secondary">
        A lightweight notification component built on Sonner. Used for transient feedback — success
        messages, error alerts, loading states, and confirmations.
      </p>
    </section>

    <SectionPreview
      title="Variants"
      code={`toast.success('Berhasil disimpan');
toast.error('Gagal menghapus data');
toast.warning('Hati-hati, data akan dihapus');
toast.info('Proses sinkronisasi sedang berjalan');
toast.message('Data telah diperbarui');`}
    >
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => toast.success('Berhasil disimpan')}>
          Success
        </Button>

        <Button variant="secondary" onClick={() => toast.error('Gagal menghapus data')}>
          Error
        </Button>

        <Button variant="secondary" onClick={() => toast.warning('Hati-hati, data akan dihapus')}>
          Warning
        </Button>

        <Button
          variant="secondary"
          onClick={() => toast.info('Proses sinkronisasi sedang berjalan')}
        >
          Info
        </Button>

        <Button variant="secondary" onClick={() => toast.message('Data telah diperbarui')}>
          Message
        </Button>
      </div>
    </SectionPreview>

    <SectionPreview
      title="With Description"
      code={`toast.success('Data tersimpan', { description: 'Semua perubahan telah tersimpan ke server.' });
toast.error('Upload gagal', { description: 'Ukuran file melebihi batas maksimum.' });`}
    >
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            toast.success('Data tersimpan', {
              description: 'Semua perubahan telah tersimpan ke server.',
            })
          }
        >
          Success + Description
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            toast.error('Upload gagal', {
              description: 'Ukuran file melebihi batas maksimum.',
            })
          }
        >
          Error + Description
        </Button>
      </div>
    </SectionPreview>

    <SectionPreview
      title="Loading"
      code={`const toastId = toast.loading('Memproses data...');
// Later dismiss or update
toast.dismiss(toastId);`}
    >
      <Button
        variant="secondary"
        onClick={() => {
          const id = toast.loading('Memproses data...');

          setTimeout(() => toast.dismiss(id), 2000);
        }}
      >
        Show Loading Toast
      </Button>
    </SectionPreview>

    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-primary">Usage</h3>

      <pre className="mt-3 overflow-x-auto rounded-xl bg-black/20 p-4 text-xs text-secondary">
        {`import { toast } from '@/components/ui';

// Simple message
toast.success('Berhasil disimpan');

// With description
toast.error('Gagal', { description: 'Detail error...' });

// Loading + dismiss
const id = toast.loading('Loading...');
toast.dismiss(id);`}
      </pre>
    </section>
  </div>
);
