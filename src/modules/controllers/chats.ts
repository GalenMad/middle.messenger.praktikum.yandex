import BaseController from './base';
import { ChatsAPI, ChatsUsersAPI } from '../api/chats';
import { UserSearchAPI } from '../api/user';

const chatsAPI = new ChatsAPI();
const chatsUsersAPI = new ChatsUsersAPI();
const userSearchAPI = new UserSearchAPI();

export default class ChatsController extends BaseController {
  async setActiveChat(chatId: number) {
    await this.getUsers(chatId);
    // TODO: Придумать как отслеживать, чтобы не дёргать каждый раз
    this.mutations.setActiveChat(chatId);
  }

  async getChats(data?: { offset: number, limit: number, title: string }) {
    const response = await chatsAPI.request(data);
    if (response.error) {
      this.throwError(response);
    }
    // TODO: Подумать над этим типом
    // У меня везде предполагается объект, а тут массив
    // Везде прикручивать проверку на массив не вариант
    this.mutations.setUserChats(response.data);
  }

  async createChat(data: { title: string }) {
    const response = await chatsAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    await this.getChats();
    this.successModal.show();
  }

  async getUsers(chatId: number) {
    const response = await chatsUsersAPI.request(chatId);
    if (response.error) {
      this.throwError(response);
    }
    this.mutations.setChatUsers(chatId, response.data);
  }

  async addUsers(data: { chatId: number, users: number[] }) {
    const response = await chatsUsersAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }
  }

  async removeUsers(data: { chatId: number, users: number[] }) {
    const response = await chatsUsersAPI.delete(data);
    if (response.error) {
      this.throwError(response);
    }
  }

  // TODO: Удалять нужно через локальный поиск логинов, иначе бесполезно
  // TODO: Выкатить геттеры для стора
  async removeUserByLogin(login: string, chatId: number) {
    const response = await userSearchAPI.request({ login });
    if (response.error) {
      this.throwError(response);
    }

    const userList = response.data || [];
    // eslint-disable-next-line max-len
    const filteredUserList = userList.length === 1 ? userList : userList.filter((user) => user.login === login);

    // TODO: Расширить логику информационных сообщений
    if (!userList.length || !filteredUserList.length || filteredUserList.length > 1) {
      this.throwError({ data: 'Нужно близкое, либо точное совпадение', status: 'Нет совпадений' });
    } else {
      const userId = filteredUserList[0].id;
      await this.removeUsers({ chatId, users: [userId] });
      await this.getUsers(chatId);
    }
  }

  async addUserByLogin(login: string, chatId: number) {
    const response = await userSearchAPI.request({ login });
    if (response.error) {
      this.throwError(response);
    }

    const userList = response.data || [];
    // eslint-disable-next-line max-len
    const filteredUserList = userList.length === 1 ? userList : userList.filter((user) => user.login === login);

    // TODO: Расширить логику информационных сообщений
    if (!userList.length || !filteredUserList.length || filteredUserList.length > 1) {
      this.throwError({ data: 'Нужно близкое, либо точное совпадение', status: 'Нет совпадений' });
    } else {
      const userId = filteredUserList[0].id;
      await this.addUsers({ chatId, users: [userId] });
      await this.getUsers(chatId);
    }
  }
}
