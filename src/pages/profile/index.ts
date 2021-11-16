import Store from '../../modules/store';
import Block from '../../modules/block';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import changePasswordFields from '../../data/change-password-fields';
import compileTemplate from './template.pug';
import AuthController from '../../modules/controllers/auth.controller';
import UserController from '../../modules/controllers/user.controller';
import './styles.scss';

// TODO: Подумать что можно сделать с этими вечными объявлениями классов
const authController = new AuthController();
const userController = new UserController();

class Page extends Block {
  constructor(props = {}) {

    const changePasswordFormProps = {
      fields: changePasswordFields,
      buttonText: 'Отправить',
      title: 'Изменить пароль',
      submitCallback: (data) => {
        changePasswordModal.hide();
        userController.updateUserPassword(data);
      }
    }

    const changePasswordModal = new ModalWrapper({
      content: new Form(changePasswordFormProps)
    });

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
