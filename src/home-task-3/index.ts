import express from 'express';
import router from './routes/index.js';
import dotenv from 'dotenv';
import dbInit from './db/init.js';
import { requestInfoMiddleware } from './middlewares/index.js';
dotenv.config();

const serverPort = process.env.ROUTER_SERVER_PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestInfoMiddleware);
app.use(router);
dbInit();

app.listen(serverPort, () => {
  console.log(`Listening from on port ${serverPort}`);
});
