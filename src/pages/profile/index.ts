import Block from '../../modules/block';
import Store from '../../modules/store';
import compileTemplate from './template.pug';
import AuthController from '../../modules/controllers/auth.controller';
import './styles.scss';

// TODO: Подумать что можно сделать с этими вечными объявлениями классов
const authController = new AuthController();

class Page extends Block {
  constructor(props = {}) {
    const userData = Store.getUserData();
    const avatar = Store.getUserAvatar();
    const events = [{
      type: 'click',
      selector: '#logout',
      cb: () => authController.logout()
    }];

    super('div', { ...props, userData, avatar, events });
    Store.on(Store.EVENTS.UPDATE_INFO, this.updateUserData.bind(this))
  }

  updateUserData() {
    const userData = Store.getUserData();
    const avatar = Store.getUserAvatar();
    this.setProps({
      userData,
      avatar
    });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
