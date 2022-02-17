import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import ChatsController from '../../../modules/controllers/chats.ctrl';
import SocketsController from '../../../modules/controllers/sockets.ctrl';

const chatsController = new ChatsController();
const socketsController = new SocketsController();

export default class ChatTape extends Block {
  constructor() {
    const events = [{
      type: 'click',
      cb: (evt: Event) => {
        const chatItem = evt.target instanceof HTMLElement && evt.target.closest('.chat-item');
        if (chatItem instanceof HTMLElement && chatItem.dataset.id) {
          const chatItemId = chatItem.dataset.id;
          chatsController.setActiveChat(Number(chatItemId));
          socketsController.setActiveSocket(Number(chatItemId));
        }
      },
    }];
    const selectors = { chats: 'chatList', activeChat: 'activeChat' };
    const attributes = { class: 'chat-tape' };
    super('section', { events, attributes }, {}, selectors);
  }

  render() {
    return compileTemplate(this.props);
  }
}
