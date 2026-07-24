'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from '@/components/ui';
import { LogOut, Archive, Trash2, Info } from 'lucide-react';

import { SectionPreview } from '../../components/section-preview';

export const AlertDialogPage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Alert Dialog</h1>

      <p className="mt-2 text-secondary">
        A modal confirmation dialog built on Radix primitives. Used for actions that require
        explicit user confirmation — delete, logout, archive, and other irreversible operations.
      </p>
    </section>

    <SectionPreview
      title="Default Confirmation"
      description="Gunakan untuk aksi yang tidak destruktif tetapi tidak dapat dibatalkan, seperti mengirim data atau mengekspor laporan."
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Kirim Laporan</Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Kirim Laporan</AlertDialogTitle>
    <AlertDialogDescription>
      Laporan akan dikirim ke wali kelas dan tidak dapat ditarik setelah dikirim.
      Pastikan semua data sudah benar.
    </AlertDialogDescription>

    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction>Ya, Kirim</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Kirim Laporan</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Kirim Laporan</AlertDialogTitle>

          <AlertDialogDescription>
            Laporan akan dikirim ke wali kelas dan tidak dapat ditarik setelah dikirim. Pastikan
            semua data sudah benar.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction>Ya, Kirim</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <SectionPreview
      title="Destructive Delete"
      description="Gunakan untuk menghapus data secara permanen. Selalu sertakan nama item yang akan dihapus agar pengguna yakin."
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="danger" leftIcon={<Trash2 size={16} />}>
      Hapus Santri
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Hapus Santri</AlertDialogTitle>
    <AlertDialogDescription>
      Santri "Ahmad Fauzi" akan dihapus permanen dari sistem.
      Data yang sudah dihapus tidak dapat dikembalikan.
    </AlertDialogDescription>

    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction onClick={() => toast.success('Berhasil dihapus')}>
        Ya, Hapus
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="danger" leftIcon={<Trash2 size={16} />}>
            Hapus Santri
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Hapus Santri</AlertDialogTitle>

          <AlertDialogDescription>
            Santri &quot;Ahmad Fauzi&quot; akan dihapus permanen dari sistem. Data yang sudah
            dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction onClick={() => {}}>Ya, Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <SectionPreview
      title="Logout Confirmation"
      description="Gunakan saat pengguna ingin keluar dari sesi aktif. Konfirmasi diperlukan karena logout memerlukan login ulang."
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost" leftIcon={<LogOut size={16} />}>
      Keluar
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Keluar dari Akun</AlertDialogTitle>
    <AlertDialogDescription>
      Anda akan keluar dari sesi aktif. Anda perlu login kembali
      untuk mengakses dashboard.
    </AlertDialogDescription>

    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction>Ya, Keluar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" leftIcon={<LogOut size={16} />}>
            Keluar
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Keluar dari Akun</AlertDialogTitle>

          <AlertDialogDescription>
            Anda akan keluar dari sesi aktif. Anda perlu login kembali untuk mengakses dashboard.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction>Ya, Keluar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <SectionPreview
      title="Archive Confirmation"
      description="Gunakan untuk menyembunyikan data dari tampilan utama tanpa menghapusnya secara permanen. Data masih dapat dipulihkan."
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="secondary" leftIcon={<Archive size={16} />}>
      Arsipkan
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Arsipkan Kelas</AlertDialogTitle>
    <AlertDialogDescription>
      Kelas "VII-A" akan dipindahkan ke arsip. Kelas yang diarsipkan
      tidak akan muncul di daftar aktif, tetapi data tetap tersimpan
      dan dapat dipulihkan kapan saja.
    </AlertDialogDescription>

    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction>Ya, Arsipkan</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" leftIcon={<Archive size={16} />}>
            Arsipkan
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Arsipkan Kelas</AlertDialogTitle>

          <AlertDialogDescription>
            Kelas &quot;VII-A&quot; akan dipindahkan ke arsip. Kelas yang diarsipkan tidak akan
            muncul di daftar aktif, tetapi data tetap tersimpan dan dapat dipulihkan kapan saja.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction>Ya, Arsipkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <SectionPreview
      title="Long Content"
      description="Gunakan saat pengguna perlu memahami konsekuensi lengkap sebelum mengonfirmasi. Sertakan poin-poin penting secara jelas."
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="danger">
      Reset Database
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Reset Database Absensi</AlertDialogTitle>
    <AlertDialogDescription>
      Tindakan ini akan menghapus seluruh data absensi semester
      ini, termasuk:{"\\n"}• Rekam kehadiran semua santri{"\\n"}•
      Catatan izin dan sakit{"\\n"}• Laporan bulanan yang sudah
      dibuat{"\\n"}• Riwayat keterlambatan{"\\n"}{"\\n"}Data yang
      dihapus tidak dapat dikembalikan. Pertimbangkan untuk
      mengekspor data terlebih dahulu sebelum mereset.
    </AlertDialogDescription>

    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction>Ya, Reset</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="danger">Reset Database</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Reset Database Absensi</AlertDialogTitle>

          <AlertDialogDescription>
            Tindakan ini akan menghapus seluruh data absensi semester ini, termasuk:
          </AlertDialogDescription>

          <ul className="mt-2 space-y-1 text-sm text-primary">
            <li>• Rekam kehadiran semua santri</li>
            <li>• Catatan izin dan sakit</li>
            <li>• Laporan bulanan yang sudah dibuat</li>
            <li>• Riwayat keterlambatan</li>
          </ul>

          <p className="mt-3 text-sm text-primary">
            Data yang dihapus tidak dapat dikembalikan. Pertimbangkan untuk mengekspor data terlebih
            dahulu sebelum mereset.
          </p>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction>Ya, Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <SectionPreview
      title="Single Action"
      description="Gunakan untuk dialog informasi atau acknowledge yang tidak memerlukan opsi batal. Pengguna cukup menekan satu tombol untuk menutup."
      code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="secondary" leftIcon={<Info size={16} />}>
      Pelajari Lebih Lanjut
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogTitle>Tentang Fitur Absensi</AlertDialogTitle>
    <AlertDialogDescription>
      Fitur absensi memungkinkan ustad mencatat kehadiran santri
      secara digital. Setiap santri dapat ditandai hadir, izin,
      sakit, atau tanpa keterangan. Data absensi terintegrasi
      dengan laporan wali kelas dan notifikasi otomatis kepada
      orang tua.
    </AlertDialogDescription>

    <AlertDialogFooter>
      <AlertDialogAction>Mengerti</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" leftIcon={<Info size={16} />}>
            Pelajari Lebih Lanjut
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Tentang Fitur Absensi</AlertDialogTitle>

          <AlertDialogDescription>
            Fitur absensi memungkinkan ustad mencatat kehadiran santri secara digital. Setiap santri
            dapat ditandai hadir, izin, sakit, atau tanpa keterangan. Data absensi terintegrasi
            dengan laporan wali kelas dan notifikasi otomatis kepada orang tua.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogAction>Mengerti</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SectionPreview>

    <SectionPreview
      title="Trigger Types"
      description="AlertDialogTrigger dapat menggunakan berbagai jenis elemen sebagai trigger. Gunakan asChild dan sesuaikan dengan konteks."
      code={`{/* Secondary button trigger */}
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="secondary">
      Delete Draft
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>...</AlertDialogContent>
</AlertDialog>

{/* Ghost button trigger */}
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost" leftIcon={<Trash2 size={16} />}>
      Hapus
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>...</AlertDialogContent>
</AlertDialog>

{/* Text link trigger */}
<AlertDialog>
  <AlertDialogTrigger asChild>
    <button type="button" className="text-sm text-secondary underline">
      Reset ke default
    </button>
  </AlertDialogTrigger>
  <AlertDialogContent>...</AlertDialogContent>
</AlertDialog>`}
    >
      <div className="flex flex-wrap gap-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Delete Draft</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogTitle>Hapus Draft</AlertDialogTitle>

            <AlertDialogDescription>
              Draft &quot;Laporan Bulanan&quot; akan dihapus. Anda dapat membuat draft baru kapan
              saja.
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>

              <AlertDialogAction>Ya, Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" leftIcon={<Trash2 size={16} />}>
              Hapus
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>

            <AlertDialogDescription>
              Data yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>

              <AlertDialogAction>Ya, Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button" className="text-sm text-secondary underline">
              Reset ke default
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogTitle>Reset Pengaturan</AlertDialogTitle>

            <AlertDialogDescription>
              Semua pengaturan akan dikembalikan ke nilai awal. Pengaturan kustom yang sudah
              disimpan akan hilang.
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>

              <AlertDialogAction>Ya, Reset</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SectionPreview>

    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-primary">When to Use</h3>

      <ul className="mt-3 space-y-1 text-xs text-secondary">
        <li>- Menghapus data atau record secara permanen</li>
        <li>- Keluar dari sesi aktif (logout)</li>
        <li>- Mengarsipkan data dari tampilan aktif</li>
        <li>- Mereset pengaturan atau database</li>
        <li>- Mengirim data yang tidak dapat ditarik kembali</li>
        <li>- Setiap aksi yang memerlukan konfirmasi eksplisit pengguna</li>
      </ul>
    </section>
  </div>
);
