import sql from 'mssql';
import bcrypt from 'bcrypt';

let poolPromise = null;

export const getPool = async () => {
  if (poolPromise) return poolPromise;
  
  const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'ProductCatalog',
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };

  poolPromise = new sql.ConnectionPool(config).connect()
    .then(pool => {
      console.log('Connected to MSSQL');
      return pool;
    })
    .catch(err => {
      console.error('Database Connection Failed! Bad Config: ', err);
      poolPromise = null;
      throw err;
    });

  return poolPromise;
};

export const initDatabase = async () => {
  try {
    const pool = await getPool();
    
    const createTableSql = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='admins' and xtype='U')
      CREATE TABLE admins (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(50) UNIQUE NOT NULL,
        password NVARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT GETDATE()
      )
    `;
    await pool.request().query(createTableSql);

    // Seed default admin if not exists
    const checkAdminSql = `SELECT * FROM admins WHERE username = 'admin'`;
    const result = await pool.request().query(checkAdminSql);
    
    if (result.recordset.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const insertAdminSql = `INSERT INTO admins (username, password) VALUES (@username, @password)`;
      const request = pool.request();
      request.input('username', sql.NVarChar, 'admin');
      request.input('password', sql.NVarChar, hashedPassword);
      await request.query(insertAdminSql);
      console.log('Default admin seeded.');
    }
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
  }
};

export const closePool = async () => {
  if (poolPromise) {
    try {
      const pool = await poolPromise;
      await pool.close();
      poolPromise = null;
      console.log('MSSQL connection closed.');
    } catch (err) {
      console.error('Error closing MSSQL connection: ', err);
    }
  }
};
