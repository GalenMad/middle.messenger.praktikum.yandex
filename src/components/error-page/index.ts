import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

export default class ErrorPage extends Block {
  constructor(props = {}) {
    super('div', props);
  }

  render() {
    return compileTemplate(this.props);
  }
}
