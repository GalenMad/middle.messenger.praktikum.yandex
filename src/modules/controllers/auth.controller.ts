import BaseController from './base.controller';
import Store from '../Store';
import { LoginAPI, LogoutAPI, UserInfoAPI } from '../api/auth.api';

// TODO: К вопросу ниже, нужны ли эти консты здесь
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();
const userInfoAPI = new UserInfoAPI();

const { setAuthorizationStatus, setUserInfo } = Store

// TODO: Может тоже сделать как синглтон?
export default class AuthController extends BaseController {

  async checkAuthorization() {
    const response = await userInfoAPI.request();
    setAuthorizationStatus(!response.error);
    if (!response.error) {
      setUserInfo(response.data);
    }
  }

  async getUserInfo() {
    const response = await userInfoAPI.request();
    if (response.error) {
      setAuthorizationStatus(false);
      this.router.go('/sign-in');
      this.throwError('userInfoAPI', response);
    }
    setUserInfo(response.data);
  }

  async login(data: Record<string, string | number>) {
    // TODO: Единый контроллер появления модалок вместо вывода ошибок
    const response = await loginAPI.request(data);
    if (response.error) {
      this.throwError('loginAPI', response);
    }

    setAuthorizationStatus(true);
    this.getUserInfo();
    this.router.go('/');
  }

  async registration(data: Record<string, string | number>) {
    const response = await loginAPI.create(data);
    if (response.error) {
      this.throwError('loginAPI', response);
    }

    setAuthorizationStatus(true);
    this.getUserInfo();
    this.router.go('/');
  }

  // TODO: Как быть, если юзер почистит куки на страницах с чатами?
  async logout() {
    const response = await logoutAPI.request();
    if (response.error) {
      this.throwError('loginAPI', response);
    }

    setAuthorizationStatus(false);
    this.router.go('/sign-in');
  }
}
