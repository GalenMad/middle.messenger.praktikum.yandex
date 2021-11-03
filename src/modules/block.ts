/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import EventBus from './event-bus';

class Block {
  [x: string]: any;
  checkValidity(): void {
    throw new Error('Method not implemented.');
  }
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  static MESSAGE_ACCESS_ERROR = 'Нет прав';

  _element: HTMLElement;
  _meta: { tagName: string; props: {}; };
  eventBus: EventBus;
  props: { attributes?: { string: string }, name?: string, validators?: Record<string, Function> };
  children: Record<string, Block>;

  get element() {
    return this._element;
  }
  // TODO: Избавиться от _meta
  constructor(tagName = 'div', props = {}, children = {}) {
    this._meta = { tagName, props };
    this.props = this._makePropsProxy(props);
    this.eventBus = new EventBus();
    this.children = children;
    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    const eventBus = this.eventBus;
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
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
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
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
    this.componentDidUpdate(newProps, oldProps);
    this._updateResources(newProps);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
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
    this.element.innerHTML = '';
    const block = this.render();
    if (typeof block === 'string') {
      const fragment = this.stringToDocumentFragment(block);
      this.element.append(fragment);
    }
    this.replaceChildren();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  render() {
    return false;
  }

  getContent() {
    return this.element;
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
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, newProps, oldProps);
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
