/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { get, storeEvents } from './store';

interface PropsEvent {
  type: keyof ElementEventMap | string | [];
  selector?: string;
  cb: (this: Element, ev: Event) => any;
}

interface PropsAttributes {
  [key: string]: string;
}

interface Selectors {
  [key: string]: string;
}

interface ContentChildren {
  [key: string]: Block;
}

class Block {
  static MESSAGE_ACCESS_ERROR = 'Нет прав';

  _element: HTMLElement;

  _meta: {
    tagName: string;
    props?: Props;
  };

  children: ContentChildren;

  props: Props;

  get element() {
    return this._element;
  }

  constructor(tagName = 'div', props: Props = {}, children: ContentChildren = {}, selectors: Selectors = {}) {
    this._meta = { tagName, props };
    const selectorsData = this._appendSelectorsData(selectors);
    this.props = this._makePropsProxy({ ...props, ...selectorsData });
    this.children = children;
    this.init();
  }

  _appendSelectorsData(selectors: Selectors) {
    const selectorsData: Selectors = {};
    Object.keys(selectors).forEach((selectorName: string) => {
      const selector = selectors[selectorName];
      const head = selector.split('.')[0];
      selectorsData[selectorName] = get(selector);
      storeEvents.on(`store-update:${head}`, () => {
        this.setProps({ [selectorName]: get(selector) });
      });
    });
    return selectorsData;
  }

  // eslint-disable-next-line class-methods-use-this
  _setAttributes(element: HTMLElement, attributes: PropsAttributes = {}) {
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

  _componentDidMount() {
    this.componentDidMount(this.props);
  }

  componentDidMount(_oldProps: any): void | boolean { return false; }

  _updateResources(newProps: { attributes?: {}; }) {
    const { attributes = {} } = newProps;
    this._setAttributes(this.element, attributes);
  }

  _componentDidUpdate(newProps: any, oldProps: any) {
    this._removeEvents(oldProps.events);
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
    this.replaceChildren();
    this._addEvents(this.props.events);
    this._componentDidMount();
  }

  render() {
    return false;
  }

  getContent() {
    return this.element;
  }

  _addEvents(events: PropsEvent[] = []) {
    events.forEach(({ type, selector, cb }) => {
      const element = selector ? this._element.querySelector(selector) : this.element;
      if (!element) return;
      element.addEventListener(type, cb);
    });
  }

  _removeEvents(events: PropsEvent[] = []) {
    events.forEach(({ type, selector, cb }) => {
      const element = selector ? this._element.querySelector(selector) : this.element;
      if (!element) return;
      element.addEventListener(type, cb);
    });
  }

  _makePropsProxy(props: {}) {
    const handler = {
      get: (target: Props, prop: string) => {
        if (prop.indexOf('_') === 0) {
          throw new Error(Block.MESSAGE_ACCESS_ERROR);
        }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Props, prop: string, value: any) => {
        const oldProps = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        const newProps = { ...target };
        this._componentDidUpdate(newProps, oldProps);
        return true;
      },
      deleteProperty: () => {
        throw new Error(Block.MESSAGE_ACCESS_ERROR);
      },
    };
    return new Proxy(props, handler);
  }

  hide() {
    this.element.style.display = 'none';
  }

  show() {
    this.element.style.display = '';
  }
}

export default Block;
