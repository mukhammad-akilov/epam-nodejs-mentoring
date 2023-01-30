import User, { UserOutput } from '../models/User.js';

export const getAll = (): Promise<UserOutput[]> => {
  return User.findAll();
};
