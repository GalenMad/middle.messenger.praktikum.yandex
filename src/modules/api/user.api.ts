import BaseAPI from './base.api';

interface response {
  error: boolean,
  status: number | string,
  data: { reason?: string } | string | null
}

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }
}

export class UserInfoUpdateAPI extends UserAPI {
  async update(data: Record<string, unknown>): Promise<response> {
    const headers = this.headers;
    return this.apiInstance.put('/profile', { data, headers }).then(res => res);
  }
}

