import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class LoadingModal extends Block {
  constructor() {
    const attributes = { class: 'loading-modal' }
    super('div', { attributes });
  }

  render() {
    return compileTemplate();
  }
}
