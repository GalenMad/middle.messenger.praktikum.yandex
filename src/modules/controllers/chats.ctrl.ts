import BaseController from './base.ctrl';
import { ChatsAPI, ChatsUsersAPI } from '../api/chats.api';
import { UserSearchAPI } from '../api/user.api';

const chatsAPI = new ChatsAPI();
const chatsUsersAPI = new ChatsUsersAPI();
const userSearchAPI = new UserSearchAPI();

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default class ChatsController extends BaseController {
  async setActiveChat(chatId: number) {
    // TODO: Кэшировать юзеров, обновлять их слушая сокет (Но сервер не оповещает о них, кстати)
    await this.getUsers(chatId);
    this.mutations.setActiveChat(chatId);
  }

  // TODO: Ужасное решение, но пока нет идей как сделать лучше
  async launchUpdateChatListTimeout() {
    if (this.getters.isAuthorized()) {
      await delay();
    }
    if (this.getters.isAuthorized()) {
      await this.setUserChatList();
    }
    if (this.getters.isAuthorized()) {
      this.launchUpdateChatListTimeout();
    }
  }

  async setUserChatList(data?: { offset: number, limit: number, title: string }) {
    const response = await chatsAPI.request(data);
    if (response.error) {
      this.throwError(response);
    }
    if (Array.isArray(response.data)) {
      this.mutations.setUserChats(response.data);
    }
  }

  async createChat(data: { title: string }) {
    const response = await chatsAPI.update(data);
    if (response.error) {
      this.throwError(response);
    }

    await this.setUserChatList();
  }

  async getUsers(chatId: number) {
    const response = await chatsUsersAPI.request(chatId);
    if (response.error) {
      this.throwError(response);
    }
    if (Array.isArray(response.data)) {
      this.mutations.setChatUsers(chatId, response.data);
    }
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

  // TODO: Удалять нужно через локальный поиск логинов + доп. проверка через сервер
  async removeUserByLogin(login: string, chatId: number) {
    const response = await userSearchAPI.request({ login });
    if (response.error) {
      this.throwError(response);
    }

    const userList = (typeof response.data !== 'string' && response.data) || [];
    // eslint-disable-next-line max-len
    const filteredUserList = userList.length === 1 ? userList : userList.filter((user: { login: string }) => user.login === login);

    // TODO: Расширить логику информационных сообщений
    if (!userList.length || !filteredUserList.length || filteredUserList.length > 1) {
      this.throwError({ data: 'Нужно близкое, либо точное совпадение', status: 'Нет совпадений' });
    } else {
      const userId = filteredUserList[0].id;
      await this.removeUsers({ chatId, users: [userId] });
      await this.getUsers(chatId);
    }
  }

  // TODO: DRY
  async addUserByLogin(login: string, chatId: number) {
    const response = await userSearchAPI.request({ login });
    if (response.error) {
      this.throwError(response);
    }

    const userList = (typeof response.data !== 'string' && response.data) || [];
    // eslint-disable-next-line max-len
    const filteredUserList = userList.length === 1 ? userList : userList.filter((user: { login: string }) => user.login === login);

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
