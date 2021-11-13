import HTTP from '../fetch';
import BaseAPI from './base.api';

const authAPIInstance = new HTTP('/auth');
const headers = { 'content-type': 'application/json' };

interface response {
  error: boolean,
  status: number | string,
  data: {} | string | null
}

export class LoginAPI extends BaseAPI {
  async create(data: Record<string, unknown>): Promise<response> {
    return authAPIInstance.post('/signup', { data, headers }).then(res => res);
  }

  async request(data: Record<string, unknown>): Promise<response> {
    return authAPIInstance.post('/signin', { data, headers }).then(res => res);
  }
}

export class LogoutAPI extends BaseAPI {
  async request(): Promise<response> {
    return authAPIInstance.post('/logout').then(res => res);
  }
}

export class UserInfoAPI extends BaseAPI {
  async request(): Promise<response> {
    return authAPIInstance.get('/user').then(res => res);
  }
}
