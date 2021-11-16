import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const ESC_KEY = 'Escape';

export default class ModalWrapper extends Block {
  isOpen: boolean;
  constructor({ content, fixed = false }) {
    const attributes = { class: 'modal' };
    super('div', { attributes, fixed }, { content });
    this.isOpen = false;

    if (!fixed) {
      // TODO: Костыль, вызывается CDU ↓↓↓
      const events = [{
        type: 'click',
        cb: ({ target }) => {
          const closeTrigger = ['close-button', 'modal'].some((cls: string) => target?.classList.contains(cls));
          if (closeTrigger) {
            this.hide();
          }
        }
      }, {
        type: 'keydown',
        cb: ({ key }) => {
          if (key === ESC_KEY) {
            this.hide();
          }
        }
      }]
      
      this.setProps({ events })
    }
  }

  show() {
    if (!this.isOpen) {
      this.element.classList.add('show');
      document.querySelector('body')?.classList.add('show-modal');
      this.isOpen = true;
    }
  }

  hide() {
    if (this.isOpen) {
      this.element.classList.remove('show');
      document.querySelector('body')?.classList.remove('show-modal');
      this.isOpen = false;
    }
  }

  render() {
    return compileTemplate(this.props);
  }
}
