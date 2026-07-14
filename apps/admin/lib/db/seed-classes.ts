import 'dotenv/config';

import { getDb } from './client';
import { classes } from './schema';

const seedData = [
  {
    code: 'T001',
    name: 'Tahfidz A',
    description: 'Kelas Tahfidz tingkat awal',
  },
  {
    code: 'T002',
    name: 'Tahfidz B',
    description: 'Kelas Tahfidz tingkat menengah',
  },
  {
    code: 'T003',
    name: 'Tahsin A',
    description: 'Kelas Tahsin tingkat awal',
  },
  {
    code: 'T004',
    name: 'Tahsin B',
    description: 'Kelas Tahsin tingkat lanjut',
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
