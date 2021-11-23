import Block from '../../modules/block';
import compileTemplate from './template.pug';

class Page extends Block {
  constructor(props = {}) {
    super('div', props);
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default (props: Array<{path: string, name: string}>) => new Page(props).getContent();
