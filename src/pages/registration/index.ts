import fields from '../../data/registration-fields';
import FormPage from '../../components/form-page';
import AuthController from '../../modules/controllers/auth.controller';

const pageProps = {
  title: 'Регистрация',
  footerText: 'Уже есть аккаунт?',
  linkText: 'Войти',
  link: '/sign-in',
};
const formProps = {
  title: 'Регистрация',
  buttonText: 'Поехали',
};
const authController = new AuthController();
const submitCallback = authController.registration.bind(authController);
export default class Page extends FormPage {
  constructor() {
    super(pageProps, formProps, fields, submitCallback);
  }
}
