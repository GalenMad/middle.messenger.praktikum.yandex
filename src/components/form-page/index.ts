import Block from '../../modules/block';
import Form from '../form';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_PAGE_TAG = 'div';

export default class FormPage extends Block {
  constructor(pageProps, formProps, submitCallback, selectors = {}) {
    const form = new Form({ ...formProps, submitCallback }, selectors);
    super(FORM_PAGE_TAG, { ...pageProps }, { form });
  }

  render() {
    return compileTemplate(this.props);
  }
}
