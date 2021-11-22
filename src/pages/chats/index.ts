import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import ChatInner from './chat-inner';
import ChatTape from './chat-tape';
import ChatsController from '../../modules/controllers/chats';

const chatsController = new ChatsController();

const createNewChatModal = () => {
  const formProps = {
    buttonText: 'Назвать',
    title: 'Назовите чат',
    submitCallback: (data: { [key: string]: any }) => {
      modal.hide();
      chatsController.createChat(data);
    },
  };

  const form = new Form(formProps, { fields: 'createChatFields' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

// TODO: Добавить в доку инфо про stopPropaganation и отслеживание ссылок
// TODO: Chat Item в отдельный компонент, чтобы не возиться с атрибутами

export default class Page extends Block {
  constructor(props = {}) {
    const createChatModal = createNewChatModal();
    const chatInner = new ChatInner();
    const chatTape = new ChatTape();
    const events = [{
      type: 'click',
      selector: '#create-chat',
      cb: () => createChatModal.show(),
    }];
    const selectors = { avatar: 'userInfo.avatar' };
    super('div', { ...props, events }, { createChatModal, chatInner, chatTape }, selectors);
  }

  render() {
    return compileTemplate(this.props);
  }
}
