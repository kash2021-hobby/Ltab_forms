const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    await connection.execute(
      `INSERT INTO credentials (email, passwordHash) VALUES (?, ?) ON DUPLICATE KEY UPDATE passwordHash = ?`,
      [
        'kashyapnandan2021@gmail.com',
        '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2',
        '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2'
      ]
    );
    
    console.log('✓ Credentials seeded successfully');
    await connection.end();
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
})();
