import ErrorPage from '../../components/error-page';

export default class Page extends ErrorPage {
  constructor() {
    super({
      errorCode: '404',
      message: 'Не туда попали?',
      linkText: 'Вернуться к чатам',
      linkAddress: '/',
    });
  }
}
