import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class ChatBody extends Block {
  constructor() {
    const attributes = { class: 'chat_body' };
    const selectors = {
      chat: 'activeChat', chatsUsers: 'chatsUsers', messages: 'messages', userId: 'userInfo.id',
    };
    super('section', { attributes }, {}, selectors);
    // TODO: Выход из активного чата на ESC
  }

  render() {
    return compileTemplate(this.props);
  }
}
