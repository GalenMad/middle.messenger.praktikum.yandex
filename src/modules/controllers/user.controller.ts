import BaseController from './base.controller';
import { UserInfoAPI, UserPasswordAPI, UserAvatarAPI } from '../api/user.api';

const userInfoAPI = new UserInfoAPI();
const userPasswordAPI = new UserPasswordAPI();
const userAvatarAPI = new UserAvatarAPI();

export default class UserController extends BaseController {
  async updateUserInfo(data: QueryData) {
    const response = await userInfoAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }
    // TODO: Кривоватая конструкция из-за требований TS
    if (response.data && typeof response.data !== 'string') {
      this.mutations.setUserInfo(response.data);
      this.successModal.show();
    }
  }

  async updateUserPassword(data: QueryData) {
    const response = await userPasswordAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    this.successModal.show();
  }

  async updateUserAvatar(data: QueryData) {
    const formData = new FormData();
    formData.append('avatar', data.avatar);
    const response = await userAvatarAPI.update(formData);
    if (response.error) {
      this.throwError(response);
    }
    // TODO: Кривоватая конструкция из-за требований TS
    if (response.data && typeof response.data !== 'string') {
      this.mutations.setUserInfo(response.data);
      this.successModal.show();
    }
  }
}
