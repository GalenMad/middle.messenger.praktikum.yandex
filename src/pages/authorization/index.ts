import fields from '../../data/login-fields';
import FormPage from '../../components/form-page';
import AuthController from '../../modules/controllers/auth.controller';

const pageProps = {
  title: 'Авторизация',
  footerText: 'Нет аккаунта?',
  linkText: 'Зарегестрироваться',
  link: '/sign-up',
};
const formProps = {
  title: 'Авторизация',
  buttonText: 'Поехали',
}
const authController = new AuthController();
const submitCallback = authController.login.bind(authController);
export default class Page extends FormPage {
  constructor() {
    super(pageProps, formProps, fields, submitCallback);
  }
}

