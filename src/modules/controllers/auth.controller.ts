import BaseController from './base.controller';
import { AUTH_EVENTS } from '../../data/events';
import { LoginAPI, LogoutAPI } from '../api/auth.api';

// TODO: К вопросу ниже, нужны ли эти консты здесь
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();

// TODO: Может тоже сделать как синглтон?
export default class AuthController extends BaseController{

  async login(data: Record<string, string | number>) {
    // TODO: Единый контроллер появления модалок вместо вывода ошибок
    const loginResponse = await loginAPI.request(data);
    if (loginResponse.error) {
      this.throwError('loginAPI', loginResponse);
    }

    this.eventBus.emit(AUTH_EVENTS.LOGIN, true);
    this.router.go('/');
  }

  async registration(data: Record<string, string | number>) {
    const signUpResponse = await loginAPI.create(data);
    if (signUpResponse.error) {
      this.throwError('loginAPI', signUpResponse);
    }

    this.eventBus.emit(AUTH_EVENTS.SIGN_UP, true);
    this.router.go('/');
  }

  // TODO: Как быть, если юзер почистит куки на страницах с чатами?
  async logout() {
    const logoutResponse = await logoutAPI.request();
    if (logoutResponse.error) {
      this.throwError('loginAPI', logoutResponse);
    }

    this.eventBus.emit(AUTH_EVENTS.LOGOUT, false);
    this.router.go('/sign-in');
  }
}
