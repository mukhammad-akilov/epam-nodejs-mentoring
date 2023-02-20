import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../db/config.js';
import Group from './Group.js';
import User from './User.js';

interface UserGroupAttributes {
  id: number;
  groupId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserGrouptInput extends Optional<UserGroupAttributes, 'id'> {}
export interface UserGroupOutput extends UserGrouptInput {}

class UserGroup extends Model<UserGroupAttributes, UserGrouptInput> implements UserGroupAttributes {
  public id!: number;
  public groupId!: number;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserGroup.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'user_group',
  },
);

User.belongsToMany(Group, {
  through: UserGroup,
});

Group.belongsToMany(User, {
  through: UserGroup,
});

export default UserGroup;
