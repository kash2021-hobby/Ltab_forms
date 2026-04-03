import { drizzle } from "drizzle-orm/mysql2";
import { credentials } from "./drizzle/schema.ts";
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const connection = await mysql.createConnection(url);
const db = drizzle(connection);

try {
  await db.insert(credentials).values({
    email: 'kashyapnandan2021@gmail.com',
    passwordHash: '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2',
  }).onDuplicateKeyUpdate({
    set: { passwordHash: '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2' }
  });
  console.log('✓ Credentials seeded');
} catch (e) {
  console.error('✗ Error:', e.message);
} finally {
  await connection.end();
}
