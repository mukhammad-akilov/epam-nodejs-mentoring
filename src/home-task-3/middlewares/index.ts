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
  Logger.error(
    `Error message: ${error.message}. \n Error method: ${req.method}. Error query: ${JSON.stringify(
      req.query,
    )} Error body: ${JSON.stringify(req.body)}`,
  );
  res.status(500).send(error.message);
};
