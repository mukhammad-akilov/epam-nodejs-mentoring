import dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { Sequelize, DataTypes } from 'sequelize';
const sequelizeConnection = new Sequelize(
  `${process.env.DB_TYPE}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
  {
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    logging: false,
  },
);

const connect = async () => {
  await sequelizeConnection.authenticate();
  console.log('Connection has been established successfully.');
};

try {
  connect();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelizeConnection;
