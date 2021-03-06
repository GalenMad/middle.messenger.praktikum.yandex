import FormPage from '../../components/form-page';
import AuthController from '../../modules/controllers/auth.ctrl';

const pageProps = {
  title: 'Регистрация',
  footerText: 'Уже есть аккаунт?',
  linkText: 'Войти',
  link: '/',
};
const formProps = {
  title: 'Регистрация',
  buttonText: 'Поехали',
};
const authController = new AuthController();
const submitCallback = authController.registration.bind(authController);
export default class Page extends FormPage {
  constructor() {
    super(pageProps, formProps, submitCallback, { fields: 'registrationFields' });
  }
}
