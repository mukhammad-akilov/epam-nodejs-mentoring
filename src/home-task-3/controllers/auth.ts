import { loginResponse } from '../services/auth.js';
import AuthService from '../services/auth.js';

export const login = (login: string, password: string): Promise<loginResponse> => {
  return AuthService.loginUser(login, password);
};
