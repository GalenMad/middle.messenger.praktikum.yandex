import ErrorModalContent from '../../components/error-modal-content';
import ModalWrapper from '../../components/modal-wrapper';

interface ErrorModalContentProps {
  status: number | string;
  reason: string | null;
}

let instance: ErrorModalController | null = null;

// TODO: Допилить и расширить логику появления модалок
// Объединить информационные модалки
// Сервисные сообщения, вина юзера, вина сервера, etc.
// При пятисотых хорошо бы отправлять на 500-page
export default class ErrorModalController {
  ModalContentClass: typeof ErrorModalContent;

  ModalClass: typeof ModalWrapper;

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
    this.ModalContentClass = ErrorModalContent;
    this.ModalClass = ModalWrapper;
  }

  show(props: ErrorModalContentProps) {
    if (this.modalContentInstance && this.modal) {
      this.modalContentInstance.setProps(props);
      document.querySelector('body')?.append(this.modal);
    } else {
      this.modalContentInstance = new this.ModalContentClass(props);
      this.modalInstance = new this.ModalClass({
        content: this.modalContentInstance,
        hideCallback: this.hide.bind(this),
      });
      this.modal = this.modalInstance.getContent();
      document.querySelector('body')?.append(this.modal);
    }

    this.modalInstance?.show();
  }

  hide() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modal?.remove();
    }
  }
}
