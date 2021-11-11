import HTTP from '../fetch';
import BaseAPI from './base.api';

const authAPIInstance = new HTTP('/chats');

export class LoginAPI extends BaseAPI {
  create() {

  }
  
  request() {
    return authAPIInstance;
  }
}

export class LogoutAPI extends BaseAPI {
  request() {
    return authAPIInstance;
  }
}

export class UserInfoAPI extends BaseAPI {
  request() {
    return authAPIInstance;
  }
}
