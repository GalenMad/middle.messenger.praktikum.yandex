import allFields from '../../data/fields';
import compileTemplate from './template.pug';
import Form from '../../components/form';
import Block from '../../modules/block';
import AuthController from '../../modules/controllers/auth.controller';
const authController = new AuthController();

const fields = allFields.filter((field) => ['login', 'password'].includes(field.name));
const events = [{
  cb: (evt: Event) => {
    evt.stopPropagation();
    evt.preventDefault();
    form.checkValidity();
    if (form.isValid) {
      authController.login(form.data);
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
