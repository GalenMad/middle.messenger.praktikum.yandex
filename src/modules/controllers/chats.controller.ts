import BaseController from './base.controller';
import { ChatsAPI } from '../api/chats.api';

const chatsAPI = new ChatsAPI();

export default class ChatsController extends BaseController {
  async getChats(data?: { offset: number, limit: number, title: string }) {
    const response = await chatsAPI.request(data);
    if (response.error) {
      this.throwError(response);
    }

    this.mutations.setUserChats(response.data);
  }

  async createChat(data: { title: string }) {
    const response = await chatsAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    await this.getUserChats();
    this.successModal.show();
  }
}
