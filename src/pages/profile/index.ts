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
    submitCallback: () => {
      const formData = new FormData(form.element);
      modal.hide();
      userController.updateUserAvatar(formData);
    },
  };

  const form = new Form(props, { fields: 'changeAvatarFields' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

const createChangePasswordModal = () => {
  const changePasswordFormProps = {
    buttonText: 'Отправить',
    title: 'Изменить пароль',
    submitCallback: (data) => {
      changePasswordModal.hide();
      userController.updateUserPassword(data);
    },
  };

  const changePasswordForm = new Form(changePasswordFormProps, { fields: 'changePasswordFields' });
  const changePasswordModal = new ModalWrapper({
    content: changePasswordForm,
  });

  return changePasswordModal;
};

const createChangeInfoModal = () => {
  const changeInfoFormProps = {
    buttonText: 'Отправить',
    title: 'Изменить информацию',
    // TODO: Добавить валидацию на данные, полностью идентичные текущим
    submitCallback: (data) => {
      changeInfoModal.hide();
      userController.updateUserInfo(data);
    },
  };

  // TODO: Прикрутить чистку валидации на закрытие модалки
  const changeInfoForm = new Form(changeInfoFormProps, { fields: 'changeInfoFields' });
  const changeInfoModal = new ModalWrapper({ content: changeInfoForm });
  return changeInfoModal;
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
