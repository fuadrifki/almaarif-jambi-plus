import Link from 'next/link';

import { Button, Card } from '@/components/ui';
import { Pencil, Notebook, Trash2 } from 'lucide-react';

import type { Class } from '../types';

type ClassCardProps = {
  class: Class;
  onDelete: (classData: Class) => void;
};

export const ClassCard = ({ class: classData, onDelete }: ClassCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-primary">{classData.name}</h3>

            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-secondary">
              {classData.code}
            </span>
          </div>

          <div className="flex items-start gap-1.5 text-xs text-secondary">
            <Notebook size={12} className="shrink-0 mt-0.5" />

            <span className="line-clamp-3">{classData.description}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-1">
          <Link href={`/dashboard/classes/${classData.id}`}>
            <Button variant="ghost" size="sm" leftIcon={<Pencil size={14} />}>
              Edit
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 size={14} />}
            onClick={() => onDelete(classData)}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Card>
  );
};
