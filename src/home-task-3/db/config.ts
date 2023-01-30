// import { Dialect, Sequelize } from 'sequelize';

// const dbName = process.env.DB_NAME as string;
// const dbUser = process.env.DB_USER as string;
// const dbHost = process.env.DB_HOST;
// const dbDriver = 'postgresql' as Dialect;
// const dbPassword = process.env.DB_PASSWORD;

// const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   dialect: dbDriver,
// });

// export default sequelizeConnection;

import { Sequelize, DataTypes } from 'sequelize';
const sequelizeConnection = new Sequelize(
  'postgres://sxxxnlwk:BC4JoO--aSeTSbSZgZh2zu12iYdS-hT3@hattie.db.elephantsql.com/sxxxnlwk',
  {
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
); // Example for postgres

try {
  await sequelizeConnection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelizeConnection;
