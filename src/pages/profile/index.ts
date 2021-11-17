import Store from '../../modules/store';
import Block from '../../modules/block';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import changePasswordFields from '../../data/change-password-fields';
import changeInfoFields from '../../data/change-info-fields';
import compileTemplate from './template.pug';
import AuthController from '../../modules/controllers/auth.controller';
import UserController from '../../modules/controllers/user.controller';
import './styles.scss';

// TODO: Подумать что можно сделать с этими вечными объявлениями классов
const authController = new AuthController();
const userController = new UserController();

const createChangePasswordModal = () => {
  const changePasswordFormProps = {
    fields: changePasswordFields,
    buttonText: 'Отправить',
    title: 'Изменить пароль',
    submitCallback: (data) => {
      changePasswordModal.hide();
      userController.updateUserPassword(data);
    }
  }

  const changePasswordForm = new Form(changePasswordFormProps);
  const changePasswordModal = new ModalWrapper({
    content: changePasswordForm
  });

  return changePasswordModal;
}


const createChangeInfoModal = () => {
  const rawData = Store.getRawUserData();
  const changeInfoFormProps = {
    fields: changeInfoFields(rawData),
    buttonText: 'Отправить',
    title: 'Изменить информацию',
    submitCallback: (data) => {
      changeInfoModal.hide();
      userController.updateUserInfo(data);
    }
  }

  // TODO: Прикрутить чистку валидации на закрытие модалки
  const changeInfoForm = new Form(changeInfoFormProps);
  const changeInfoModal = new ModalWrapper({ content: changeInfoForm });

  Store.on(Store.EVENTS.UPDATE_INFO, () => {
    const rawData = Store.getRawUserData();
    // TODO: На этом моменте создаются новые FormGroup, пофиксить
    changeInfoForm.setProps({
      fields: changeInfoFields(rawData),
    });
  });

  return changeInfoModal;
}

class Page extends Block {
  constructor(props = {}) {
    const changePasswordModal = createChangePasswordModal();
    const changeInfoModal = createChangeInfoModal();

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
    }, {
      type: 'click',
      selector: '#change-info',
      cb: () => changeInfoModal.show()
    }];

    super('div', { ...props, userData, userName, avatar, events }, { changePasswordModal, changeInfoModal });
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
