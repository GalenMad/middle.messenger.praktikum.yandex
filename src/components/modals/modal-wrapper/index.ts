import Block from '../../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const ESC_KEY = 'Escape';

export default class ModalWrapper extends Block {
  isOpen: boolean;

  addedClickHandler: (this: HTMLElement, ev: MouseEvent) => void;

  addedKeydownHandler: (this: HTMLElement, ev: KeyboardEvent) => void;

  classForClose: string[];

  fixed: boolean;

  constructor(props: { content: Block, fixed: boolean, hideCallback: () => void }) {
    const { content, fixed = false, hideCallback = null } = props;
    const attributes = { class: 'modal' };
    super('div', { attributes, fixed, hideCallback }, { content });
    this.isOpen = false;
    this.classForClose = ['.close-button', '.modal', '.modal-dialog'];
  }

  clickHandler(evt: MouseEvent): void {
    // eslint-disable-next-line max-len
    if (this.classForClose.some((cls: string) => evt && evt.target instanceof HTMLElement && evt.target.matches(cls))) {
      this.hide();
    }
  }

  keydownHandler(evt: KeyboardEvent): void {
    if (evt.key === ESC_KEY) {
      this.hide();
    }
  }

  addCloseHandlers(): void {
    this.addedClickHandler = this.clickHandler.bind(this);
    this.addedKeydownHandler = this.keydownHandler.bind(this);
    this.element.addEventListener('click', this.addedClickHandler);
    document.addEventListener('keydown', this.addedKeydownHandler);
  }

  removeCloseHandlers(): void {
    this.element.removeEventListener('click', this.addedClickHandler);
    document.removeEventListener('keydown', this.addedKeydownHandler);
  }

  show(): void {
    if (!this.isOpen) {
      this.element.classList.add('show');
      document.querySelector('body')?.classList.add('show-modal');
      this.isOpen = true;
      if (!this.fixed) {
        this.addCloseHandlers();
      }
    }
  }

  hide(): void {
    if (this.isOpen) {
      this.element.classList.remove('show');
      document.querySelector('body')?.classList.remove('show-modal');
      this.isOpen = false;
      if (typeof this.props.hideCallback === 'function') {
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
