import Block from '../../modules/block';
import Store from '../../modules/store';
import avatar from '../../assets/images/default-avatar.svg';
import compileTemplate from './template.pug';
import './styles.scss';

const activeChat = {
  "id": 123,
  "title": "my-chat",
  "avatar": avatar,
  "unread_count": 15,
  "last_message": {
    "user": {
      "first_name": "Petya",
      "second_name": "Pupkin",
      "avatar": "/path/to/avatar.jpg",
      "email": "my@email.com",
      "login": "userLogin",
      "phone": "8(911)-222-33-22"
    },
    "time": "2020-01-02T14:22:22.000Z",
    "content": "this is message content"
  }
};

const messages: Array<any> = [];

for (let i = 0; i < 10; i += 1) {
  messages.push({
    content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.',
    time: '10:49',
    my: i % 3 === 0
  });
};

console.log(messages);

class Page extends Block {
  constructor(props = {}) {
    const avatar = Store.getUserAvatar();
    super('div', { ...props, avatar, messages, activeChat });
    Store.on(Store.EVENTS.UPDATE_INFO, () => this.setProps({avatar: Store.getUserAvatar()}))
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
