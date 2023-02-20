import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  autoSuggest,
  addToGroup,
} from '../controllers/user.js';
import { UserInput } from '../models/User.js';
import { getAll as getAllGroups, getById, create, update, remove } from '../controllers/group.js';
import { GroupInput } from '../models/Group.js';
import { addSchema, updateSchema } from '../schema/user.js';
import { addSchema as addGroupSchema, updateSchema as updateGroupSchema } from '../schema/group.js';
import { UserGrouptInput } from '../models/UserGroup.js';

const router = express.Router();

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

router.get(
  '/api/users',
  routeHandler<Request>(async (req, res) => {
    const usersList = await getAll();
    res.json(usersList);
  }),
);

router.get(
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

router.post(
  '/api/users',
  validate(addSchema),
  routeHandler<Request>(async (req, res) => {
    const user: UserInput = req.body;
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  }),
);

router.put(
  '/api/users',
  validate(updateSchema),
  routeHandler<Request>((req, res) => {
    const updatedUser: UserInput = req.body;
    updateUser(updatedUser);
    res.status(200).json({ message: 'User successfully updated' });
  }),
);

router.delete(
  '/api/users/:id',
  routeHandler<Request>((req, res) => {
    const userId = req.params.id;
    deleteUser(userId);
    res.status(204).json({ message: 'User deleted successfully' });
  }),
);

// Auto suggest users
router.get(
  '/api/users-auto-suggest',
  routeHandler<Request>(async (req, res) => {
    const loginSearch = req.query.login as string;
    const loginLimit = req.query.limit as string;
    const usersList = await autoSuggest(loginSearch, parseInt(loginLimit, 10));
    res.status(200).json(usersList);
  }),
);

router.post(
  '/api/add-user-to-group',
  routeHandler<Request>(async (req, res) => {
    const payload: UserGrouptInput = req.body;
    const userToGroup = await addToGroup(payload);
    if (userToGroup) {
      res.status(200).json({ message: 'User successfully added to the group' });
    } else {
      res.status(400).send('Error while added to the group');
    }
  }),
);

// Groups routes
router.get(
  '/api/groups',
  routeHandler<Request>(async (req, res) => {
    const usersList = await getAllGroups();
    res.json(usersList);
  }),
);

router.get(
  '/api/groups/:id',
  routeHandler<Request>(async (req, res) => {
    const groupId = req.params.id;
    const group = await getById(groupId);
    if (group !== null) {
      res.json(group);
    } else {
      res.status(404).send('Not found');
    }
  }),
);

router.post(
  '/api/groups',
  validate(addGroupSchema),
  routeHandler<Request>(async (req, res) => {
    const group: GroupInput = req.body;
    const newGroup = await create(group);
    res.status(201).json(newGroup);
  }),
);

router.put(
  '/api/groups',
  validate(updateGroupSchema),
  routeHandler<Request>((req, res) => {
    const updatedGroup: GroupInput = req.body;
    update(updatedGroup);
    res.status(200).json({ message: 'Group successfully updated' });
  }),
);

router.delete(
  '/api/groups/:id',
  routeHandler<Request>((req, res) => {
    const id = req.params.id;
    remove(id);
    res.status(204).json({ message: 'Group deleted successfully' });
  }),
);

export default router;
