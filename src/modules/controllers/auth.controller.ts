import { LoginAPI, LogoutAPI } from '../api/auth.api';
import Router from '../router';
import Store from '../store';

const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();
const store = new Store();

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

    store.isAuthorized = true;
    this.router.go('/');
  }

  async registration(data: Record<string, string | number>) {
    const signUpResponse = await loginAPI.create(data);
    if (signUpResponse.error) {
      throwError('loginAPI', signUpResponse);
    }

    store.isAuthorized = true;
    this.router.go('/');
  }

  // TODO: Как быть, если юзер почистит куки на страницах с чатами?
  // Его может выкинуть не сразу.
  async logout() {
    const logoutResponse = await logoutAPI.request();
    if (logoutResponse.error) {
      throwError('loginAPI', logoutResponse);
    }

    store.isAuthorized = false;
    this.router.go('/sign-in');
  }
}
