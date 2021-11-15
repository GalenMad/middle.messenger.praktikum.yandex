import LoadingModal from '../../components/loading-modal';

let instance: LoadingModalController | null = null;

export default class LoadingModalController {
  modal: LoadingModal;
  isMounted: boolean;
  constructor() {

    if (instance) {
      return instance;
    }
    instance = this;

    this.modal = new LoadingModal();
    this.isMounted = false;
  }

  show() {
    if (!this.isMounted) {
      const modalContent = this.modal.getContent();
      document.querySelector('body')?.append(modalContent);
      this.isMounted = true;
    }

    this.modal.show();
  }

  hide() {
    if (!this.isMounted) { 
      return;
    }
    this.modal.hide();
  }
}
