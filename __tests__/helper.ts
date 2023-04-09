import { agent as _request } from 'supertest';
import app from '../src/home-task-3/app';
export const request = _request(app);
