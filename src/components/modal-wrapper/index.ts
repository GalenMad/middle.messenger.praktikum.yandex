import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const ESC_KEY = 'Escape';

export default class ModalWrapper extends Block {
  isOpen: boolean;

  addedClickHandler: Function;

  addedKeydownHandler: Function;

  classForClose: string[];

  constructor({ content, fixed = false, hideCallback = null }) {
    const attributes = { class: 'modal' };
    super('div', { attributes, fixed, hideCallback }, { content });
    this.isOpen = false;
    this.classForClose = ['.close-button', '.modal-dialog'];
  }

  clickHandler({ target }) {
    if (this.classForClose.some((cls: string) => target.matches(cls))) {
      this.hide();
    }
  }

  keydownHandler(evt) {
    if (evt.key === ESC_KEY) {
      this.hide();
    }
  }

  addCloseHandlers() {
    this.addedClickHandler = this.clickHandler.bind(this);
    this.addedKeydownHandler = this.keydownHandler.bind(this);
    this.element.addEventListener('click', this.addedClickHandler);
    document.addEventListener('keydown', this.addedKeydownHandler);
  }

  removeCloseHandlers() {
    this.element.removeEventListener('click', this.addedClickHandler);
    document.removeEventListener('keydown', this.addedKeydownHandler);
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
      if (this.props.hideCallback) {
        this.props.hideCallback();
      }
      if (!this.fixed) {
        this.removeCloseHandlers();
      }
    }
  }

  render() {
    return compileTemplate(this.props);
  }
}
