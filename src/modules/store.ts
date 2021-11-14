import { AUTH_EVENTS } from '../data/events';
import { UserInfoAPI } from './api/auth.api';
import EventBus from './event-bus';
let storeInstance: null | Store = null;

export default class Store {
  eventBus: EventBus;
  constructor() {
    if (storeInstance) {
      return storeInstance;
    }

    storeInstance = this;
    this.eventBus = new EventBus();
    this._registerEvents();
  }

  _registerEvents() {
    const eventBus = this.eventBus;
    eventBus.on(AUTH_EVENTS.LOGIN, () => this.isAuthorized = true);
    eventBus.on(AUTH_EVENTS.SIGN_UP, () => this.isAuthorized = true);
    eventBus.on(AUTH_EVENTS.LOGOUT, () => this.isAuthorized = false);
  }

  isAuthorized = false;
  userInfo: {} | null = null;

  // TODO: Явный костыль, надо как-то по-другому проверять авторизованность
  async init(callback: Function) {
    const response  = await new UserInfoAPI().request();
    this.isAuthorized = !response.error
    if (!response.error) {
      this.userInfo = response.data;
    }
    callback();
  }
};
