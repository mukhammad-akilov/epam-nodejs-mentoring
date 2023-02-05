import express from 'express';
import router from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const serverPort = process.env.ROUTER_SERVER_PORT;
const app = express();
app.use(express.json());
app.use(router);

app.listen(serverPort, () => {
  console.log(`Listening from on port ${serverPort}`);
});
