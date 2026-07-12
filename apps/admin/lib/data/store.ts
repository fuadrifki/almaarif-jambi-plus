import type { Student } from '@/features/students/types';
import type { Attendance } from '@/features/attendance/types';

type Store = {
  students: Student[];
  attendances: Attendance[];
  nextStudentId: number;
  nextAttendanceId: number;
};

const store: Store = {
  students: [
    {
      id: '1',
      nis: '2024001',
      name: 'Abdullah',
      classId: 'class-1',
      room: 'Ruang 1',
      guardianName: 'Budi',
      guardianPhone: '081234567890',
      address: 'Jl. Merdeka No. 1',
    },
    {
      id: '2',
      nis: '2024002',
      name: 'Fatimah',
      classId: 'class-1',
      room: 'Ruang 1',
      guardianName: 'Siti',
      guardianPhone: '081234567891',
      address: 'Jl. Merdeka No. 2',
    },
    {
      id: '3',
      nis: '2024003',
      name: 'Ibrahim',
      classId: 'class-2',
      room: 'Ruang 2',
      guardianName: 'Ahmad',
      guardianPhone: '081234567892',
      address: 'Jl. Sudirman No. 5',
    },
    {
      id: '4',
      nis: '2024004',
      name: 'Khadijah',
      classId: 'class-2',
      room: 'Ruang 2',
      guardianName: 'Halimah',
      guardianPhone: '081234567893',
      address: 'Jl. Sudirman No. 8',
    },
    {
      id: '5',
      nis: '2024005',
      name: 'Yusuf',
      classId: 'class-3',
      room: 'Ruang 3',
      guardianName: 'Hasan',
      guardianPhone: '081234567894',
      address: 'Jl. Thamrin No. 12',
    },
  ],
  attendances: [],
  nextStudentId: 6,
  nextAttendanceId: 1,
};

export const getStore = (): Store => store;

export const generateStudentId = (): string => {
  const id = String(store.nextStudentId);

  store.nextStudentId++;

  return id;
};

export const generateAttendanceId = (): string => {
  const id = String(store.nextAttendanceId);

  store.nextAttendanceId++;

  return id;
};
