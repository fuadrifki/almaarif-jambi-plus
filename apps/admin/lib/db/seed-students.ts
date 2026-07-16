import 'dotenv/config';

import { getDb } from './client';
import { students } from './schema';

export const seedData = [
  // 1 MADIN PA
  {
    id: 1,
    nis: '2024001',
    name: 'Ahmad Fauzan',
    classId: '1',
    guardianName: 'Budi Santoso',
    guardianPhone: '081234560001',
    address: 'Jl. Kenanga No. 1, Jambi',
  },
  {
    id: 2,
    nis: '2024002',
    name: 'Muhammad Rizki',
    classId: '1',
    guardianName: 'Andi Saputra',
    guardianPhone: '081234560002',
    address: 'Jl. Melati No. 2, Jambi',
  },
  {
    id: 3,
    nis: '2024003',
    name: 'Fajar Ramadhan',
    classId: '1',
    guardianName: 'Joko',
    guardianPhone: '081234560003',
    address: 'Jl. Mawar No. 3, Jambi',
  },
  {
    id: 4,
    nis: '2024004',
    name: 'Rizwan Hakim',
    classId: '1',
    guardianName: 'Sutrisno',
    guardianPhone: '081234560004',
    address: 'Jl. Anggrek No. 4, Jambi',
  },
  {
    id: 5,
    nis: '2024005',
    name: 'Abdurrahman',
    classId: '1',
    guardianName: 'Yanto',
    guardianPhone: '081234560005',
    address: 'Jl. Dahlia No. 5, Jambi',
  },
  {
    id: 6,
    nis: '2024006',
    name: 'Ilham Maulana',
    classId: '1',
    guardianName: 'Herman',
    guardianPhone: '081234560006',
    address: 'Jl. Flamboyan No. 6, Jambi',
  },
  {
    id: 7,
    nis: '2024007',
    name: 'Bagas Pratama',
    classId: '1',
    guardianName: 'Rudi',
    guardianPhone: '081234560007',
    address: 'Jl. Durian No. 7, Jambi',
  },
  {
    id: 8,
    nis: '2024008',
    name: 'Naufal Akbar',
    classId: '1',
    guardianName: 'Wawan',
    guardianPhone: '081234560008',
    address: 'Jl. Cempaka No. 8, Jambi',
  },
  {
    id: 9,
    nis: '2024009',
    name: 'Zidan Alfarizi',
    classId: '1',
    guardianName: 'Ridwan',
    guardianPhone: '081234560009',
    address: 'Jl. Mangga No. 9, Jambi',
  },
  {
    id: 10,
    nis: '2024010',
    name: 'Haikal Fadillah',
    classId: '1',
    guardianName: 'Rahmat',
    guardianPhone: '081234560010',
    address: 'Jl. Rambutan No. 10, Jambi',
  },

  // 1 MADIN PI
  {
    id: 11,
    nis: '2024011',
    name: 'Aisyah Zahra',
    classId: '2',
    guardianName: 'Sulaiman',
    guardianPhone: '081234560011',
    address: 'Jl. Kenanga No. 11, Jambi',
  },
  {
    id: 12,
    nis: '2024012',
    name: 'Nurul Aini',
    classId: '2',
    guardianName: 'Hasan',
    guardianPhone: '081234560012',
    address: 'Jl. Kenanga No. 12, Jambi',
  },
  {
    id: 13,
    nis: '2024013',
    name: 'Siti Khadijah',
    classId: '2',
    guardianName: 'Yusuf',
    guardianPhone: '081234560013',
    address: 'Jl. Kenanga No. 13, Jambi',
  },
  {
    id: 14,
    nis: '2024014',
    name: 'Nabila Putri',
    classId: '2',
    guardianName: 'Rahman',
    guardianPhone: '081234560014',
    address: 'Jl. Kenanga No. 14, Jambi',
  },
  {
    id: 15,
    nis: '2024015',
    name: 'Aulia Rahmah',
    classId: '2',
    guardianName: 'Hendra',
    guardianPhone: '081234560015',
    address: 'Jl. Kenanga No. 15, Jambi',
  },
  {
    id: 16,
    nis: '2024016',
    name: 'Nadya Safitri',
    classId: '2',
    guardianName: 'Fauzi',
    guardianPhone: '081234560016',
    address: 'Jl. Kenanga No. 16, Jambi',
  },
  {
    id: 17,
    nis: '2024017',
    name: 'Intan Permata',
    classId: '2',
    guardianName: 'Ridho',
    guardianPhone: '081234560017',
    address: 'Jl. Kenanga No. 17, Jambi',
  },
  {
    id: 18,
    nis: '2024018',
    name: 'Putri Maharani',
    classId: '2',
    guardianName: 'Amin',
    guardianPhone: '081234560018',
    address: 'Jl. Kenanga No. 18, Jambi',
  },
  {
    id: 19,
    nis: '2024019',
    name: 'Salma Azzahra',
    classId: '2',
    guardianName: 'Lukman',
    guardianPhone: '081234560019',
    address: 'Jl. Kenanga No. 19, Jambi',
  },
  {
    id: 20,
    nis: '2024020',
    name: 'Syifa Nabila',
    classId: '2',
    guardianName: 'Firman',
    guardianPhone: '081234560020',
    address: 'Jl. Kenanga No. 20, Jambi',
  },
];

async function seed() {
  console.log('Seeding students...');

  const db = getDb();

  await db.delete(students);

  const result = await db.insert(students).values(seedData).returning();

  console.log(`Seeded ${result.length} students.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
