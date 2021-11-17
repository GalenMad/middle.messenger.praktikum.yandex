import Store from '../../modules/store';
import Block from '../../modules/block';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import { fields } from '../../data';
import compileTemplate from './template.pug';
import AuthController from '../../modules/controllers/auth.controller';
import UserController from '../../modules/controllers/user.controller';
import './styles.scss';

const { changePasswordFields, changeInfoFields, changeAvatarFields } = fields;

// TODO: Подумать что можно сделать с этими вечными объявлениями классов
const authController = new AuthController();
const userController = new UserController();

const createChangeAvatarModal = () => {
  const changeAvatarFormProps = {
    fields: changeAvatarFields,
    buttonText: 'Отправить',
    title: 'Изменить аватар',
    submitCallback: () => {
      const formData = new FormData(changeAvatarForm.element);
      changeAvatarModal.hide();
      userController.updateUserAvatar(formData);
    }
  }

  const changeAvatarForm = new Form(changeAvatarFormProps);
  const changeAvatarModal = new ModalWrapper({
    content: changeAvatarForm
  });

  return changeAvatarModal;
}

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
    const changeAvatarModal = createChangeAvatarModal();

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
    }, {
      type: 'click',
      selector: '#change-avatar',
      cb: () => changeAvatarModal.show()
    }];

    super('div', { ...props, userData, userName, avatar, events }, { changePasswordModal, changeInfoModal, changeAvatarModal });
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
