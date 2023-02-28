import { Response, Request, NextFunction } from 'express';

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
