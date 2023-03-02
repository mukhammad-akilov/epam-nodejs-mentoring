import { Response, Request, NextFunction } from 'express';
import Logger from '../lib/logger.js';

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
  Logger.error(error.message);
  res.status(500).send(error.message);
};
