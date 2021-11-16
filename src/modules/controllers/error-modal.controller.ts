import ErrorModalContent from '../../components/error-modal-content';
import ModalWrapper from '../../components/modal-wrapper';

let instance: ErrorModalController | null = null;

// TODO: Допилить и расширить логику появления модалок
// Сервисные сообщения, вина юзера, вина сервера, etc.
// При пятисотых хорошо бы отправлять на 500-page
export default class ErrorModalController {
  modalContentClass: typeof ErrorModalContent;
  modalClass: typeof ModalWrapper;
  modalContentInstance: null | ErrorModalContent;
  modalInstance: null | ModalWrapper;
  modal: null | HTMLElement;

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.modal = null;
    this.modalInstance = null;
    this.modalContentInstance = null;
    this.modalContentClass = ErrorModalContent;
    this.modalClass = ModalWrapper;
  }

  show(props) {
    if (!this.modalContentInstance && !this.modalInstance) {
      this.modalContentInstance = new this.modalContentClass(props);
      this.modalInstance = new this.modalClass({ content: this.modalContentInstance });
      this.modal = this.modalInstance.getContent();
      document.querySelector('body')?.append(this.modal);
    } else {
      this.modalContentInstance?.setProps(props);
    }
    
    this.modalInstance?.show();
  }
}
