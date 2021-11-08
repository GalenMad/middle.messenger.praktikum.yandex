import Block from '../../modules/block';
import avatar from '../../assets/images/default-avatar.svg';
import compileTemplate from './template.pug';
import './styles.scss';

const chats: Array<any> = [];

for (let i = 0; i < 14; i += 1) {
  chats.push({
    id: 123,
    title: 'Андрей',
    avatar,
    unread_count: i + 2 * i + 1,
    last_message: {
      user: {
        first_name: 'Petya',
        second_name: 'Pupkin',
        avatar,
        email: 'my@email.com',
        login: 'userLogin',
        phone: '8(911)-222-33-22',
      },
      time: '10:20',
      content: 'И Human Interface Guidelines и Material Design рекомендуют не выпендриваться…',
    },
  });
}

class Page extends Block {
  constructor(props = {}) {
    super('div', { ...props, chats, userAvatar: avatar });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
