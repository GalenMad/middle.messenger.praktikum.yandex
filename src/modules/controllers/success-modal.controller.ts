import SuccessModalContent from '../../components/success-modal-content';
import ModalWrapper from '../../components/modal-wrapper';

let instance: SuccessModalController | null = null;

// TODO: Указывать заголовок модалки об успехе
export default class SuccessModalController {
  modalContentClass: typeof SuccessModalContent;
  modalClass: typeof ModalWrapper;
  modalContentInstance: null | SuccessModalContent;
  modalInstance: null | ModalWrapper;
  modal: null | HTMLElement;

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.modal = null;
    this.modalInstance = null;
    this.modalContentInstance = new SuccessModalContent();
    this.modalClass = ModalWrapper;
  }

  show() {
    if (!this.modalInstance) {
      this.modalInstance = new this.modalClass({ content: this.modalContentInstance });
      this.modal = this.modalInstance.getContent();
      document.querySelector('body')?.append(this.modal);
    } 
    
    this.modalInstance?.show();
  }
}
