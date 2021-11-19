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

export class UserInfoAPI extends UserAPI {
  async update(data: Record<string, unknown>): Promise<response> {
    const { headers } = this;
    return this.apiInstance.put('/profile', { data, headers }).then((res) => res);
  }
}

export class UserAvatarAPI extends UserAPI {
  async update(data: Record<string, unknown>): Promise<response> {
    return this.apiInstance.put('/profile/avatar', { data }).then((res) => res);
  }
}

export class UserPasswordAPI extends UserAPI {
  async update(data: Record<string, unknown>): Promise<response> {
    const { headers } = this;
    return this.apiInstance.put('/password', { data, headers }).then((res) => res);
  }
}
