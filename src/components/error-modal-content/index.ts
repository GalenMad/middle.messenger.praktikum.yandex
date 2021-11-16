import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class ErrorModalContent extends Block {
  constructor(props = {}) {
    console.log('new class');
    const attributes = { class: 'error-modal modal-content' };
    super('div', { attributes, ...props });
  }

  render() {
    return compileTemplate(this.props);
  }
}

