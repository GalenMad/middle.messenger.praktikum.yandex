import allFields from '../../data/fields';
import FormPage from '../../components/form-page';
import AuthController from '../../modules/controllers/auth.controller';

const fields = allFields.filter((field) => ['login', 'password'].includes(field.name));
const pageProps = {
  title: 'Авторизация',
  footerText: 'Нет аккаунта?',
  linkText: 'Зарегестрироваться',
  link: '/sign-up',
};
const formProps = {
  buttonText: 'Поехали',
}
const authController = new AuthController();
const submitCallback = authController.login.bind(authController);
export default class Page extends FormPage {
  constructor() {
    super(pageProps, formProps, fields, submitCallback);
  }
}

