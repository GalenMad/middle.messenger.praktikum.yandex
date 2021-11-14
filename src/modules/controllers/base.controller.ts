import Router from '../router';
import Store from '../store';

interface errorData {
  status: string | number,
  data: { reason?: string }
}

export default class BaseController {
  router: Router;
  constructor() {
    this.router = Router;
    this.store = Store;
  }

  throwError(title: string, response: errorData) {
    const { data, status } = response;
    throw new Error(`\n ref: ${title} \n status: ${status} \n reson: ${data.reason || data}`);
  }
}

