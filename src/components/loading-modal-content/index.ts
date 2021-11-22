import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class LoadingModalContent extends Block {
  constructor() {
    const attributes = { class: 'loading-modal' };
    super('div', { attributes });
  }

  render() {
    return compileTemplate(this.props);
  }
}
