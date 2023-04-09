import app from "./app.js";
import dbInit from "./db/init.js";
import dotenv from 'dotenv';
import Logger from './lib/logger.js';

dotenv.config();

const serverPort = process.env.ROUTER_SERVER_PORT;

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