import { z } from 'zod';

import { ATTENDANCE_STATUS } from './types';

const attendanceStatusValues = Object.values(ATTENDANCE_STATUS) as [string, ...string[]];

export const attendanceStatusSchema = z.enum(attendanceStatusValues);

export const attendanceSessionSchema = z.object({
  teacherId: z.coerce.number().int().positive('Guru wajib dipilih'),
  classId: z.coerce.number().int().positive('Kelas wajib dipilih'),
  subjectId: z.coerce.number().int().positive('Mata pelajaran wajib dipilih'),
  scheduleId: z.coerce.number().int().positive('Jadwal wajib dipilih'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal tidak valid'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Format waktu tidak valid'),
});

export const attendanceRecordSchema = z.object({
  sessionId: z.string().min(1, 'Sesi absensi wajib dipilih'),
  studentId: z.string().min(1, 'Siswa wajib dipilih'),
  status: attendanceStatusSchema,
  notes: z.string().optional().default(''),
});

export const attendanceSubmissionSchema = z.object({
  sessionId: z.string().min(1, 'Sesi absensi wajib dipilih'),
  records: z
    .array(
      z.object({
        studentId: z.string().min(1, 'Siswa wajib dipilih'),
        status: attendanceStatusSchema,
        notes: z.string().optional().default(''),
      }),
    )
    .min(1, 'Minimal satu catatan absensi'),
});

export type AttendanceSessionFormData = z.infer<typeof attendanceSessionSchema>;
export type AttendanceRecordFormData = z.infer<typeof attendanceRecordSchema>;
export type AttendanceSubmissionFormData = z.infer<typeof attendanceSubmissionSchema>;
