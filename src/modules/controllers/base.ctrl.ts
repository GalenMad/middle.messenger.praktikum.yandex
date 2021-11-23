import Router from '../router';
import { mutations, getters } from '../store';
import LoadingModalController from './loading-modal.ctrl';
import ErrorModalController from './error-modal.ctrl';
import SuccessModalController from './success-modal.ctrl';

export default class BaseController {
  router: typeof Router;

  // TODO: Переделать геттеры и сеттеры в классы, чтобы не разводить это добро здесь
  getters: {
    checkSocket: (id: number) => boolean;
    isAuthorized: () => boolean;
    userId: () => string | number;
    getActiveSocket: () => WebSocket;
  };

  mutations: {
    setAuthorizationStatus: (status: boolean) => void;
    setUserInfo: (info: UserInfo) => void;
    setUserChats: (chats: ChatItem[]) => void;
    setChatUsers: (id: number, users: UserInfo[]) => void;
    setActiveChat: (id: number) => void;
    setMessages: (id: number, list: {}[]) => void;
    addMessage: (id: number, list: {}[]) => void;
    addSocket: (id: number, socket: WebSocket) => void;
    removeSocket: (id: number) => void;
    setActiveSocket: (id: number) => void;
  };

  loadingModal: LoadingModalController;

  errorModal: ErrorModalController;

  successModal: SuccessModalController;

  constructor() {
    this.router = Router;
    this.mutations = mutations;
    this.getters = getters;
    this.loadingModal = new LoadingModalController();
    this.errorModal = new ErrorModalController();
    this.successModal = new SuccessModalController();
  }

  throwError(response: { data: string, status: string } | RequestResponse) {
    const { data, status } = response;
    // TODO: Избыточные проверки для TS
    const reason = typeof data !== 'string' ? data?.reason : data || 'Не придумал что сюда писать, просто посмотри в консоль';
    this.loadingModal.hide();
    this.errorModal.show({ status, reason });
    throw new Error(`\n status: ${status} \n reason: ${reason}`);
  }
}
