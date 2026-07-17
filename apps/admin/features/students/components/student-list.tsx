'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
  EmptyState,
  toast,
} from '@/components/ui';
import { Users } from 'lucide-react';

import { deleteStudent } from '../server';
import { StudentCard } from './student-card';

import type { Student } from '../types';
import { Class } from '@/features/classes';

type StudentListProps = {
  students: Student[];
  classes: Class[];
};

export const StudentList = ({ students, classes }: StudentListProps) => {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setDeleting(true);

    try {
      await deleteStudent(String(deleteTarget.id));

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
    <>
      {students.length === 0 ? (
        <EmptyState
          icon={<Users size={32} />}
          title="Belum ada siswa"
          description="Mulai menambahkan data siswa pesantren."
          action={<Button onClick={() => router.push('/students/new')}>Tambah Siswa</Button>}
        />
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              classes={classes}
              onDelete={setDeleteTarget}
            />
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

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Menghapus...' : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
