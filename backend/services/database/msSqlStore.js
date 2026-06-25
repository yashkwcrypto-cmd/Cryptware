import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  server: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ProductCatalog',
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true, // Use this if you're on Azure
    trustServerCertificate: true // Change to true for local dev / self-signed certs
  }
};

let poolPromise = null;

const connect = async () => {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    console.log('Connected to MSSQL');
    return pool;
  } catch (err) {
    console.error('Database Connection Failed! Bad Config: ', err);
    return null;
  }
};

export const initDatabase = () => {
  poolPromise ||= connect();
  return poolPromise;
};

export const query = async (queryString, params) => {
  poolPromise ||= connect();
  const pool = await poolPromise;
  if (!pool) {
    throw new Error('MSSQL connection is not available');
  }
  const request = pool.request();
  
  if (params) {
    for (const key in params) {
      request.input(key, params[key]);
    }
  }
  
  const result = await request.query(queryString);
  return result.recordset; // returns array of rows
};

export const getConnection = async () => {
  poolPromise ||= connect();
  const pool = await poolPromise;
  if (!pool) {
    throw new Error('MSSQL connection is not available');
  }
  return {
    release: () => {} // Dummy release to prevent index.js from failing
  };
};

export default { query, getConnection };
