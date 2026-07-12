'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, Input } from '@/components/ui';
import { Search } from 'lucide-react';

import { deleteStudent } from '../server';
import { StudentCard } from './student-card';

import type { Student } from '../types';

type StudentListProps = {
  students: Student[];
};

export const StudentList = ({ students }: StudentListProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.nis.includes(query),
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus siswa ini?')) {
      return;
    }

    await deleteStudent(id);

    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <Input
          placeholder="Cari berdasarkan nama atau NIS..."
          leftIcon={<Search size={16} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-1/3"
        />

        <Button className="shrink-0" onClick={() => router.push('/students/new')}>
          Tambah Siswa
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-(--text-secondary)">
          {students.length === 0 ? 'Belum ada siswa.' : 'Siswa tidak ditemukan.'}
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
