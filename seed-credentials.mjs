import { getDb } from './server/db.ts';
import { credentials } from './drizzle/schema.ts';

const db = await getDb();

if (db) {
  try {
    await db.insert(credentials).values({
      email: 'kashyapnandan2021@gmail.com',
      passwordHash: '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2',
    });
    console.log('Credentials seeded successfully');
  } catch (error) {
    console.error('Error seeding credentials:', error);
  }
} else {
  console.error('Database connection failed');
}
