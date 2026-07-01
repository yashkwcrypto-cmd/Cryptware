import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { initDatabase } from './service/database/db.js';

const loggingKey = "SERVER";
const Port = process.env.PORT || 3000;

process.on('unhandledRejection', (error) => {
  console.error(`${loggingKey} - UNHANDLED REJECTION`, error);
});

process.on('uncaughtException', (error) => {
  console.error(`${loggingKey} - UNCAUGHT EXCEPTION`, error);
});

try {
  console.log(`${loggingKey} - START`);
  
  const server = app.listen(Port, () => {
    console.log(`${loggingKey} - Server is running on port ${Port} , http://localhost:${Port}`);
  });

  initDatabase().catch((error) => {
    console.error(`${loggingKey} - DB INIT FAILED`, error);
  });

  server.on('close', () => {
    console.log(`${loggingKey} - HTTP server closed`);
  });

  const keepAlive = setInterval(() => {
    server.getConnections((error, count) => {
      if (!error) {
        console.log(`${loggingKey} - alive (${count} connections)`);
      }
    });
  }, 60000);

  keepAlive.ref();
  server.ref();

  console.log(`${loggingKey} - END`);
} catch (error) {
  console.log(`${loggingKey} - ERROR - `, error);
}
