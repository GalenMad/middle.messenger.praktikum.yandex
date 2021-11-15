/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

//TODO: Сделать тип более глобальным
interface props {
  name?: string,
  type?: string,
  id?: string,
  events?: Array<{
    type: string,
    cb: Function
  }>,
  attributes?: Record<string, string>,
  validators?: Record<string, {
    argument: number,
    func: Function,
    message: string | Function
  }>,
  fields?: Array<{}>
}

class Block {
  checkValidity(): void {
    throw new Error('Method not implemented.');
  }

  static MESSAGE_ACCESS_ERROR = 'Нет прав';

  _element: HTMLElement;
  _meta: { tagName: string; props?: {}; };
  children: Record<string, Block>;
  props: { events: [], attributes: Record<string, string | number> }

  get element() {
    return this._element;
  }

  constructor(tagName = 'div', props: props = {}, children = {}) {
    this._meta = { tagName, props };
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.init();
  }


  // eslint-disable-next-line class-methods-use-this
  _setAttributes(element: HTMLElement, attributes: Record<string, string> = {}) {
    Object.keys(attributes).forEach((attr: string) => {
      element.setAttribute(attr, attributes[attr]);
    });
  }

  _createDocumentElement(tagName: string, attributes = {}) {
    const element = document.createElement(tagName);
    this._setAttributes(element, attributes);
    return element;
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName, this.props.attributes);
  }

  init() {
    this._createResources();
    this._render();
  }

  // TODO: CDM должен срабатывать один раз
  _componentDidMount() {
    this.componentDidMount(this.props);
  }

  componentDidMount(_oldProps: any): void | boolean { return false; }

  _updateResources(newProps: { attributes?: {}; }) {
    const { attributes = {} } = newProps;
    this._setAttributes(this.element, attributes);
  }

  _componentDidUpdate(newProps: any, oldProps: any) {
    this._removeEvents(oldProps);
    this.componentDidUpdate(newProps, oldProps);
    this._updateResources(newProps);
    this._render();
  }

  componentDidUpdate(_newProps: any, _oldProps: any): void | boolean {
    return true;
  }

  setProps = (nextProps: any) => {
    if (nextProps) {
      Object.assign(this.props, nextProps);
    }
  };

  stringToDocumentFragment(string: string) {
    const template = document.createElement('template');
    template.innerHTML = string;
    return template.content;
  }

  replaceChildren() {
    if (!Object.values(this.children).length) return;
    const childrensToReplace = this.element.querySelectorAll('[data-component]');
    childrensToReplace.forEach((childrenToReplace) => {
      const componentName = childrenToReplace.dataset.component;
      const parentBlock = childrenToReplace.parentNode;
      const child = this.children[componentName];
      if (parentBlock !== null) {
        parentBlock.replaceChild(child.getContent(), childrenToReplace);
      }
    });
  }

  _render() {
    const block = this.render();
    if (typeof block === 'string') {
      this.element.innerHTML = '';
      const fragment = this.stringToDocumentFragment(block);
      this.element.append(fragment);
    }
    this._addEvents(this.props);
    this.replaceChildren();
    this._componentDidMount();
  }

  render() {
    return false;
  }

  getContent() {
    return this.element;
  }

  _addEvents(props: { events: [] }) {
    const { events = [] } = props;
    for (const { type, selector, cb } of events) {
      // TODO: Добить определение глобальных и локальных событий
      if (type === 'keydown') {
        document.addEventListener(type, cb);
        return;
      }
      const element = selector ? this._element.querySelector(selector) || this._element : this._element;
      element.addEventListener(type, cb);
    }
  }

  _removeEvents(props: { events: [] }) {
    const { events = [] } = props;
    for (const { type, selector, cb } of events) {
      if (type === 'keydown') {
        document.removeEventListener(type, cb);
        return;
      }
      const element = selector ? this._element.querySelector(selector) || this._element : this._element;
      element.removeEventListener(type, cb);
    }
  }

  _makePropsProxy(props: {}) {
    const handler = {
      get: (target: any, prop: string) => {
        if (prop.indexOf('_') === 0) {
          throw new Error(Block.MESSAGE_ACCESS_ERROR);
        }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: any, prop: string, value: any) => {
        const oldProps = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        const newProps = { ...target };
        this._componentDidUpdate(newProps, oldProps)
        return true;
      },
      deleteProperty: () => {
        throw new Error(Block.MESSAGE_ACCESS_ERROR);
      },
    };
    return new Proxy(props, handler);
  }
}

export default Block;
