import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import ChatsController from '../../../modules/controllers/chats';
import SocketsController from '../../../modules/controllers/sockets.ctrl';


const chatsController = new ChatsController();
const socketsController = new SocketsController();

export default class ChatTape extends Block {
  constructor() {
    const events = [{
      type: 'click',
      cb: (evt: Event) => {
        if (evt.path && evt.path.some((elem: HTMLElement) => elem.classList && elem.classList.contains('chat-item'))) {
          const chatItemId = evt.path.find((elem: HTMLElement) => elem.classList.contains('chat-item')).id;
          chatsController.setActiveChat(chatItemId);
          socketsController.setActiveSocket(chatItemId);
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
