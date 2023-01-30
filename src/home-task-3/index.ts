import express, { NextFunction, Request, Response } from 'express';
// import {
//   ContainerTypes,
//   // Use this as a replacement for express.Request
//   ValidatedRequest,
//   // Extend from this to define a valid schema type/interface
//   ValidatedRequestSchema,
//   // Creates a validator that generates middlewares
//   createValidator,
// } from 'express-joi-validation';
import { getAll } from './controllers/user.js';

const serverPort = 8000;
const app = express();
// const validator = createValidator();
app.use(express.json());

// interface CraeteUserRequestSchema extends ValidatedRequestSchema {
//   [ContainerTypes.Fields]: {
//     login: string;
//     password: string;
//     age: number;
//   };
// }

const routeHandler = <T>(fn: (req: T, res: Response) => void) => {
  return (req: T, res: Response, next: NextFunction) => {
    try {
      fn(req, res);
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      next(message);
    }
  };
};

app.get(
  '/api/users',
  routeHandler<Request>(async (req, res) => {
    const usersList = await getAll();
    res.json(usersList);
  }),
);

app.listen(serverPort, () => {
  console.log(`Listening from on port ${serverPort}`);
});
