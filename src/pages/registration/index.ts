import Block from '../../modules/block';
import allFields from '../../data/fields';
import Form from '../../components/form';
import compileTemplate from './template.pug';

const fields = Object.values(allFields);

const pageProps = {
  fields,
  title: 'Регистрация',
  buttonText: 'Поехали',
  footerText: 'Уже есть аккаунт?',
  linkText: 'Войти',
  link: '/authorization',
};

class Page extends Block {
  constructor(props = {}) {
    const form = new Form(props);
    super('div', props, { form });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default () => new Page(pageProps).getContent();
