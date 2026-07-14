import { z } from 'zod';

export const classSchema = z.object({
  code: z.string().min(1, 'Kode kelas wajib diisi').max(50, 'Kode kelas maksimal 50 karakter'),
  name: z.string().min(1, 'Nama kelas wajib diisi').max(255, 'Nama kelas maksimal 255 karakter'),
  description: z
    .string()
    .min(1, 'Deskripsi kelas wajib diisi')
    .max(255, 'Deskripsi kelas maksimal 255 karakter'),
});

export type ClassFormData = z.infer<typeof classSchema>;
