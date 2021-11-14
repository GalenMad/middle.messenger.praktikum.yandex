import BaseController from './base.controller';
import { AUTH_EVENTS } from '../../data/events';
import { LoginAPI, LogoutAPI, UserInfoAPI } from '../api/auth.api';

// TODO: К вопросу ниже, нужны ли эти консты здесь
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();
const userInfoAPI = new UserInfoAPI();

// TODO: Может тоже сделать как синглтон?
export default class AuthController extends BaseController {

  async getUserInfo() {
    const response = await userInfoAPI.request();
    if (response.error) {
      this.throwError('userInfoAPI', response);
    }
    this.eventBus.emit(AUTH_EVENTS.USER_INFO, response.data);
  }

  async login(data: Record<string, string | number>) {
    // TODO: Единый контроллер появления модалок вместо вывода ошибок
    const response = await loginAPI.request(data);
    if (response.error) {
      this.throwError('loginAPI', response);
    }

    this.eventBus.emit(AUTH_EVENTS.LOGIN, true);
    this.getUserInfo();
    this.router.go('/');
  }

  async registration(data: Record<string, string | number>) {
    const response = await loginAPI.create(data);
    if (response.error) {
      this.throwError('loginAPI', response);
    }

    this.eventBus.emit(AUTH_EVENTS.SIGN_UP, true);
    this.getUserInfo();
    this.router.go('/');
  }

  // TODO: Как быть, если юзер почистит куки на страницах с чатами?
  async logout() {
    const response = await logoutAPI.request();
    if (response.error) {
      this.throwError('loginAPI', response);
    }

    this.eventBus.emit(AUTH_EVENTS.LOGOUT, false);
    this.router.go('/sign-in');
  }
}
