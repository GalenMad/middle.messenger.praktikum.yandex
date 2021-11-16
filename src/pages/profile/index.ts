import Block from '../../modules/block';
import Store from '../../modules/store';
import compileTemplate from './template.pug';
import AuthController from '../../modules/controllers/auth.controller';
import ModalWrapper from '../../components/modal-wrapper';
import allFields from '../../data/fields';
import Form from '../../components/form';
import './styles.scss';

// TODO: Подумать что можно сделать с этими вечными объявлениями классов
const authController = new AuthController();
const fields = allFields.filter((field) => ['login', 'password'].includes(field.name));

class Page extends Block {
  constructor(props = {}) {
    const content = new Form({ fields, buttonText: 'Отправить' })
    const changePasswordModal = new ModalWrapper({ content });

    const userData = Store.getUserData();
    const userName = Store.getUserName();
    const avatar = Store.getUserAvatar();

    const events = [{
      type: 'click',
      selector: '#logout',
      cb: () => authController.logout()
    }, {
      type: 'click',
      selector: '#change-password',
      cb: () => changePasswordModal.show()
    }];

    super('div', { ...props, userData, userName, avatar, events }, { changePasswordModal });
    Store.on(Store.EVENTS.UPDATE_INFO, this.updateUserData.bind(this))
  }

  updateUserData() {
    const userData = Store.getUserData();
    const userName = Store.getUserName();
    const avatar = Store.getUserAvatar();
    this.setProps({
      userName,
      userData,
      avatar
    });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
