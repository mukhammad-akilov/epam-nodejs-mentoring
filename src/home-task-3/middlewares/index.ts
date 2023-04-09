import { Response, Request, NextFunction } from 'express';
import Logger from '../lib/logger.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const requestInfoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestInfo = {
    method: req.method,
    url: req.originalUrl,
    args: {
      query: req.query,
      body: req.body,
    },
  };

  console.log(requestInfo);
  next();
};

export const handleErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(
    `Error message: ${error.message}. \n Error method: ${req.method}. Error query: ${JSON.stringify(
      req.query,
    )} Error body: ${JSON.stringify(req.body)}`,
  );
  res.status(500).send(error.message);
};

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/api/login') {
    return next();
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const jwtToken = authHeader.split(' ')[1];
  jwt.verify(jwtToken, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
    if (err) return res.status(403).json({ message: err.message });
    next();
  });
};
