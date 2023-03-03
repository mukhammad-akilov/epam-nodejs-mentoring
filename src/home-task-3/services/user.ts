import { Op } from 'sequelize';
import User, { UserInput, UserOutput } from '../models/User.js';
import sequelizeConnection from '../db/config.js';
import UserGroup, { UserGrouptInput } from '../models/UserGroup.js';
import { methodExucutionTimestamps } from '../decorators/index.js';
class UserService {
  @methodExucutionTimestamps()
  static async getAll(): Promise<UserOutput[]> {
    return User.findAll();
  }

  @methodExucutionTimestamps()
  static getById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  // @methodExucutionTimestamps()
  static create(userPayload: UserInput): Promise<User> {
    const newUser = User.create(userPayload);
    return newUser;
  }

  @methodExucutionTimestamps()
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

  @methodExucutionTimestamps()
  static async delete(id: string): Promise<void> {
    const deleteduser = await User.destroy({
      where: {
        id: id,
      },
    });
  }

  @methodExucutionTimestamps()
  static async autoSuggest(login: string, limit: number = 10): Promise<User[]> {
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
  }

  @methodExucutionTimestamps()
  static async addToGroup(payload: UserGrouptInput): Promise<UserGroup | undefined> {
    const t = await sequelizeConnection.transaction();
    try {
      const userToGroup = UserGroup.create(payload);
      return userToGroup;
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }
}

export default UserService;
