import ErrorModal from '../../components/error-modal';

let instance: ErrorModalController | null = null;

// TODO: Допилить и расширить логику появления модалок
// Сервисные сообщения, вина юзера, вина сервера, etc.
// При пятисотых хорошо бы отправлять на 500-page
export default class ErrorModalController {
  modalClass: typeof ErrorModal;
  modalInstance: null | ErrorModal;
  modal: null | HTMLElement;
  isMounted: boolean;
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.modal = null;
    this.modalInstance = null;
    this.modalClass = ErrorModal;
  }

  show(status, reason) {
    this.hide();

    if (!this.modalInstance) {
      this.modalInstance = new this.modalClass({ status, reason }, this.hide.bind(this));
    } else {
      this.modalInstance.setProps({ status, reason });
    }

    this.modal = this.modalInstance.getContent();
    document.querySelector('body')?.append(this.modal);
    this.modalInstance.show();
  }

  // TODO: Хайдить, удалять из дом, а потом обновлять пропсами ↑
  hide() {
    if (this.modalInstance && this.modal) {
      this.modalInstance.hide();
      this.modal.remove();
    }
  }
}
