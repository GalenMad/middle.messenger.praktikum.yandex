import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const ESC_KEY = 'Escape';

export default class ModalWrapper extends Block {
  isOpen: boolean;
  addedClickHandler: Function;
  addedKeydownHandler: Function;
  constructor({ content, fixed = false }) {
    const attributes = { class: 'modal' };
    super('div', { attributes, fixed }, { content });
    this.isOpen = false;
  }

  clickHandler({ target }) {
    console.log('fadsf');
    const closeTrigger = ['close-button', 'modal'].some((cls: string) => target.classList.contains(cls));
    if (closeTrigger) {
      this.hide();
    }
  }

  keydownHandler({ key }) {
    if (key === ESC_KEY) {
      this.hide();
    }
  }

  addCloseHandlers() {
    this.addedClickHandler = this.clickHandler.bind(this);
    this.addedKeydownHandler = this.keydownHandler.bind(this);
    this.element.addEventListener('click', this.addedClickHandler)
    document.addEventListener('keydown', this.addedKeydownHandler)
  }

  removeCloseHandlers() {
    this.element.removeEventListener('click', this.addedClickHandler)
    document.removeEventListener('keydown', this.addedKeydownHandler)
  }

  show() {
    if (!this.isOpen) {
      this.element.classList.add('show');
      document.querySelector('body')?.classList.add('show-modal');
      this.isOpen = true;
      if (!this.fixed) {
        this.addCloseHandlers();
      }
    }
  }

  hide() {
    if (this.isOpen) {
      this.element.classList.remove('show');
      document.querySelector('body')?.classList.remove('show-modal');
      this.isOpen = false;
      if (!this.fixed) {
        this.removeCloseHandlers();
      }
    }
  }

  render() {
    return compileTemplate(this.props);
  }
}
