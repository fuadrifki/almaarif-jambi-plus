import { z } from 'zod';

export const studentSchema = z.object({
  nis: z.string().min(1, 'NIS wajib diisi'),
  name: z.string().min(1, 'Nama siswa wajib diisi'),
  classId: z.string().min(1, 'Kelas wajib dipilih'),
  guardianName: z.string().min(1, 'Nama wali wajib diisi'),
  guardianPhone: z.string().min(1, 'Telepon wali wajib diisi'),
  address: z.string().min(1, 'Alamat wajib diisi'),
});

export type StudentFormData = z.infer<typeof studentSchema>;
