import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ltab_forms',
});

try {
  const query = `
    INSERT INTO credentials (email, passwordHash, createdAt, updatedAt) 
    VALUES (?, ?, NOW(), NOW())
    ON DUPLICATE KEY UPDATE updatedAt = NOW()
  `;
  
  await connection.execute(query, [
    'kashyapnandan2021@gmail.com',
    '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2'
  ]);
  
  console.log('✓ Credentials seeded successfully');
} catch (error) {
  console.error('✗ Error seeding credentials:', error.message);
} finally {
  await connection.end();
}
