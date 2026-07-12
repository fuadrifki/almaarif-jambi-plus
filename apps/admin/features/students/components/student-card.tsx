import Link from 'next/link';

import { Button, Surface } from '@/components/ui';
import { CLASSES } from '@/config/lookups';
import { Pencil, Trash2 } from 'lucide-react';

import type { Student } from '../types';

type StudentCardProps = {
  student: Student;
  onDelete: (student: Student) => void;
};

export const StudentCard = ({ student, onDelete }: StudentCardProps) => {
  const className = CLASSES.find((c) => c.value === student.classId)?.label ?? student.classId;

  return (
    <Surface className="flex items-center justify-between p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <h3 className="truncate text-sm font-medium text-(--text-primary)">{student.name}</h3>

          <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-xs text-(--text-secondary)">
            {student.nis}
          </span>
        </div>

        <p className="mt-1 text-xs text-(--text-secondary)">
          {className} &middot; {student.room}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link href={`/students/${student.id}`}>
          <Button variant="ghost" size="sm" leftIcon={<Pencil size={14} />}>
            Edit
          </Button>
        </Link>

        <Button
          variant="danger"
          size="sm"
          leftIcon={<Trash2 size={14} />}
          onClick={() => onDelete(student)}
        >
          Hapus
        </Button>
      </div>
    </Surface>
  );
};
