import express, { NextFunction, Request, Response } from 'express';
import { z, AnyZodObject } from 'zod';
import { getAll, getUserById, createUser, updateUser, deleteUser, autoSuggest } from './controllers/user.js';
import { UserInput } from './models/User.js';
import { addSchema, updateSchema } from './schema/user.js';

const serverPort = 8000;
const app = express();
app.use(express.json());

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

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

app.get(
  '/api/users/:id',
  routeHandler<Request>(async (req, res) => {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (user !== null) {
      res.json(user);
    } else {
      res.status(404).send('Not found');
    }
  }),
);

app.post(
  '/api/users',
  validate(addSchema),
  routeHandler<Request>(async (req, res) => {
    const user: UserInput = req.body;
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  }),
);

app.put(
  '/api/users',
  validate(addSchema),
  routeHandler<Request>((req, res) => {
    const updatedUser: UserInput = req.body;
    updateUser(updatedUser);
    res.status(200).json({ message: 'User successfully updated' });
  }),
);

app.delete(
  '/api/users/:id',
  routeHandler<Request>((req, res) => {
    const userId = req.params.id;
    deleteUser(userId);
    res.status(204).json({ message: 'User deleted successfully' });
  }),
);

// Auto suggest users
app.get(
  '/api/users-auto-suggest',
  routeHandler<Request>(async (req, res) => {
    const loginSearch = req.query.login as string;
    const loginLimit = req.query.limit as string;
    const usersList = await autoSuggest(loginSearch, parseInt(loginLimit, 10));
    res.status(200).json(usersList);
  }),
);

app.listen(serverPort, () => {
  console.log(`Listening from on port ${serverPort}`);
});
