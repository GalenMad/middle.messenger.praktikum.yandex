export default class Route {
  _pathname: any;

  _blockClass: any;

  _block: null | { getContent: Function };

  _props: any;

  isPrivate: any;

  isNotForAuthorized: any;

  constructor(pathname, view, props, options) {
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

    const root = document.querySelector(this._props.rootQuery);
    root.appendChild(this._block.getContent());
  }
}
