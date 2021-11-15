import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const ESC_KEY = 'Escape';
// TODO: Общий класс для модалок
// TODO: Рефактор стилей для модалок
// TODO: Допилить дизайн и содержание модалки 
export default class ErrorModal extends Block {
  constructor(props, closeHandler) {
    const attributes = { class: 'modal error-modal' }
    const events = [{
      type: 'click',
      cb: (evt: Event) => {
        evt.stopPropagation();
        const closeList = ['close-button', 'modal'];
        const classList: DOMTokenList = evt.target.classList;
        if (closeList.some((cls: string) => classList.contains(cls))) {
          closeHandler();
        }
      }
    }, {
      type: 'keydown',
      cb: (evt) => {
        if (evt.key === ESC_KEY) {
          closeHandler();
        }
      }

    }]
    super('div', { attributes, ...props, events });
  }

  show() {
    this.element.classList.add('show');
    document.querySelector('body')?.classList.add('show-modal');
  }

  hide() {
    this.element.classList.remove('show');
    document.querySelector('body')?.classList.remove('show-modal');
  }

  render() {
    return compileTemplate(this.props);
  }
}
