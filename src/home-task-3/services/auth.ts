import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export interface loginResponse {
  success: boolean;
  statusCode: number;
  accessToken?: string;
  message?: string;
}
class AuthService {
  static async loginUser(login: string, password: string): Promise<loginResponse> {
    const user = await User.findOne({ where: { login: login } });
    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (passwordIsValid) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            login: user.login,
          },
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: '5m' },
        );

        return {
          success: true,
          statusCode: 200,
          accessToken: accessToken,
        };
      } else {
        // Password is incorrect
        return {
          success: false,
          statusCode: 400,
          message: 'Password Incorrect',
        };
      }
    } else {
      // User does not exist
      return {
        success: false,
        statusCode: 404,
        message: 'User does not exist',
      };
    }
  }
}

export default AuthService;
