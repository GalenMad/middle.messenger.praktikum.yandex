import Block from '../../modules/block';
import Form from '../form';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_PAGE_TAG = 'div';

export default class FormPage extends Block {
  constructor(pageProps, formProps, fields, submitCallback) {
    const form = new Form({ ...formProps, fields, submitCallback })
    super(FORM_PAGE_TAG, { ...pageProps }, { form });
  }

  render() {
    return compileTemplate(this.props);
  }
}
