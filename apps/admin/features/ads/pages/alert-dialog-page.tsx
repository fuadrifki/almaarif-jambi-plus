'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from '@/components/ui';

import { SectionPreview } from '../components/section-preview';

export const AlertDialogPage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Alert Dialog</h1>

      <p className="mt-2 text-(--text-secondary)">
        A modal confirmation dialog built on Radix primitives. Used for destructive actions —
        delete, logout, data reset — where the user must explicitly confirm or cancel.
      </p>
    </section>

    <SectionPreview
      title="Basic"
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="danger">Hapus</Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Hapus Data</AlertDialogTitle>
    <AlertDialogDescription>
      Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
    </AlertDialogDescription>

    <div className="flex justify-end gap-2">
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction>Hapus</AlertDialogAction>
    </div>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="danger">Hapus Data</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Hapus Data</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>

          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction>Hapus</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <SectionPreview
      title="With Action Feedback"
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="danger">Hapus Siswa</Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
    <AlertDialogDescription>
      Siswa "Ahmad Fauzi" akan dihapus permanen dari sistem.
    </AlertDialogDescription>

    <div className="flex justify-end gap-2">
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction onClick={() => toast.success('Data berhasil dihapus')}>
        Ya, Hapus
      </AlertDialogAction>
    </div>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="danger">Hapus Siswa</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>

          <AlertDialogDescription>
            Siswa &quot;Ahmad Fauzi&quot; akan dihapus permanen dari sistem.
          </AlertDialogDescription>

          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction onClick={() => {}}>Ya, Hapus</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-(--text-primary)">When to Use</h3>

      <ul className="mt-3 space-y-1 text-xs text-(--text-secondary)">
        <li>- Deleting records permanently</li>
        <li>- Logging out from the system</li>
        <li>- Resetting data or settings</li>
        <li>- Any irreversible destructive action</li>
      </ul>
    </section>
  </div>
);
