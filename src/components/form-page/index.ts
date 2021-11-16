import Block from '../../modules/block';
import Form from '../form';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_PAGE_TAG = 'div';

export default class FormPage extends Block {
  constructor(pageProps, formProps, fields, submitCallback) {
    const events = [{
      cb: (evt: Event) => {
        evt.stopPropagation();
        evt.preventDefault();
        form.checkValidity();
        if (form.isValid && submitCallback) {
          submitCallback(form.data);
        }
      },
      selector: 'form',
      type: 'submit'
    }]
    const form = new Form({ ...formProps, fields })
    super(FORM_PAGE_TAG, { ...pageProps, events }, { form });
  }

  render() {
    return compileTemplate(this.props);
  }
}
