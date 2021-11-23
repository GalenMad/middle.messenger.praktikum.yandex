// TODO: Обойтись без импорта
import Block from '../block';

export default class Route {
  _pathname: any;

  _blockClass: any;

  _block: null | {
    getContent: Function,
    show: Function,
    hide: Function
  };

  _props: any;

  isPrivate: any;

  isNotForAuthorized: any;

  constructor(pathname: string, view: Block, props: Props, options: PageOptions) {
    const { isPrivate = false, isNotForAuthorized = false } = options;
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this.isPrivate = isPrivate;
    this.isNotForAuthorized = isNotForAuthorized;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  leave() {
    const root = document.querySelector(this._props.rootQuery);
    root.innerHTML = '';
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }

    this._block?.show();
    const root = document.querySelector(this._props.rootQuery);
    root.appendChild(this._block?.getContent());
  }
}
