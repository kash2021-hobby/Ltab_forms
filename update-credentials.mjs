import mysql from 'mysql2/promise';

try {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  await connection.execute(
    `UPDATE credentials SET passwordHash = ? WHERE email = ?`,
    [
      '$2b$10$YOKVINnVjdVaIS.Jc4jX6u1ogGl0EEbZXKb2JqeRbGP646pfILXWS',
      'kashyapnandan2021@gmail.com'
    ]
  );
  
  console.log('✓ Credentials updated successfully');
  await connection.end();
} catch (error) {
  console.error('✗ Error:', error.message);
  process.exit(1);
}
