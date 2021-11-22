import FormPage from '../../components/form-page';
import AuthController from '../../modules/controllers/auth.ctrl';

const pageProps = {
  title: 'Авторизация',
  footerText: 'Нет аккаунта?',
  linkText: 'Зарегистрироваться',
  link: '/sign-up',
};
const formProps = {
  title: 'Авторизация',
  buttonText: 'Поехали',
};
const authController = new AuthController();
const submitCallback = authController.login.bind(authController);
export default class Page extends FormPage {
  constructor() {
    super(pageProps, formProps, submitCallback, { fields: 'loginFields' });
  }
}
