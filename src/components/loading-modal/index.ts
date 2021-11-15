import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class LoadingModal extends Block {
  constructor() {
    const attributes = { class: 'modal loading-modal' }
    super('div', { attributes });
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
    return compileTemplate();
  }
}
