import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import ChatsController from '../../../modules/controllers/chats';

const chatsController = new ChatsController();

export default class ChatTape extends Block {
  constructor() {
    const events = [{
      type: 'click',
      cb: (evt: Event) => {
        if (evt.path && evt.path.some((elem: HTMLElement) => elem.classList && elem.classList.contains('chat-item'))) {
          const chatItemId = evt.path.find((elem: HTMLElement) => elem.classList.contains('chat-item')).id;
          chatsController.setActiveChat(chatItemId);
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
