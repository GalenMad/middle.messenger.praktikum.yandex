import Block from '../../modules/block';
import allFields from '../../data/fields';
import Form from '../../components/form';
import compileTemplate from './template.pug';

const fields = Object.values(allFields);

const events = [{
  cb: (evt: Event) => {
    evt.stopPropagation();
    evt.preventDefault();
    form.checkValidity();
    if (form.isValid) {
      console.log(form.data);
    }
  },
  type: 'submit'
}];

const pageProps = {
  fields,
  events,
  title: 'Регистрация',
  buttonText: 'Поехали',
  footerText: 'Уже есть аккаунт?',
  linkText: 'Войти',
  link: '/authorization',
};

const form = new Form(pageProps);

class Page extends Block {
  constructor(props = {}) {
    super('div', props, { form });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default () => new Page(pageProps).getContent();
