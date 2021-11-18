import BaseController from './base.controller';
import { UserInfoUpdateAPI, UserPasswordUpdateAPI, UserAvatarUpdateAPI } from '../api/user.api';

const userInfoUpdateAPI = new UserInfoUpdateAPI();
const userPasswordUpdateAPI = new UserPasswordUpdateAPI();
const userAvatarUpdateAPI = new UserAvatarUpdateAPI();

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

  async updateUserAvatar(data: FormData) {
    // TODO: Загружать аватар под одинаковым именем
    const response = await userAvatarUpdateAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }
    
    this.mutations.setUserInfo(response.data);
    this.successModal.show();
  }
}
