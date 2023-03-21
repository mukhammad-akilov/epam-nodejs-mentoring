import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../db/config.js';
import bcrypt from 'bcrypt';
interface UserAttributes {
  id: number;
  login: string;
  password: string;
  age?: Number;
  created_at?: Date;
  updated_at?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public login!: string;
  public password!: string;
  public age!: Number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: 'users',
  },
);

User.beforeCreate(async (user, options) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

export default User;
