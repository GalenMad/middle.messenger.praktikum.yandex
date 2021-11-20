// eslint-disable-next-line max-classes-per-file
import BaseAPI from './base.api';

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }
}

export class UserInfoAPI extends UserAPI {
  async update(data: QueryData): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.put('/profile', { data, headers }).then((res) => res);
  }
}

export class UserAvatarAPI extends UserAPI {
  async update(data: FormData): Promise<RequestResponse> {
    return this.apiInstance.put('/profile/avatar', { data }).then((res) => res);
  }
}

export class UserPasswordAPI extends UserAPI {
  async update(data: QueryData): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.put('/password', { data, headers }).then((res) => res);
  }
}
