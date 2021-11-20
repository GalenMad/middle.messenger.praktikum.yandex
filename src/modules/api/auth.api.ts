/* eslint-disable max-classes-per-file */
import BaseAPI from './base.api';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }
}

export class LoginAPI extends AuthAPI {
  async create(data: QueryData): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.post('/signup', { data, headers }).then((res) => res);
  }

  async request(data: QueryData): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.post('/signin', { data, headers }).then((res) => res);
  }
}

export class LogoutAPI extends AuthAPI {
  async request(): Promise<RequestResponse> {
    return this.apiInstance.post('/logout').then((res) => res);
  }
}

export class UserInfoAPI extends AuthAPI {
  async request(noCache: boolean): Promise<RequestResponse> {
    const headers = noCache ? { 'Cache-Control': 'no-cache' } : undefined;
    return this.apiInstance.get('/user', { headers }).then((res) => res);
  }
}
