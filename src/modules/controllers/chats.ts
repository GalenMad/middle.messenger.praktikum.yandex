import BaseController from './base';
import { ChatsAPI, ChatsUsersAPI, ChatsTokenAPI } from '../api/chats';
import { UserSearchAPI } from '../api/user';

// TODO: Разделить логику в этом модуле, выглядит как помойка

const chatsAPI = new ChatsAPI();
const chatsUsersAPI = new ChatsUsersAPI();
const userSearchAPI = new UserSearchAPI();
const chatsTokenAPI = new ChatsTokenAPI();

export default class ChatsController extends BaseController {
  async setActiveChat(chatId: number) {
    // TODO: Кэшировать юзеров, обновлять их слушая сокет

    if (!this.getters.checkSocket(chatId)) {
      await this.createSocket(chatId);
    }
    await this.getUsers(chatId);
    this.mutations.setActiveChat(chatId);
  }

  async createSocket(chatId: number) {
    const userId = this.getters.userId();
    const response = await chatsTokenAPI.request(chatId);
    if (response.error) {
      this.throwError(response);
    }

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${response.data.token}`);
    this.mutations.addSocket(chatId, socket);

    // TODO: Подгрузка большего числа сообщений на скролл
    socket.onopen = () => {
      socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));

      (function ping() {
        setTimeout(() => {
          socket.send(JSON.stringify({ type: 'ping' }));
          ping();
        }, 3000);
      }());
    };

    socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      // TODO: Как-то более адекватно получать список сообщений
      if (Array.isArray(data)) {
        this.mutations.setMessages(chatId, data);
      } else if (data.type === 'message') {
        this.mutations.addMessage(chatId, data);
      }
    };

    // TODO: Обработка обрыва во время активности чата
    socket.onclose = () => {
      this.mutations.removeSocket(chatId);
    };

    socket.onerror = ({ message }) => {
      this.throwError({ status: `Ошибка в сокете ${chatId}`, data: message });
    };
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

  async sendMessage(content: string) {
    const socket = this.getters.getActiveSocket();
    socket.send(JSON.stringify({
      content,
      type: 'message',
    }));
  }

  // TODO: Удалять нужно через локальный поиск логинов + доп. проверка через сервер
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
