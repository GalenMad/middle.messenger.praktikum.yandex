import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const ESC_KEY = 'Escape';
// TODO: Общий класс для модалок
// TODO: Рефактор стилей для модалок
// TODO: Допилить дизайн и содержание модалки 
export default class ErrorModal extends Block {
  constructor(props) {
    const attributes = { class: 'modal error-modal' }
    super('div', { attributes, ...props });

    const events = [{
      type: 'click',
      cb: (evt: Event) => {
        evt.stopPropagation();
        const closeList = ['close-button', 'modal'];
        const classList: DOMTokenList = evt.target.classList;
        if (closeList.some((cls: string) => classList.contains(cls))) {
          this.hide();
        }
      }
    }, {
      type: 'keydown',
      cb: (evt) => {
        if (evt.key === ESC_KEY) {
          this.hide();
        }
      }
    }]

    this.setProps({ events });
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
