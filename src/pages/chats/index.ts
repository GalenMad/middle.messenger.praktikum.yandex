import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import ChatFooter from './chat-footer';
import ChatHeader from './chat-header';
import ChatTape from './chat-tape';
import ChatBody from './chat-body';
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
  constructor() {
    const createChatModal = createNewChatModal();
    const chatTape = new ChatTape();
    const chatHeader = new ChatHeader();
    const chatBody = new ChatBody();
    const chatFooter = new ChatFooter();
    const events = [{
      type: 'click',
      selector: '#create-chat',
      cb: () => createChatModal.show(),
    }];
    const children = {
      createChatModal, chatTape, chatHeader, chatBody, chatFooter,
    };
    super('div', { events }, children, { avatar: 'userInfo.avatar', activeChat: 'activeChat' });
  }

  render() {
    return compileTemplate(this.props);
  }
}
