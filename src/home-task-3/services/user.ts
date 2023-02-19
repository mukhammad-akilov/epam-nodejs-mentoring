import { Op } from 'sequelize';
import User, { UserInput, UserOutput } from '../models/User.js';
import sequelizeConnection from '../db/config.js';
import UserGroup, { UserGrouptInput } from '../models/UserGroup.js';

class UserService {
  static getAll(): Promise<UserOutput[]> {
    return User.findAll();
  }

  static getById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  static create(userPayload: UserInput): Promise<User> {
    const newUser = User.create(userPayload);
    return newUser;
  }

  static async update(updatedUserPaylaod: Partial<UserInput>): Promise<void> {
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
  }

  static delete = async (id: string): Promise<void> => {
    const deleteduser = await User.destroy({
      where: {
        id: id,
      },
    });
  };

  static autoSuggest = async (login: string, limit: number = 10): Promise<User[]> => {
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

  static addToGroup = async (payload: UserGrouptInput): Promise<UserGroup | undefined> => {
    const t = await sequelizeConnection.transaction();
    try {
      const userToGroup = UserGroup.create(payload);
      return userToGroup;
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  };
}

export default UserService;
