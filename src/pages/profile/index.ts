import Block from '../../modules/block';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import compileTemplate from './template.pug';
import AuthController from '../../modules/controllers/auth.controller';
import './styles.scss';

const authController = new AuthController();

const userData = [{
  name: 'Почта',
  value: 'pochta@yandex.ru',
}, {
  name: 'Логин',
  value: 'ivanivanov',
}, {
  name: 'Имя',
  value: 'Иван',
}, {
  name: 'Фамилия',
  value: 'Иванов',
}, {
  name: 'Имя в чате',
  value: 'Иван',
}, {
  name: 'Телефон',
  value: '+7 (909) 967 30 30',
}];

const events = [{
  type: 'click',
  selector: '#logout',
  cb: () => authController.logout()
}]

class Page extends Block {
  constructor(props = {}) {
    super('div', {...props, defaultAvatar, userData, events});
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
