import BaseController from './base.ctrl';
import { ChatsTokenAPI } from '../api/chats.api';

// TODO: Разделить логику в этом модуле
const chatsTokenAPI = new ChatsTokenAPI();

export default class ChatsController extends BaseController {
  async setActiveSocket(id: number) {
    // TODO: Держать активным только один сокет, при выходе из чата закрывать его
    // При открытом сокете новые сообщения сразу отмечаются прочитанными
    if (!this.getters.checkSocket(id)) {
      await this.createSocket(id);
    }
    this.mutations.setActiveSocket(id);
  }

  async createSocket(chatId: number) {
    const userId = this.getters.userId();
    const response = await chatsTokenAPI.request(chatId);
    if (response.error) {
      this.throwError(response);
    }

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${response.data?.token}`);
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

    socket.onerror = (evt: MessageEvent) => {
      this.throwError({ status: `Ошибка в сокете ${chatId}`, data: evt.message });
    };
  }

  async sendMessage(content: string) {
    const socket = this.getters.getActiveSocket();
    socket.send(JSON.stringify({
      content,
      type: 'message',
    }));
  }
}
