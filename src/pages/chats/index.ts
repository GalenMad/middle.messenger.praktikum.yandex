import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import Form from '../../components/form';
import ModalWrapper from '../../components/modal-wrapper';
import ChatsController from '../../modules/controllers/chats.controller';
import { fields } from '../../data';

const chatsController = new ChatsController();
const { createChatFields } = fields

const createNewChatModal = () => {
  const formProps = {
    fields: createChatFields,
    buttonText: 'Назвать',
    title: 'Назовите чат',
    submitCallback: (data) => {
      modal.hide();
      chatsController.createChat(data);
    }
  }

  const form = new Form(formProps);
  const modal = new ModalWrapper({ content: form });
  return modal;
}

class Page extends Block {
  constructor(props = {}) {
    const createChatModal = createNewChatModal();
    const events = [{
      type: 'click',
      selector: '#create-chat',
      cb: (evt) => {
        evt.stopPropagation();
        createChatModal.show();
      }
    }];
    super('div', { ...props,  events }, { createChatModal }, { avatar: 'userInfo.avatar', chats: 'chatList' });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
