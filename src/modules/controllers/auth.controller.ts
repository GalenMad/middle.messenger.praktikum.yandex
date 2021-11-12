import { LoginAPI, UserInfoAPI, LogoutAPI } from '../api/auth.api';
import Router from '../router';

const loginAPI = new LoginAPI();
const userInfoAPI = new UserInfoAPI();
const logoutAPI = new LogoutAPI();

export default class AuthController {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  async login(data: Record<string, string | number>) {
    console.log('login', await loginAPI.request(data));
    console.log('info',  await userInfoAPI.request());
  }

  async registration(data: Record<string, string | number>) {
    console.log('registration', await loginAPI.create(data));
    console.log('info', await userInfoAPI.request());
  }

  async logout() {
    console.log('logout', await logoutAPI.request());
  }
}
