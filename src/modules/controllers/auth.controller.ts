import { LoginAPI, UserInfoAPI, LogoutAPI } from '../api/auth.api';
import Router from '../router';

const loginAPI = new LoginAPI();
const userInfoAPI = new UserInfoAPI();
const logoutAPI = new LogoutAPI();

const throwError = (title: string, response) => {
  const { data, status } = response;
  throw new Error(`\n ref: ${title} \n status: ${status} \n reson: ${data.reason || data}`);
}
export default class AuthController {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  // TODO: Найти место где инициализировать проверку авторизованности
  async login(data: Record<string, string | number>) {
    // TODO: Вместо этих конструкций с ошибками прикрутить модалки
    // TODO: Единый контроллер появления модалок
    const loginResponse = await loginAPI.request(data);
    if (loginResponse.error) {
      throwError('loginAPI', loginResponse);
    }

    const userInfoResponse = await userInfoAPI.request();
    if (userInfoResponse.error) {
      throwError('userInfoAPI', userInfoResponse);
    }

    console.log('User Info', userInfoResponse);
    this.router.go('/');
  }

  async registration(data: Record<string, string | number>) {
    const signUpResponse = await loginAPI.create(data);
    if (signUpResponse.error) {
      throwError('loginAPI', signUpResponse);
    }

    const userInfoResponse = await userInfoAPI.request();
    if (userInfoResponse.error) {
      throwError('userInfoAPI', userInfoResponse);
    }

    console.log('User Info', userInfoResponse);
    this.router.go('/');
  }

  // TODO: Как быть, если юзер почистит куки на страницах с чатами?
  // Его может выкинуть не сразу.
  async logout() {
    const logoutResponse = await logoutAPI.request();
    if (logoutResponse.error) {
      throwError('loginAPI', logoutResponse);
    }
    this.router.go('/sign-in');
  }
}
