/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
import BaseAPI from './base';

class ChatsBaseAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }
}

export class ChatsAPI extends ChatsBaseAPI {
  async request(data?: { offset: number, limit: number, title: string }): Promise<RequestResponse> {
    return this.apiInstance.get('/', { data }).then((res) => res);
  }

  // TODO: Создание чата точно апдейт?
  async update(data: { title: string }): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.post('/', { data, headers }).then((res) => res);
  }

  async delete(data: { chatId: number }): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.delete('/', { data, headers }).then((res) => res);
  }
}

export class ChatsUsersAPI extends ChatsBaseAPI {
  async request(id: number): Promise<RequestResponse> {
    return this.apiInstance.get(`/${id}/users`).then((res) => res);
  }

  async update(data: { chatId: number, users: number[] }): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.put('/users', { data, headers }).then((res) => res);
  }

  async delete(data: { chatId: number, users: number[] }): Promise<RequestResponse> {
    const { headers } = this;
    return this.apiInstance.delete('/users', { data, headers }).then((res) => res);
  }
}
