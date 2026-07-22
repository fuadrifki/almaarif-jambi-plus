import { teacherAttendanceRepository } from '../../repositories/teacher-attendance.repository';
import { classRepository } from '@/features/classes/repositories/class.repository';
import { SUBJECTS } from '@/lib/db/seed-subjects';
import { resolveAttendanceStatus } from '@/features/attendance/types';

import type {
  TeacherAttendanceFilter,
  VirtualRow,
} from '../../repositories/teacher-attendance.repository.types';
import type { AttendanceStatus, TeacherRole } from '@/features/attendance/types';

export type TeacherAttendanceSessionRow = {
  id: string;
  sessionId: number;
  teacher: { id: number; name: string };
  date: string;
  time: string;
  className: string;
  subjectName: string;
  attendanceStatus: AttendanceStatus;
  teachingRole: TeacherRole;
  scheduledTeacherStatus: string;
  notes: string | null;
  substituteTeacherName: string | null;
  createdAt: Date;
};

const filterVirtualRows = (rows: VirtualRow[], filter: TeacherAttendanceFilter): VirtualRow[] => {
  let filtered = rows;

  if (filter.teachingRole) {
    filtered = filtered.filter((r) => r.role === filter.teachingRole);
  }

  if (filter.attendanceStatus) {
    filtered = filtered.filter((r) => {
      const status = resolveAttendanceStatus(r.role, r.scheduledTeacherStatus);
      return status === filter.attendanceStatus;
    });
  }

  if (filter.search) {
    const q = filter.search.toLowerCase();
    filtered = filtered.filter((r) => r.teacherName.toLowerCase().includes(q));
  }

  return filtered;
};

const mapToSessionRow = (row: VirtualRow): TeacherAttendanceSessionRow => ({
  id: `${row.sessionId}-${row.teacherId}-${row.role}`,
  sessionId: row.sessionId,
  teacher: { id: row.teacherId, name: row.teacherName },
  date: row.date,
  time: row.time,
  className: row.className,
  subjectName: row.subjectName,
  attendanceStatus: resolveAttendanceStatus(row.role, row.scheduledTeacherStatus),
  teachingRole: row.role,
  scheduledTeacherStatus: row.scheduledTeacherStatus,
  notes: row.substituteNotes,
  substituteTeacherName: row.substituteTeacherName,
  createdAt: row.createdAt,
});

export const getTeacherAttendanceSessionList = async (filter: TeacherAttendanceFilter) => {
  const [virtualRows, classes] = await Promise.all([
    teacherAttendanceRepository.findVirtualRows(filter),
    classRepository.findAll(),
  ]);

  const filtered = filterVirtualRows(virtualRows, filter);
  const rows = filtered.map(mapToSessionRow);
  const subjects = SUBJECTS;

  return { rows, classes, subjects };
};
