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

  setAuthorizationStatus(status: boolean) {
    this.isAuthorized = status;
  }

  _registerEvents() {
    const eventBus = this.eventBus;
    Object.values(AUTH_EVENTS).forEach((event) => {
      eventBus.on(event, this.setAuthorizationStatus.bind(this));
    })
  }

  isAuthorized = false;

  // TODO: Явный костыль, надо как-то по-другому проверять авторизованность
  async init(callback: Function) {
    await new UserInfoAPI().request().then(res => this.isAuthorized = !res.error);
    callback();
  }
};
