/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import EventBus from './event-bus';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  static MESSAGE_ACCESS_ERROR = 'Нет прав';

  _element = null;

  _meta = null;

  get element() {
    return this._element;
  }
  // TODO: Избавиться от _meta
  constructor(tagName = 'div', props = {}, children = {}) {
    const eventBus = new EventBus();
    this._meta = { tagName, props };
    this.props = this._makePropsProxy(props);
    this.eventBus = eventBus;
    this.children = children;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  _setAttributes(element, attributes = {}) {
    Object.keys(attributes).forEach((attr) => {
      element.setAttribute(attr, attributes[attr]);
    });
  }

  _createDocumentElement(tagName, attributes = {}) {
    const element = document.createElement(tagName);
    this._setAttributes(element, attributes);
    return element;
  }

  _createResources() {
    const { tagName } = this._meta;
    const { attributes = {} } = this.props;
    this._element = this._createDocumentElement(tagName, attributes);
  }

  init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount(this.props);
  }

  componentDidMount(oldProps) { return false; }

  _updateResources(newProps) {
    const { attributes = {} } = newProps;
    this._setAttributes(this.element, attributes);
  }

  _componentDidUpdate(newProps, oldProps) {
    this.componentDidUpdate(newProps, oldProps);
    this._updateResources(newProps);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(newProps, oldProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (nextProps) {
      Object.assign(this.props, nextProps);
    }
  };

  stringToDocumentFragment(string) {
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
      parentBlock.replaceChild(child.getContent(), childrenToReplace);
    });
  }

  _render() {
    this.element.innerHTML = '';
    const block = this.render();
    if (block) {
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

  _makePropsProxy(props) {
    const handler = {
      get: (target, prop) => {
        if (prop.indexOf('_') === 0) {
          throw new Error(this.MESSAGE_ACCESS_ERROR);
        }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldProps = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        const newProps = { ...target };
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, newProps, oldProps);
        return true;
      },
      deleteProperty: () => {
        throw new Error(this.MESSAGE_ACCESS_ERROR);
      },
    };
    return new Proxy(props, handler);
  }
}

export default Block;
