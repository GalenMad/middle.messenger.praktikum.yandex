import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';
import SocketsController from '../../../modules/controllers/sockets.ctrl';

const socketsController = new SocketsController();

export default class ChatFooter extends Block {
  constructor() {
    const attributes = { class: 'chat_footer' };
    super('footer', { attributes });
  }

  componentDidMount() {
    // TODO: Перенести и рефакторить слушатели после обновления жизненного цикла
    const input = this.element.querySelector('.chat_input');
    const submit = this.element.querySelector('.chat_submit-message');

    // TODO: Отслеживать доп. нажатия на Shift, Ctrl и прочие
    const keydownHandler = (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        submit.click();
      }
    };

    if (input && submit) {
      input.addEventListener('input', ({ target }) => {
        const value = target.value.trim();
        if (value) {
          submit.removeAttribute('disabled');
        } else {
          submit.setAttribute('disabled', 'disabled');
        }
      });

      input.addEventListener('focus', () => {
        document.addEventListener('keydown', keydownHandler);
      });

      input.addEventListener('blur', () => {
        document.removeEventListener('keydown', keydownHandler);
      });

      submit.addEventListener('click', () => {
        const value = input.value.trim();
        if (value) {
          socketsController.sendMessage(value);
          input.value = '';
        }
      });
    }
  }

  render() {
    return compileTemplate(this.props);
  }
}
