import BaseController from './base.controller';
import { UserInfoUpdateAPI, UserPasswordUpdateAPI } from '../api/user.api';

const userInfoUpdateAPI = new UserInfoUpdateAPI();
const userPasswordUpdateAPI = new UserPasswordUpdateAPI();

export default class UserController extends BaseController {
  async updateUserInfo(data: Record<string, string | number>) {
    const response = await userInfoUpdateAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    this.mutations.setUserInfo(response.data);
    this.successModal.show();
  }

  async updateUserPassword(data: Record<string, string | number>) {
    const response = await userPasswordUpdateAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    this.successModal.show();
  }
}
