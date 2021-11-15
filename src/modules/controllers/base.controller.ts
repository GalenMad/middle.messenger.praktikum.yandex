import Router from '../router';
import Store from '../store';

interface errorData {
  status: string | number,
  data: { reason?: string }
}

export default class BaseController {
  router: Router;
  getAuthorizationStatus: () => boolean;
  mutations: { setAuthorizationStatus: (status: boolean) => void; setUserInfo: (info: userInfo) => void; };
  constructor() {
    this.router = Router;
    const { mutations, getAuthorizationStatus } = Store;
    this.mutations = mutations;
    this.getAuthorizationStatus = getAuthorizationStatus;
  }

  throwError(title: string, response: errorData) {
    const { data, status } = response;
    throw new Error(`\n ref: ${title} \n status: ${status} \n reson: ${data.reason || data}`);
  }
}

