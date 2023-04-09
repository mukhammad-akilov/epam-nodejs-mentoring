import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import { requestInfoMiddleware, handleErrorMiddleware, verifyJWT } from './middlewares/index.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestInfoMiddleware);
app.use(verifyJWT);
app.use(router);
app.use(handleErrorMiddleware); 

export default app;
