import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

try {
  await connection.execute(
    `INSERT INTO credentials (email, passwordHash) VALUES (?, ?) ON DUPLICATE KEY UPDATE updatedAt = NOW()`,
    ['kashyapnandan2021@gmail.com', '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2']
  );
  console.log('✓ Credentials inserted successfully');
} catch (error) {
  console.error('✗ Error:', error.message);
} finally {
  await connection.end();
}
