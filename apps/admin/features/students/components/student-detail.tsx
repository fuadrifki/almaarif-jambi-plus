import { Badge, EmptyState } from '@/components/ui';

import { Class } from '@/features/classes';

import type { Student } from '../types';

type StudentDetailProps = {
  student: Student;
  classData: Class | null;
};

export const StudentDetail = ({ student, classData }: StudentDetailProps) => {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Detail Siswa</h2>
        <div className="rounded-lg border border-[--border] bg-[--surface] space-y-4 p-4">
          {student.name && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[--text-secondary]">Student Name</label>
              <div className="text-sm text-[--text-primary]">{student.name}</div>
            </div>
          )}

          {student.nis && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[--text-secondary]">NIS</label>
              <div className="text-sm text-[--text-primary]">{student.nis}</div>
            </div>
          )}

          {classData?.name && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[--text-secondary]">Class</label>
              <div className="text-sm text-[--text-primary]">{classData.name}</div>
            </div>
          )}

          {student.guardianName && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[--text-secondary]">Detail Wali</label>
              <div className="text-sm text-[--text-primary]">{student.guardianName}</div>
            </div>
          )}

          {student.guardianPhone && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[--text-secondary]">Phone</label>
              <div className="text-sm text-[--text-primary]">{student.guardianPhone}</div>
            </div>
          )}

          {student.address && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[--text-secondary]">Address</label>
              <div className="text-sm text-[--text-primary] whitespace-pre-wrap break-words">
                {student.address}
              </div>
            </div>
          )}

          {student.photoUrl && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[--text-secondary]">Photo</label>
              <div className="text-sm text-[--text-primary]">
                <img
                  src={student.photoUrl}
                  alt={student.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Attendance</h2>
        <EmptyState
          icon={<></>}
          title="Attendance module will be available in a future milestone."
          description="Track student presence, absences, and permissions across all classes."
          className="min-h-50"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Violations</h2>
        <EmptyState
          icon={<></>}
          title="Violation module will be available in a future milestone."
          description="Record and manage student behavioral incidents and disciplinary actions."
          className="min-h-50"
        />
      </section>

      <section className="pt-6 space-y-4">
        <h2 className="text-lg font-semibold">Actions</h2>
        {/* <div className="flex gap-3">
          <a
            href="/students"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[--surface] text-[--text-primary] border border-[--border] hover:bg-white/10 transition-colors"
          >
            Back to Student List
          </a>
        </div> */}
      </section>
    </div>
  );
};
