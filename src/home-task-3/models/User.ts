import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../db/config.js';
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
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

export default User;
