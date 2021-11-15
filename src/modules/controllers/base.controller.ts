import Router from '../router';
import Store from '../store';
import LoadingModalController from './loading-modal.controller';

interface errorData {
  status: string | number,
  data: { reason?: string }
}

export default class BaseController {
  router: Router;
  getAuthorizationStatus: () => boolean;
  mutations: { setAuthorizationStatus: (status: boolean) => void; setUserInfo: (info: userInfo) => void; };
  loadingModal: LoadingModalController;
  constructor() {
    this.router = Router;
    const { mutations, getAuthorizationStatus } = Store;
    this.mutations = mutations;
    this.loadingModal = new LoadingModalController();
    this.getAuthorizationStatus = getAuthorizationStatus;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  throwError(title: string, response: errorData) {
    const { data, status } = response;
    throw new Error(`\n ref: ${title} \n status: ${status} \n reson: ${data.reason || data}`);
  }
}

