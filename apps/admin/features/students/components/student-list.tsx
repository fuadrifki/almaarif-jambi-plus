'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  EmptyState,
  Input,
  toast,
} from '@/components/ui';
import { Search, Users } from 'lucide-react';

import { deleteStudent } from '../server';
import { StudentCard } from './student-card';

import type { Student } from '../types';

type StudentListProps = {
  students: Student[];
};

export const StudentList = ({ students }: StudentListProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.nis.includes(query),
  );

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setDeleting(true);

    try {
      await deleteStudent(deleteTarget.id);

      toast.success('Siswa berhasil dihapus');

      setDeleteTarget(null);

      router.refresh();
    } catch {
      toast.error('Gagal menghapus siswa. Silakan coba lagi.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <Input
          placeholder="Cari berdasarkan nama atau NIS..."
          leftIcon={<Search size={16} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-1/3"
        />

        <Button className="w-full sm:w-auto shrink-0" onClick={() => router.push('/students/new')}>
          Tambah Siswa
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users size={32} />}
          title={students.length === 0 ? 'Belum ada siswa' : 'Siswa tidak ditemukan'}
          description={
            students.length === 0
              ? 'Mulai menambahkan data siswa pesantren.'
              : 'Coba kata kunci pencarian yang berbeda.'
          }
          action={
            students.length === 0 ? (
              <Button onClick={() => router.push('/students/new')}>Tambah Siswa</Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={setDeleteTarget} />
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Hapus Siswa</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus <strong>{deleteTarget?.name}</strong>? Tindakan ini
            tidak dapat dibatalkan.
          </AlertDialogDescription>

          <div className="flex justify-end gap-3">
            <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Menghapus...' : 'Hapus'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
