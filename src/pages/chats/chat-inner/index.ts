import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import Form from '../../../components/form';
import ModalWrapper from '../../../components/modal-wrapper';
import ChatsController from '../../../modules/controllers/chats';

const chatsController = new ChatsController();

const createModal = (props: { button: string, title: string }, callback: Function) => {
  const formProps = {
    buttonText: props.button,
    title: props.title,
    submitCallback: (data: { login: string }) => {
      const { login } = data;
      const { id } = form.props.chat;
      callback(login, id);
      modal.hide();
    },
  };

  const form = new Form(formProps, { fields: 'addUserFields', chat: 'activeChat' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

export default class ChatInner extends Block {
  constructor(props?: { [key: string]: any }) {
    const attributes = { class: 'chat' };
    const addUserModal = createModal({ title: 'Добавить пользователя', button: 'Добавить' }, chatsController.addUserByLogin.bind(chatsController));
    const removeUserModal = createModal({ title: 'Удалить пользователя', button: 'Удалить' }, chatsController.removeUserByLogin.bind(chatsController));
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
