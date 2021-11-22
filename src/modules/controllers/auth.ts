import BaseController from './base';
import { LoginAPI, LogoutAPI, UserInfoAPI } from '../api/auth';
import ChatsController from './chats';

// TODO: К вопросу ниже, нужны ли эти консты здесь
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();
const userInfoAPI = new UserInfoAPI();
const chatsController = new ChatsController();

// TODO: Может контроллеры тоже сделать как синглтон?
export default class AuthController extends BaseController {
  async init() {
    this.loadingModal.show();
    await this.checkAuthorization();
    this.router.start(this.getters.isAuthorized);
    this.loadingModal.hide();
  }

  async checkAuthorization() {
    const response = await userInfoAPI.request(true);
    this.mutations.setAuthorizationStatus(!response.error);
    if (!response.error) {
      await this.getUserInfo();
    }
  }

  async getUserInfo() {
    const response = await userInfoAPI.request();
    if (response.error) {
      this.mutations.setAuthorizationStatus(false);
      this.router.go('/sign-in');
      this.throwError(response);
    }
    // TODO: Избыточные проверки для TS
    if (response.data && typeof response.data !== 'string') {
      this.mutations.setUserInfo(response.data);
      await chatsController.setUserChatList();
      chatsController.launchUpdateChatListTimeout();
    }
  }

  async login(data: QueryData) {
    this.loadingModal.show();
    const response = await loginAPI.request(data);
    if (response.error) {
      this.throwError(response);
    }

    this.mutations.setAuthorizationStatus(true);
    await this.getUserInfo();
    this.router.go('/');
    this.loadingModal.hide();
  }

  async registration(data: QueryData) {
    this.loadingModal.show();
    const response = await loginAPI.create(data);
    if (response.error) {
      this.throwError(response);
    }

    this.mutations.setAuthorizationStatus(true);
    this.getUserInfo();
    this.router.go('/');
    this.loadingModal.hide();
  }

  // TODO: Как быть, если юзер почистит куки на страницах с чатами?
  // TODO: Чистить стор и сокеты при выходе
  async logout() {
    this.loadingModal.show();
    const response = await logoutAPI.request();
    if (response.error) {
      this.throwError(response);
    }

    this.mutations.setAuthorizationStatus(false);
    this.router.go('/sign-in');
    this.loadingModal.hide();
  }
}
