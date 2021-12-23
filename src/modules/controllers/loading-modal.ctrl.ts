import LoadingModalContent from '../../components/modals/loading-modal-content';
import ModalWrapper from '../../components/modals/modal-wrapper';

let instance: LoadingModalController | null = null;

export default class LoadingModalController {
  modal: HTMLElement;

  isMounted: boolean;

  modalInstance: ModalWrapper;

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

    const content = new LoadingModalContent();
    this.modalInstance = new ModalWrapper({ content, fixed: true });
    this.modal = this.modalInstance.getContent();
  }

  show() {
    document.querySelector('body')?.append(this.modal);
    this.modalInstance.show();
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
