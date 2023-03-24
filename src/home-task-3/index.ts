import express from 'express';
import router from './routes/index.js';
import dotenv from 'dotenv';
import dbInit from './db/init.js';
import process from 'node:process';
import Logger from './lib/logger.js';
import cors from 'cors';
import { requestInfoMiddleware, handleErrorMiddleware, verifyJWT } from './middlewares/index.js';
import { resolve } from 'node:path';
dotenv.config();

const serverPort = process.env.ROUTER_SERVER_PORT;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestInfoMiddleware);
app.use(verifyJWT);
app.use(router);
app.use(handleErrorMiddleware);
dbInit();

app.listen(serverPort, () => {
  console.log(`Listening from on port ${serverPort}`);
});

process.on('uncaughtException', (err, origin) => {
  Logger.error(`Error: ${err.message}. Error origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  Logger.error(`Unhandled rejection`, reason, promise);
});
