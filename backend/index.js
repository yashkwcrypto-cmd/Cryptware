import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dataRoutes from './routes/data.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { getAll } from './controller/data.controller.js';
import { initDatabase } from './services/database/msSqlStore.js';

dotenv.config();

const logginKey = "SERVER";
const app = express();
const Port = process.env.PORT || 3000;

process.on('unhandledRejection', (error) => {
  console.error(`${logginKey} - UNHANDLED REJECTION`, error);
});

process.on('uncaughtException', (error) => {
  console.error(`${logginKey} - UNCAUGHT EXCEPTION`, error);
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  console.log(`${logginKey} - START`);
  app.use(cors({
    origin: [
      process.env.FRONTEND_LOCAL_HOST,
      process.env.FRONTEND_LIVE_LINK
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));
  app.use(express.json());

  // Serve uploads directory statically
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use("/api/products", dataRoutes);
  app.use("/api/ai", aiRoutes);

  app.get("/", getAll);

  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
  });

  const server = app.listen(Port, () => {
    console.log(`${logginKey} - Server is running on port ${Port} , http://localhost:${Port}`);
  });

  initDatabase().catch((error) => {
    console.error(`${logginKey} - DB INIT FAILED`, error);
  });

  server.on('close', () => {
    console.log(`${logginKey} - HTTP server closed`);
  });

  const keepAlive = setInterval(() => {
    server.getConnections((error, count) => {
      if (!error) {
        console.log(`${logginKey} - alive (${count} connections)`);
      }
    });
  }, 60000);

  keepAlive.ref();
  server.ref();

  console.log(`${logginKey} - END`);
} catch (error) {
  console.log(`${logginKey} - ERROR - `, error);
}
