import { AUTH_EVENTS } from '../../data/events';
import { LoginAPI, LogoutAPI } from '../api/auth.api';
import Router from '../router';
import EventBus from '../event-bus';

// TODO: К вопросу ниже, нужны ли эти консты здесь
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();
const eventBus = new EventBus();
const router = new Router();

const throwError = (title: string, response) => {
  const { data, status } = response;
  throw new Error(`\n ref: ${title} \n status: ${status} \n reson: ${data.reason || data}`);
}

// TODO: Может тоже сделать как синглтон?
export default class AuthController {
  router: Router;

  async login(data: Record<string, string | number>) {
    // TODO: Вместо этих конструкций с ошибками прикрутить модалки
    // TODO: Единый контроллер появления модалок
    const loginResponse = await loginAPI.request(data);
    if (loginResponse.error) {
      throwError('loginAPI', loginResponse);
    }

    eventBus.emit(AUTH_EVENTS.LOGIN, true);
    router.go('/');
  }

  async registration(data: Record<string, string | number>) {
    const signUpResponse = await loginAPI.create(data);
    if (signUpResponse.error) {
      throwError('loginAPI', signUpResponse);
    }

    eventBus.emit(AUTH_EVENTS.SIGN_UP, true);
    router.go('/');
  }

  // TODO: Как быть, если юзер почистит куки на страницах с чатами?
  // Его может выкинуть не сразу.
  async logout() {
    const logoutResponse = await logoutAPI.request();
    if (logoutResponse.error) {
      throwError('loginAPI', logoutResponse);
    }

    eventBus.emit(AUTH_EVENTS.LOGOUT, false);
    router.go('/sign-in');
  }
}
