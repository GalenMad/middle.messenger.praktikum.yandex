import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import ChatsController from '../../modules/controllers/chats.controller';

const chatsController = new ChatsController();

const createNewChatModal = () => {
  const formProps = {
    buttonText: 'Назвать',
    title: 'Назовите чат',
    submitCallback: (data) => {
      modal.hide();
      chatsController.createChat(data);
    },
  };

  const form = new Form(formProps, { fields: 'createChatFields' });
  const modal = new ModalWrapper({ content: form });
  return modal;
};

class Page extends Block {
  constructor(props = {}) {
    const createChatModal = createNewChatModal();
    const events = [{
      type: 'click',
      cb: (evt: Event) => {
        if (evt.target.id === 'create-chat') {
          evt.stopPropagation();
          createChatModal.show();
        } else if (evt.path.some((elem: HTMLElement) => elem.classList.contains('chat-item'))) {
          const chatItemId = evt.path.find((elem: HTMLElement) => elem.classList.contains('chat-item')).id;
          chatsController.setActiveChat(chatItemId)
        }
      },
    }];
    const selectors = { avatar: 'userInfo.avatar', chats: 'chatList', activeChat: 'activeChat' };
    super('div', { ...props, events }, { createChatModal }, selectors);
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
