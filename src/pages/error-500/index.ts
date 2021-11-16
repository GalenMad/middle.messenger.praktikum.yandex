import ErrorPage from '../../components/error-page';

export default class Page extends ErrorPage {
  constructor() {
    super({
      errorCode: '500', 
      message: 'Ага, уже бежим', 
      linkText: 'Вернуться к чатам', 
      linkAddress: '/',
    })
  }
}
