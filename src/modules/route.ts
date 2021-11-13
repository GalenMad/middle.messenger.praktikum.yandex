function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

export default class Route {
  constructor(pathname, view, props, options) {
    const { isPrivate = false, isNotForAuthorized = false } = options;
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this.isPrivate = isPrivate;
    this.isNotForAuthorized = isNotForAuthorized;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname) {
    return pathname === this._pathname;
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
