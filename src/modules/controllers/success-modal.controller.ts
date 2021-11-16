import SuccessModalContent from '../../components/success-modal-content';
import ModalWrapper from '../../components/modal-wrapper';

let instance: ErrorModalController | null = null;

// TODO: Допилить и расширить логику появления модалок
// Сервисные сообщения, вина юзера, вина сервера, etc.
// При пятисотых хорошо бы отправлять на 500-page
export default class ErrorModalController {
  modalContentClass: typeof SuccessModalContent;
  modalClass: typeof ModalWrapper;
  modalContentInstance: null | SuccessModalContent;
  modalInstance: null | ModalWrapper;
  modal: null | HTMLElement;
  isMounted: boolean;

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.modal = null;
    this.modalInstance = null;
    this.modalContentInstance = new SuccessModalContent();
    this.modalClass = ModalWrapper;
    this.isMounted = false;
  }

  show() {
    if (!this.modalInstance) {
      this.modalInstance = new this.modalClass({ content: this.modalContentInstance });
      this.modal = this.modalInstance.getContent();
    } 
    
    document.querySelector('body')?.append(this.modal);
    this.modalInstance?.show();
    this.isMounted = true;
  }

  hide() {
    if (this.isMounted) {
      this.modalInstance.hide();
      this.modal.remove();
      this.isMounted = false;
    }
  }
}
