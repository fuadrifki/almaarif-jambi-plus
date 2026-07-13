import 'dotenv/config';

import { getDb } from './client';
import { students } from './schema';

const seedData = [
  {
    nis: '2024001',
    name: 'Abdullah',
    classId: 'class-1',
    room: 'Ruang 1',
    guardianName: 'Budi',
    guardianPhone: '081234567890',
    address: 'Jl. Merdeka No. 1',
  },
  {
    nis: '2024002',
    name: 'Fatimah',
    classId: 'class-1',
    room: 'Ruang 1',
    guardianName: 'Siti',
    guardianPhone: '081234567891',
    address: 'Jl. Merdeka No. 2',
  },
  {
    nis: '2024003',
    name: 'Ibrahim',
    classId: 'class-2',
    room: 'Ruang 2',
    guardianName: 'Ahmad',
    guardianPhone: '081234567892',
    address: 'Jl. Sudirman No. 5',
  },
  {
    nis: '2024004',
    name: 'Khadijah',
    classId: 'class-2',
    room: 'Ruang 2',
    guardianName: 'Halimah',
    guardianPhone: '081234567893',
    address: 'Jl. Sudirman No. 8',
  },
  {
    nis: '2024005',
    name: 'Yusuf',
    classId: 'class-3',
    room: 'Ruang 3',
    guardianName: 'Hasan',
    guardianPhone: '081234567894',
    address: 'Jl. Thamrin No. 12',
  },
  {
    nis: '2024006',
    name: 'Aisyah',
    classId: 'class-1',
    room: 'Ruang 1',
    guardianName: 'Rahman',
    guardianPhone: '081234567895',
    address: 'Jl. Gatot Subroto No. 3',
  },
  {
    nis: '2024007',
    name: 'Umar',
    classId: 'class-2',
    room: 'Ruang 2',
    guardianName: 'Fatimah',
    guardianPhone: '081234567896',
    address: 'Jl. Diponegoro No. 7',
  },
  {
    nis: '2024008',
    name: 'Zainab',
    classId: 'class-3',
    room: 'Ruang 3',
    guardianName: 'Ibrahim',
    guardianPhone: '081234567897',
    address: 'Jl. Ahmad Yani No. 15',
  },
  {
    nis: '2024009',
    name: 'Ali',
    classId: 'class-4',
    room: 'Ruang 4',
    guardianName: 'Khadijah',
    guardianPhone: '081234567898',
    address: 'Jl. Pemuda No. 20',
  },
  {
    nis: '2024010',
    name: 'Maryam',
    classId: 'class-4',
    room: 'Ruang 4',
    guardianName: 'Yusuf',
    guardianPhone: '081234567899',
    address: 'Jl. Sultan Agung No. 9',
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
