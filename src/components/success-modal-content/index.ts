import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class SuccessModalContent extends Block {
  constructor() {
    const attributes = { class: 'success-modal' };
    super('div', { attributes });
  }

  render() {
    return compileTemplate(this.props);
  }
}
