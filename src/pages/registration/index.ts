import allFields from '../../data/fields';
import FormPage from '../../components/form-page';
import AuthController from '../../modules/controllers/auth.controller';

const fields = Object.values(allFields);
const pageProps = {
  title: 'Регистрация',
  footerText: 'Уже есть аккаунт?',
  linkText: 'Войти',
  link: '/sign-in',
};
const formProps = {
  buttonText: 'Поехали',
};
const authController = new AuthController();
const submitCallback = authController.registration.bind(authController);
export default class Page extends FormPage {
  constructor() {
    super(pageProps, formProps, fields, submitCallback);
  }
}
