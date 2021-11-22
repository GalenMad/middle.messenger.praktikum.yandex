import SuccessModalContent from '../../components/modals/success-modal-content';
import ModalWrapper from '../../components/modal-wrapper';

let instance: SuccessModalController | null = null;

// TODO: Указывать заголовок модалки об успехе
export default class SuccessModalController {
  ModalClass: typeof ModalWrapper;

  modalContentInstance: SuccessModalContent;

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
    this.ModalClass = ModalWrapper;
  }

  show() {
    if (!this.modalInstance) {
      this.modalInstance = new this.ModalClass({
        content: this.modalContentInstance,
        hideCallback: this.hide.bind(this),
      });
      this.modal = this.modalInstance.getContent();
      document.querySelector('body')?.append(this.modal);
    }

    // TODO: Избыточные проверки для TS
    if (this.modal) {
      document.querySelector('body')?.append(this.modal);
      this.modalInstance?.show();
    }
  }

  hide() {
    if (this.modalInstance) {
      this.modalInstance?.hide();
      this.modal?.remove();
    }
  }
}
