import { Schedule } from '@/features/attendance';

export const SCHEDULES: Schedule[] = [
  // ===== 1 Madin Putra =====
  { id: 1, classId: 1, day: 'Senin', time: '00:00-23:59', subjectId: 1, teacherId: null }, // Iqro
  { id: 2, classId: 1, day: 'Selasa', time: '00:00-23:59', subjectId: 2, teacherId: null }, // Fasholatan
  { id: 3, classId: 1, day: 'Rabu', time: '00:00-23:59', subjectId: 3, teacherId: null }, // Imla'
  { id: 4, classId: 1, day: 'Kamis', time: '00:00-23:59', subjectId: 4, teacherId: null }, // Alala
  { id: 95, classId: 1, day: 'Jumat', time: '00:00-23:59', subjectId: 5, teacherId: null }, // Dzikir
  { id: 5, classId: 1, day: 'Sabtu', time: '00:00-23:59', subjectId: 5, teacherId: null }, // Dzikir
  { id: 225, classId: 1, day: 'Minggu', time: '00:00-23:59', subjectId: 5, teacherId: null }, // Dzikir

  // // ===== 1 Madin Putri =====
  // { id: 6, classId: 2, day: 'Senin', time: '00:00-23:59', subjectId: 1, teacherId: null },
  // { id: 7, classId: 2, day: 'Selasa', time: '00:00-23:59', subjectId: 2, teacherId: null },
  // { id: 8, classId: 2, day: 'Rabu', time: '00:00-23:59', subjectId: 3, teacherId: null },
  // { id: 9, classId: 2, day: 'Kamis', time: '00:00-23:59', subjectId: 4, teacherId: null },
  // { i9d: 10, classId: 2, Jumaty: 'Sabtu', time: '00:00-23:59', subjectId: 5, teacherId: null },
  // { id: 10, classId: 2, day: 'Sabtu', time: '00:00-23:59', subjectId: 5, teacherId: null },
  // { id: 10, classId: 2, day: Minggu', time: '00:00-23:59', subjectId: 5, teacherId: null },

  // ===== 2 Madin Putra =====
  { id: 11, classId: 3, day: 'Senin', time: '00:00-23:59', subjectId: 6, teacherId: 7 }, // G
  { id: 12, classId: 3, day: 'Selasa', time: '00:00-23:59', subjectId: 7, teacherId: 11 }, // K
  { id: 13, classId: 3, day: 'Rabu', time: '00:00-23:59', subjectId: 8, teacherId: 11 }, // K
  { id: 14, classId: 3, day: 'Kamis', time: '00:00-23:59', subjectId: 10, teacherId: 6 }, // F
  { id: 915, classId: 3, day: 'Jumat', time: '00:00-23:59', subjectId: 9, teacherId: 11 }, // K
  { id: 15, classId: 3, day: 'Sabtu', time: '00:00-23:59', subjectId: 9, teacherId: 11 }, // K
  { id: 2215, classId: 3, day: 'Minggu', time: '00:00-23:59', subjectId: 9, teacherId: 11 }, // K

  // ===== 2 Madin Putri =====
  { id: 16, classId: 4, day: 'Senin', time: '00:00-23:59', subjectId: 7, teacherId: 18 }, // R
  { id: 17, classId: 4, day: 'Selasa', time: '00:00-23:59', subjectId: 8, teacherId: 17 }, // Q
  { id: 18, classId: 4, day: 'Rabu', time: '00:00-23:59', subjectId: 9, teacherId: 17 }, // Q
  { id: 19, classId: 4, day: 'Kamis', time: '00:00-23:59', subjectId: 11, teacherId: 19 }, // S
  { id: 920, classId: 4, day: 'Jumat', time: '00:00-23:59', subjectId: 6, teacherId: 7 }, // G
  { id: 20, classId: 4, day: 'Sabtu', time: '00:00-23:59', subjectId: 6, teacherId: 7 }, // G
  { id: 20, classId: 4, day: 'Minggu', time: '00:00-23:59', subjectId: 6, teacherId: 7 }, // G

  // ===== 3 Madin Putra =====
  { id: 21, classId: 5, day: 'Senin', time: '00:00-23:59', subjectId: 12, teacherId: 6 }, // F
  { id: 22, classId: 5, day: 'Selasa', time: '00:00-23:59', subjectId: 13, teacherId: 11 }, // K
  { id: 23, classId: 5, day: 'Rabu', time: '00:00-23:59', subjectId: 14, teacherId: 6 }, // F
  { id: 24, classId: 5, day: 'Kamis', time: '00:00-23:59', subjectId: 15, teacherId: 4 }, // D
  { id: 925, classId: 5, day: 'Jumat', time: '00:00-23:59', subjectId: 16, teacherId: 3 }, // C
  { id: 25, classId: 5, day: 'Sabtu', time: '00:00-23:59', subjectId: 16, teacherId: 3 }, // C
  { id: 2225, classId: 5, day: 'Minggu', time: '00:00-23:59', subjectId: 16, teacherId: 3 }, // C

  // ===== 3 Madin Putri =====
  { id: 26, classId: 6, day: 'Senin', time: '00:00-23:59', subjectId: 15, teacherId: 15 }, // O
  { id: 27, classId: 6, day: 'Selasa', time: '00:00-23:59', subjectId: 14, teacherId: 13 }, // M
  { id: 28, classId: 6, day: 'Rabu', time: '00:00-23:59', subjectId: 16, teacherId: 20 }, // T
  { id: 29, classId: 6, day: 'Kamis', time: '00:00-23:59', subjectId: 13, teacherId: 20 }, // T
  { id: 930, classId: 6, day: 'Jumat', time: '00:00-23:59', subjectId: 12, teacherId: 20 }, // T
  { id: 30, classId: 6, day: 'Sabtu', time: '00:00-23:59', subjectId: 12, teacherId: 20 }, // T
  { id: 30, classId: 6, day: 'Minggu', time: '00:00-23:59', subjectId: 12, teacherId: 20 }, // T

  // ===== 4 Madin Putra =====
  { id: 31, classId: 7, day: 'Senin', time: '00:00-23:59', subjectId: 17, teacherId: 5 }, // E
  { id: 32, classId: 7, day: 'Selasa', time: '00:00-23:59', subjectId: 18, teacherId: 5 }, // E
  { id: 33, classId: 7, day: 'Rabu', time: '00:00-23:59', subjectId: 19, teacherId: 5 }, // E
  { id: 34, classId: 7, day: 'Kamis', time: '00:00-23:59', subjectId: 20, teacherId: 2 }, // B
  { id: 935, classId: 7, day: 'Jumat', time: '00:00-23:59', subjectId: 21, teacherId: 6 }, // F
  { id: 35, classId: 7, day: 'Sabtu', time: '00:00-23:59', subjectId: 21, teacherId: 6 }, // F
  { id: 2235, classId: 7, day: 'Minggu', time: '00:00-23:59', subjectId: 21, teacherId: 6 }, // F

  // ===== 4 Madin Putri =====
  { id: 36, classId: 8, day: 'Senin', time: '00:00-23:59', subjectId: 17, teacherId: 14 }, // N
  { id: 37, classId: 8, day: 'Selasa', time: '00:00-23:59', subjectId: 30, teacherId: 15 }, // O
  { id: 38, classId: 8, day: 'Rabu', time: '00:00-23:59', subjectId: 18, teacherId: 14 }, // N
  { id: 39, classId: 8, day: 'Kamis', time: '00:00-23:59', subjectId: 19, teacherId: 5 }, // E
  { id: 940, classId: 8, day: 'Jumat', time: '00:00-23:59', subjectId: 20, teacherId: 14 }, // N
  { id: 40, classId: 8, day: 'Sabtu', time: '00:00-23:59', subjectId: 20, teacherId: 14 }, // N
  { id: 2240, classId: 8, day: 'Minggu', time: '00:00-23:59', subjectId: 20, teacherId: 14 }, // N

  // ===== 5 Madin =====
  { id: 41, classId: 9, day: 'Senin', time: '00:00-23:59', subjectId: 22, teacherId: 2 }, // B
  { id: 42, classId: 9, day: 'Selasa', time: '00:00-23:59', subjectId: 23, teacherId: 7 }, // G
  { id: 43, classId: 9, day: 'Rabu', time: '00:00-23:59', subjectId: 24, teacherId: 7 }, // G
  { id: 44, classId: 9, day: 'Kamis', time: '00:00-23:59', subjectId: 25, teacherId: 1 }, // A
  { id: 945, classId: 9, day: 'Jumat', time: '00:00-23:59', subjectId: 26, teacherId: 5 }, // E
  { id: 45, classId: 9, day: 'Sabtu', time: '00:00-23:59', subjectId: 26, teacherId: 5 }, // E
  { id: 2245, classId: 9, day: 'Minggu', time: '00:00-23:59', subjectId: 26, teacherId: 5 }, // E

  // ===== 6 Madin =====
  { id: 46, classId: 10, day: 'Senin', time: '00:00-23:59', subjectId: 24, teacherId: 4 }, // D
  { id: 47, classId: 10, day: 'Selasa', time: '00:00-23:59', subjectId: 23, teacherId: 4 }, // D
  { id: 48, classId: 10, day: 'Rabu', time: '00:00-23:59', subjectId: 27, teacherId: 4 }, // D
  { id: 49, classId: 10, day: 'Kamis', time: '00:00-23:59', subjectId: 28, teacherId: 1 }, // A
  { id: 950, classId: 10, day: 'Jumat', time: '00:00-23:59', subjectId: 29, teacherId: 4 }, // D
  { id: 50, classId: 10, day: 'Sabtu', time: '00:00-23:59', subjectId: 29, teacherId: 4 }, // D
  { id: 2250, classId: 10, day: 'Minggu', time: '00:00-23:59', subjectId: 29, teacherId: 4 }, // D
];
