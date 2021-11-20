import Router from '../router';
import { mutations, get } from '../store';
import LoadingModalController from './loading-modal.controller';
import ErrorModalController from './error-modal.controller';
import SuccessModalController from './success-modal.controller';

export default class BaseController {
  router: typeof Router;

  getAuthorizationStatus: () => boolean;

  mutations: {
    setAuthorizationStatus: (status: boolean) => void;
    setUserInfo: (info: UserInfo) => void;
    setUserChats: (chats: ChatItem[]) => void;
  };

  loadingModal: LoadingModalController;

  errorModal: ErrorModalController;

  successModal: SuccessModalController;

  constructor() {
    this.router = Router;
    this.mutations = mutations;
    this.getAuthorizationStatus = () => get('isAuthorized');
    this.loadingModal = new LoadingModalController();
    this.errorModal = new ErrorModalController();
    this.successModal = new SuccessModalController();
  }

  throwError(response: RequestResponse) {
    const { data, status } = response;
    // TODO: Кривоватая конструкция из-за требований TS
    const reason = typeof data !== 'string' ? data?.reason : data || 'Не придумал что сюда писать, просто посмотри в консоль';
    this.loadingModal.hide();
    this.errorModal.show({ status, reason });
    throw new Error(`\n status: ${status} \n reason: ${reason}`);
  }
}
