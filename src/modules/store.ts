import { UserInfoAPI } from './api/auth.api';
let storeInstance: null | Store = null;

export default class Store {
  constructor() {
    if (storeInstance) {
      return storeInstance;
    }

    storeInstance = this;
  }

  isAuthorized = false;

  async init(callback: Function) {
    await new UserInfoAPI().request().then(res => this.isAuthorized = !res.error);
    callback();
  }
};
