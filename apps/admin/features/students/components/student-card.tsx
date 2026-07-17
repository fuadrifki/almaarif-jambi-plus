import Link from 'next/link';
import Image from 'next/image';

import { Button, Card, Surface } from '@/components/ui';
import { MapPin, Phone, Pencil, User, Trash2, School, CircleUser, Eye } from 'lucide-react';

import type { Student } from '../types';
import { Class } from '@/features/classes';

type StudentCardProps = {
  student: Student;
  classes: Class[];
  onDelete: (student: Student) => void;
};

export const StudentCard = ({ student, classes, onDelete }: StudentCardProps) => {
  const className = classes.find((c) => c.id === student.classId)?.name;

  return (
    <Surface className="p-4 relative group">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          {student.photoUrl ? (
            <Surface className="rounded-full!">
              <Card className="flex w-max h-max items-center justify-center rounded-full! text-sm font-semibold text-primary p-0">
                <Image
                  src={student.photoUrl}
                  alt={student.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </Card>
            </Surface>
          ) : (
            <Surface className="rounded-full!">
              <Card className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-secondary">
                {student.name.charAt(0).toUpperCase()}
              </Card>
            </Surface>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="truncate text-sm font-medium text-primary group-hover:text-primary transition-colors">
            {student.name}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 text-xs text-secondary">
            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
              {student.nis}
            </span>
            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
              {student.room}
            </span>
            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
              {className}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-1">
          <Link href={`/students/${student.id}`}>
            <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
              Detail
            </Button>
          </Link>
          <Link href={`/students/${student.id}/edit`}>
            <Button variant="ghost" size="sm" leftIcon={<Pencil size={14} />}>
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 size={14} />}
            onClick={() => {
              onDelete(student);
            }}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Surface>
  );
};
