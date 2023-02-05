import { Sequelize, Op } from 'sequelize';
import User, { UserInput, UserOutput } from '../models/User.js';

export const getAll = (): Promise<UserOutput[]> => {
  return User.findAll();
};

export const getUserById = (id: string): Promise<User | null> => {
  return User.findOne({
    where: { id: 1 },
  });
};

export const createUser = (userPayload: UserInput): Promise<User> => {
  const newUser = User.create(userPayload);
  return newUser;
};

export const updateUser = async (updatedUserPaylaod: Partial<UserInput>): Promise<void> => {
  const userId = updatedUserPaylaod.id;
  const selecteduser = await User.findByPk(userId);
  if (!selecteduser) {
    throw new Error('User not found');
  }

  const updatedUser = await selecteduser.update(updatedUserPaylaod, {
    where: {
      id: userId,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  const deleteduser = await User.destroy({
    where: {
      id: id,
    },
  });
};

export const autoSuggest = async (login: string, limit: number = 10): Promise<User[]> => {
  const autoSuggestedUsers = await User.findAll({
    limit: limit,
    order: [['login', 'ASC']],
    where: {
      login: {
        [Op.like]: `%${login}%`,
      },
    },
  });
  return autoSuggestedUsers;
};
