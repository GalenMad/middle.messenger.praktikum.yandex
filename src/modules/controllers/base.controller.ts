import Router from '../router';
import Store from '../store';
import LoadingModalController from './loading-modal.controller';
import ErrorModalController from './error-modal.controller';
import SuccessModalController from './success-modal.controller';

interface errorData {
  status: string | number,
  data: { reason?: string }
}

export default class BaseController {
  router: Router;
  getAuthorizationStatus: () => boolean;
  mutations: { setAuthorizationStatus: (status: boolean) => void; setUserInfo: (info: userInfo) => void; };
  loadingModal: LoadingModalController;
  errorModal: ErrorModalController;
  successModal: ErrorModalController;
  constructor() {
    this.router = Router;
    const { mutations, getAuthorizationStatus } = Store;
    this.mutations = mutations;
    this.loadingModal = new LoadingModalController();
    this.errorModal = new ErrorModalController();
    this.successModal = new SuccessModalController();
    this.getAuthorizationStatus = getAuthorizationStatus;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  throwError(response: errorData) {
    const { data, status } = response;
    const reason = data ? data.reason ? data.reason : data : 'Не придумал что сюда писать, просто посмотри в консоль';
    this.loadingModal.hide();
    this.errorModal.show({ status, reason });
    throw new Error(`\n status: ${status} \n reason: ${reason}`);
  }
}

