import sql from 'mssql';
import { getPool } from './db.js';

export const executeQuery = async (loggingKey, queryString, params = {}) => {
  try {
    const pool = await getPool();
    const request = pool.request();
    
    for (const key in params) {
      const { type, value } = params[key];
      if (type) {
        request.input(key, type, value);
      } else {
        // Warning: fallback without type. Controllers should pass explicit type.
        request.input(key, value); 
      }
    }
    
    const result = await request.query(queryString);
    return result.recordset;
  } catch (error) {
    console.error(`${loggingKey} - DB_ERROR: ${error.message}`);
    throw error;
  }
};

export const fetchAllFromDb = async (loggingKey, tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  return executeQuery(loggingKey, query);
};

export const fetchOneFromDb = async (loggingKey, tableName, filter) => {
  const conditions = Object.keys(filter).map(key => `${key} = @${key}`).join(' AND ');
  const query = `SELECT TOP 1 * FROM ${tableName} WHERE ${conditions}`;
  const params = {};
  for (const key in filter) {
    params[key] = { value: filter[key] };
  }
  return executeQuery(loggingKey, query, params);
};

export const fetchManyFromDb = async (loggingKey, tableName, filter) => {
  const conditions = Object.keys(filter).map(key => `${key} = @${key}`).join(' AND ');
  const query = `SELECT * FROM ${tableName} WHERE ${conditions}`;
  const params = {};
  for (const key in filter) {
    params[key] = { value: filter[key] };
  }
  return executeQuery(loggingKey, query, params);
};

export const insertOneToDb = async (loggingKey, tableName, data) => {
  const columns = Object.keys(data).join(', ');
  const variables = Object.keys(data).map(key => `@${key}`).join(', ');
  const query = `INSERT INTO ${tableName} (${columns}) OUTPUT INSERTED.* VALUES (${variables})`;
  const params = {};
  for (const key in data) {
    params[key] = { value: data[key] }; // Assumes type inference unless explicitly typed upstream
  }
  const result = await executeQuery(loggingKey, query, params);
  return result && result.length > 0 ? result[0] : null;
};

export const updateOneToDb = async (loggingKey, tableName, filter, data) => {
  const setClause = Object.keys(data).map(key => `${key} = @data_${key}`).join(', ');
  const whereClause = Object.keys(filter).map(key => `${key} = @filter_${key}`).join(' AND ');
  const query = `UPDATE ${tableName} SET ${setClause} OUTPUT INSERTED.* WHERE ${whereClause}`;
  
  const params = {};
  for (const key in data) {
    params[`data_${key}`] = { value: data[key] };
  }
  for (const key in filter) {
    params[`filter_${key}`] = { value: filter[key] };
  }
  
  const result = await executeQuery(loggingKey, query, params);
  return result && result.length > 0 ? result[0] : null;
};

export const deleteOneFromDb = async (loggingKey, tableName, filter) => {
  const conditions = Object.keys(filter).map(key => `${key} = @${key}`).join(' AND ');
  const query = `DELETE FROM ${tableName} WHERE ${conditions}`;
  const params = {};
  for (const key in filter) {
    params[key] = { value: filter[key] };
  }
  return executeQuery(loggingKey, query, params);
};

export const fetchCountFromDb = async (loggingKey, tableName, filter = {}) => {
  let query = `SELECT COUNT(*) as count FROM ${tableName}`;
  const params = {};
  const filterKeys = Object.keys(filter);
  
  if (filterKeys.length > 0) {
    const conditions = filterKeys.map(key => `${key} = @${key}`).join(' AND ');
    query += ` WHERE ${conditions}`;
    for (const key of filterKeys) {
      params[key] = { value: filter[key] };
    }
  }
  
  const result = await executeQuery(loggingKey, query, params);
  return result && result.length > 0 ? result[0].count : 0;
};

export const executeTransaction = async (loggingKey, fn) => {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();
    const result = await fn(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    console.error(`${loggingKey} - TRANSACTION_ERROR: ${error.message}`);
    await transaction.rollback();
    throw error;
  }
};
