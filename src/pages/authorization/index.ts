import allFields from '../../data/fields';
import Form from '../../components/form';
import compileTemplate from './template.pug';
import Block from '../../modules/block';

const fields = allFields.filter((field) => ['login', 'password'].includes(field.name));
const events = [{
  cb: (evt: Event) => {
    evt.stopPropagation();
    evt.preventDefault();
    form.checkValidity();
    if (form.isValid) {
      console.log(form.data);
    }
  },
  selector: 'form',
  type: 'submit'
}];

const pageProps = {
  fields,
  events,
  title: 'Авторизация',
  buttonText: 'Поехали',
  footerText: 'Нет аккаунта?',
  linkText: 'Зарегестрироваться',
  link: '/sign-up',
};

const form = new Form(pageProps);

class Page extends Block {
  constructor(props = {}) {
    super('div', {...props, ...pageProps}, { form });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Page;
