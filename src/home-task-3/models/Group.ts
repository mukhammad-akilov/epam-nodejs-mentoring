import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../db/config.js';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface GroupAttributes {
  id: number;
  name: string;
  permissions: Array<Permission>;
  created_at?: Date;
  updated_at?: Date;
}

export interface GroupInput extends Optional<GroupAttributes, 'id'> {}

export interface GroupOutput extends Required<GroupAttributes> {}

class Group extends Model<GroupAttributes, GroupInput> implements GroupAttributes {
  public id!: number;
  public name!: string;
  public permissions!: Array<Permission>;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'groups',
  },
);

export default Group;
