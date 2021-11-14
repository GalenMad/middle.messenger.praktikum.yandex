import BaseAPI from './base.api';

interface response {
  error: boolean,
  status: number | string,
  data: { reason?: string } | string | null
}

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }
}

export class LoginAPI extends AuthAPI {
  async create(data: Record<string, unknown>): Promise<response> {
    const headers = this.headers;
    return this.apiInstance.post('/signup', { data, headers }).then(res => res);
  }

  async request(data: Record<string, unknown>): Promise<response> {
    const headers = this.headers;
    return this.apiInstance.post('/signin', { data, headers }).then(res => res);
  }
}

export class LogoutAPI extends AuthAPI {
  async request(): Promise<response> {
    return this.apiInstance.post('/logout').then(res => res);
  }
}

export class UserInfoAPI extends AuthAPI {
  async request(): Promise<response> {
    return this.apiInstance.get('/user').then(res => res);
  }
}
