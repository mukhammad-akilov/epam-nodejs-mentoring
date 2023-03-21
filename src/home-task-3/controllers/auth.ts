import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = (): string => {
  const accessToken = jwt.sign(
    {
      username: 'Akilov',
    },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: '5m' },
  );

  return accessToken;
};
