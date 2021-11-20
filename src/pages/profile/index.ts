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

const createFormModal = (fieldsSelector: string, callback: Function) => {
  const props = {
    buttonText: 'Отправить',
    title: 'Изменить аватар',
    submitCallback: (data: { [key: string]: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      modal.hide();
      callback(data);
    },
  };

  const form = new Form(props, { fields: fieldsSelector });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

class Page extends Block {
  constructor(props = {}) {
    const changePasswordModal = createFormModal('changePasswordFields', userController.updateUserPassword.bind(userController));
    const changeInfoModal = createFormModal('changeInfoFields', userController.updateUserInfo.bind(userController));
    const changeAvatarModal = createFormModal('changeAvatarFields', userController.updateUserAvatar.bind(userController));

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
