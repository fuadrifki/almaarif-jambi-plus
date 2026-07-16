import { z } from 'zod';

export const classSchema = z.object({
  code: z.string().min(1, 'Kode kelas wajib diisi').max(50, 'Kode kelas maksimal 50 karakter'),
  level: z.number().int().min(1, 'Tingkat kelas wajib diisi'),
  academicLevel: z
    .string()
    .min(1, 'Tingkat akademis wajib diisi')
    .max(100, 'Tingkat akademis maksimal 100 karakter'),
  gender: z.enum(['male', 'female', 'mixed'], { message: 'Jenis kelamin wajib dipilih' }),
  description: z.string().max(255, 'Deskripsi kelas maksimal 255 karakter').optional(),
});

export type ClassFormData = z.infer<typeof classSchema>;
