import 'dotenv/config';

import { getDb } from './client';
import { classes } from './schema';

export const seedData = [
  {
    id: 1,
    code: 'C001',
    name: '1 MADIN PA',
    level: 1,
    gender: 'male',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 1 Putra',
  },
  {
    id: 2,
    code: 'C002',
    name: '1 MADIN PI',
    level: 1,
    gender: 'female',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 1 Putri',
  },
  {
    id: 3,
    code: 'C003',
    name: '2 MADIN PA',
    level: 2,
    gender: 'male',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 2 Putra',
  },
  {
    id: 4,
    code: 'C004',
    name: '2 MADIN PI',
    level: 2,
    gender: 'female',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 2 Putri',
  },
  {
    id: 5,
    code: 'C005',
    name: '3 MADIN PA',
    level: 3,
    gender: 'male',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 3 Putra',
  },
  {
    id: 6,
    code: 'C006',
    name: '3 MADIN PI',
    level: 3,
    gender: 'female',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 3 Putri',
  },
  {
    id: 7,
    code: 'C007',
    name: '4 MADIN PA',
    level: 4,
    gender: 'male',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 4 Putra',
  },
  {
    id: 8,
    code: 'C008',
    name: '4 MADIN PI',
    level: 4,
    gender: 'female',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 4 Putri',
  },
  {
    id: 9,
    code: 'C009',
    name: '5 MADIN',
    level: 5,
    gender: 'mixed',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 5',
  },
  {
    id: 10,
    code: 'C010',
    name: '6 MADIN',
    level: 6,
    gender: 'mixed',
    academicLevel: 'Madin',
    description: 'Kelas Madin tingkat 6',
  },
];

async function seed() {
  console.log('Seeding classes...');

  const db = getDb();

  await db.delete(classes);

  const result = await db.insert(classes).values(seedData).returning();

  console.log(`Seeded ${result.length} classes.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
