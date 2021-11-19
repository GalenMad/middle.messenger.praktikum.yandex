import BaseController from './base.controller';
import { UserInfoAPI, UserPasswordAPI, UserAvatarAPI } from '../api/user.api';

const userInfoAPI = new UserInfoAPI();
const userPasswordAPI = new UserPasswordAPI();
const userAvatarAPI = new UserAvatarAPI();

export default class UserController extends BaseController {
  async updateUserInfo(data: Record<string, string | number>) {
    const response = await userInfoAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    this.mutations.setUserInfo(response.data);
    this.successModal.show();
  }

  async updateUserPassword(data: Record<string, string | number>) {
    const response = await userPasswordAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    this.successModal.show();
  }

  async updateUserAvatar(data: FormData) {
    // TODO: Загружать аватар под одинаковым именем
    const response = await userAvatarAPI.update(data);
    console.log('updateUserAvatar', response);
    if (response.error) {
      this.throwError(response);
    }
    
    this.mutations.setUserInfo(response.data);
    this.successModal.show();
  }
}
