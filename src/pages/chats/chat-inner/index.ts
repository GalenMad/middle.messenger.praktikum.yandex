import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class ChatInner extends Block {
  constructor(props?: { [key: string]: any }) {
    const attributes = { class: 'chat' };
    super('div', { attributes, ...props }, {}, { chat: 'activeChat' });
  }

  render() {
    return compileTemplate(this.props);
  }
}
