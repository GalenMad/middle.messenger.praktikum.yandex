import BaseAPI from './base.api';

interface response {
  error: boolean,
  status: number | string,
  data: { reason?: string } | string | null
}

class ChatsBaseAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }
}

export class ChatsAPI extends ChatsBaseAPI {
  async request(data?: { offset: number, limit: number, title: string }): Promise<response> {
    return this.apiInstance.get('/', { data }).then((res) => res);
  }

  // TODO: Создание чата точно апдейт?
  async update(data: { title: string }): Promise<response> {
    const { headers } = this;
    return this.apiInstance.post('/', { data, headers }).then((res) => res);
  }

  async delete(data: { chatId: number }): Promise<response> {
    const { headers } = this;
    return this.apiInstance.delete('/', { data, headers }).then((res) => res);
  }
}
