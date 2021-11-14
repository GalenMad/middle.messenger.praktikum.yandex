import BaseAPI from './base.api';

export default class ChatsAPI extends BaseAPI {

  constructor() {
    super('/chats');
  }
}
