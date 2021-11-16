import BaseController from './base.controller';
import { UserInfoUpdateAPI } from '../api/user.api';

const userInfoUpdateAPI = new UserInfoUpdateAPI();

export default class UserController extends BaseController {
  async updateUserInfo(data: Record<string, string | number>) {
    const response = await userInfoUpdateAPI.update(data);
    if (response.error) {
      this.throwError('loginAPI', response);
    }

    this.mutations.setUserInfo(response.data);
  }
}
