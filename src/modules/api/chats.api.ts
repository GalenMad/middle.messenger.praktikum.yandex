import HTTP from '../fetch';
import BaseAPI from './base.api';

const chatsAPIInstance = new HTTP('/chats');

export default class ChatsAPI extends BaseAPI {

  create() {
    return chatsAPIInstance;
  }

  request() {
    return chatsAPIInstance;
  }
}
