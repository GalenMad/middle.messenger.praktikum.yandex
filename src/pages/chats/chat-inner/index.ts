import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import Form from '../../../components/form';
import ModalWrapper from '../../../components/modal-wrapper';
import ChatsController from '../../../modules/controllers/chats';

const chatsController = new ChatsController();

const createAddModal = () => {
  const formProps = {
    buttonText: 'Добавить',
    title: 'Добавить пользователя',
    submitCallback: (data) => {
      const { login } = data;
      const { id } = form.props.chat;
      modal.hide();
      console.log(login, id);
      chatsController.addUserByLogin(login, id);
    },
  };

  const form = new Form(formProps, { fields: 'addUserFields', chat: 'activeChat' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

const createRemoveModal = () => {
  const formProps = {
    buttonText: 'Удалить',
    title: 'Удалить пользователя',
    submitCallback: (data) => {
      const { login } = data;
      const { id } = form.props.chat;
      modal.hide();
      chatsController.removeUserByLogin(login, id);
    },
  };

  const form = new Form(formProps, { fields: 'addUserFields', chat: 'activeChat' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

export default class ChatInner extends Block {
  constructor(props?: { [key: string]: any }) {
    const attributes = { class: 'chat' };
    const addUserModal = createAddModal();
    const removeUserModal = createRemoveModal();
    const selectors = { chat: 'activeChat', chatsUsers: 'chatsUsers' };
    const events = [{
      type: 'click',
      selector: '#add-user',
      cb: () => addUserModal.show(),
    }, {
      type: 'click',
      selector: '#remove-user',
      cb: () => removeUserModal.show(),
    }];
    super('div', { attributes, events, ...props }, { addUserModal, removeUserModal }, selectors);
  }

  render() {
    return compileTemplate(this.props);
  }
}
