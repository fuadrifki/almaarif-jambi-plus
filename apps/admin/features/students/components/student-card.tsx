import Link from 'next/link';
import Image from 'next/image';

import { Button, Card, Surface } from '@/components/ui';
import { MapPin, Phone, Pencil, User, Trash2, School, CircleUser } from 'lucide-react';

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
    <Surface className="p-4">
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
                  className="h-20 w-20 rounded-full object-cover"
                />
              </Card>
            </Surface>
          ) : (
            <Surface className="rounded-full!">
              <Card className="flex h-20 w-20 items-center justify-center rounded-full text-sm font-semibold text-secondary">
                {student.name.charAt(0).toUpperCase()}
              </Card>
            </Surface>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-primary">{student.name}</h3>

            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-secondary">
              {student.nis}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <School size={12} className="shrink-0" />

            <span className="truncate">{className}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <User size={12} className="shrink-0" />

            <span className="truncate">{student.guardianName}</span>

            <span className="text-white/20">&middot;</span>

            <Phone size={12} className="shrink-0" />

            <span className="shrink-0">{student.guardianPhone}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <MapPin size={12} className="shrink-0" />

            <span className="truncate">{student.address}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-1">
          <Link href={`/students/${student.id}`}>
            <Button variant="ghost" size="sm" leftIcon={<Pencil size={14} />}>
              Edit
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 size={14} />}
            onClick={() => onDelete(student)}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Surface>
  );
};
