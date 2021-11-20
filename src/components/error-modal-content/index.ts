import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class ErrorModalContent extends Block {
  constructor(props = {}) {
    const attributes = { class: 'error-modal' };
    super('div', { attributes, ...props });
  }

  render() {
    return compileTemplate(this.props);
  }
}
