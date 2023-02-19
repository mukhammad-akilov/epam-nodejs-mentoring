import User, { UserInput, UserOutput } from '../models/User.js';
import UserService from '../services/user.js';

export const getAll = (): Promise<UserOutput[]> => {
  return UserService.getAll();
};

export const getUserById = (id: string): Promise<User | null> => {
  return UserService.getById(id);
};

export const createUser = (userPayload: UserInput): Promise<User> => {
  const newUser = UserService.create(userPayload);
  return newUser;
};

export const updateUser = (updatedUserPaylaod: Partial<UserInput>): void => {
  UserService.update(updatedUserPaylaod);
};

export const deleteUser = (id: string): void => {
  UserService.delete(id);
};

export const autoSuggest = (login: string, limit: number = 10): Promise<User[]> => {
  const autoSuggestedUsers = UserService.autoSuggest(login, limit);
  return autoSuggestedUsers;
};
