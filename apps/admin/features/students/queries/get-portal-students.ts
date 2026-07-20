'use server';

import { sql } from 'drizzle-orm';

import { getDb } from '@/lib/db/client';

export type PortalStudentRow = {
  id: number;
  name: string;
  nis: string;
  className: string;
  attendancePercentage: number;
};

export const getPortalStudents = async (): Promise<PortalStudentRow[]> => {
  const db = getDb();

  const { rows } = await db.execute<{
    id: number;
    name: string;
    nis: string;
    class_name: string;
    total_sessions: number;
    present_count: number;
    sick_count: number;
    permission_count: number;
  }>(sql`
    SELECT
      s.id,
      s.name,
      s.nis,
      COALESCE(c.name, '-') AS class_name,
      COALESCE(ts.total_sessions, 0)::int AS total_sessions,
      COALESCE(ar.present_count, 0)::int AS present_count,
      COALESCE(ar.sick_count, 0)::int AS sick_count,
      COALESCE(ar.permission_count, 0)::int AS permission_count
    FROM students s
    LEFT JOIN classes c ON c.id = s.class_id
    LEFT JOIN (
      SELECT class_id, COUNT(*)::int AS total_sessions
      FROM attendance_sessions
      GROUP BY class_id
    ) ts ON ts.class_id = s.class_id
    LEFT JOIN (
      SELECT
        ar_inner.student_id,
        COUNT(*) FILTER (WHERE ar_inner.status = 'PRESENT')::int AS present_count,
        COUNT(*) FILTER (WHERE ar_inner.status = 'SICK')::int AS sick_count,
        COUNT(*) FILTER (WHERE ar_inner.status = 'PERMISSION')::int AS permission_count
      FROM attendance_records ar_inner
      GROUP BY ar_inner.student_id
    ) ar ON ar.student_id = s.id
    ORDER BY s.updated_at DESC
  `);

  return rows.map((row) => {
    const totalSessions = Number(row.total_sessions);
    const attended =
      Number(row.present_count) + Number(row.sick_count) + Number(row.permission_count);

    return {
      id: Number(row.id),
      name: String(row.name),
      nis: String(row.nis),
      className: String(row.class_name),
      attendancePercentage: totalSessions > 0 ? Math.round((attended / totalSessions) * 100) : 0,
    };
  });
};
