import Block from '../../modules/block';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import compileTemplate from './template.pug';
import AuthController from '../../modules/controllers/auth.controller';
import UserController from '../../modules/controllers/user.controller';
import './styles.scss';

// TODO: Подумать что можно сделать с этими вечными объявлениями классов
const authController = new AuthController();
const userController = new UserController();

const createChangeAvatarModal = () => {
  const props = {
    buttonText: 'Отправить',
    title: 'Изменить аватар',
    submitCallback: (data) => {
      modal.hide();
      userController.updateUserAvatar(data);
    },
  };

  const form = new Form(props, { fields: 'changeAvatarFields' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

const createChangePasswordModal = () => {
  const props = {
    buttonText: 'Отправить',
    title: 'Изменить пароль',
    submitCallback: (data) => {
      modal.hide();
      userController.updateUserPassword(data);
    },
  };

  const form = new Form(props, { fields: 'changePasswordFields' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

const createChangeInfoModal = () => {
  const props = {
    buttonText: 'Отправить',
    title: 'Изменить информацию',
    // TODO: Добавить валидацию на данные, полностью идентичные текущим
    submitCallback: (data) => {
      modal.hide();
      userController.updateUserInfo(data);
    },
  };

  // TODO: Прикрутить чистку валидации на закрытие модалки
  const form = new Form(props, { fields: 'changeInfoFields' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

class Page extends Block {
  constructor(props = {}) {
    const changePasswordModal = createChangePasswordModal();
    const changeInfoModal = createChangeInfoModal();
    const changeAvatarModal = createChangeAvatarModal();

    const events = [{
      type: 'click',
      selector: '#logout',
      cb: () => authController.logout(),
    }, {
      type: 'click',
      selector: '#change-password',
      cb: () => changePasswordModal.show(),
    }, {
      type: 'click',
      selector: '#change-info',
      cb: () => changeInfoModal.show(),
    }, {
      type: 'click',
      selector: '#change-avatar',
      cb: () => changeAvatarModal.show(),
    }];

    super('div', { ...props, events }, { changePasswordModal, changeInfoModal, changeAvatarModal }, { avatar: 'userInfo.avatar', userName: 'userInfo.first_name', userData: 'userProfile' });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
