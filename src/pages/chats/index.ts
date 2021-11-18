import Block from '../../modules/block';
import Store from '../../modules/store';
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
  const modal = new ModalWrapper({
    content: form
  });

  return modal;
}

class Page extends Block {
  constructor(props = {}) {
    const avatar = Store.getUserAvatar();
    const chats = Store.getUserChats();
    const createChatModal = createNewChatModal();
    const events = [{
      type: 'click',
      selector: '#create-chat',
      cb: (evt) => { 
        evt.stopPropagation();
        createChatModal.show()
      }
    }];
    super('div', { ...props, avatar, chats, events }, { createChatModal });
    Store.on(Store.EVENTS.UPDATE_INFO, this.updateUserData.bind(this))
  }

  updateUserData() {
    const avatar = Store.getUserAvatar();
    const chats = Store.getUserChats();
    console.log(chats);
    this.setProps({
      avatar,
      chats
    });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
