/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import EventBus from './event-bus';

class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render'
	};

	static MESSAGE_ACCESS_ERROR = 'Нет прав';

	_element = null;
	_meta = null;

	get element() {
		return this._element;
	}

	constructor(tagName = 'div', props = {}) {
		const eventBus = new EventBus();
		this._meta = { tagName, props };
		if (props.hasOwnProperty('attributes')) {
			const { attributes } = props;
			this._meta.attributes = attributes;
		}
		this.props = this._makePropsProxy(props);
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_setAttributes(element, attributes = {}) {
		Object.keys(attributes).forEach(attr => {
			element.setAttribute(attr, attributes[attr]);
		});
	}

	_createDocumentElement(tagName, attributes) {
		const element = document.createElement(tagName);
		this._setAttributes(element, attributes);
		return element;
	}

	_updateResources(newProps) {
		const { attributes } = newProps;
		Object.assign(this._meta.attributes, attributes);
		this._setAttributes(this.element, attributes);
	}

	_createResources() {
		const { tagName, attributes } = this._meta;
		this._element = this._createDocumentElement(tagName, attributes);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount(oldProps) { }

	_componentDidUpdate(oldProps, newProps) {
		this.componentDidUpdate(oldProps, newProps);
		this._removeEvents(oldProps);
		this._updateResources(newProps);
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

	}

	componentDidUpdate(oldProps, newProps) {
		return true;
	}

	setProps = nextProps => {
		if (nextProps) {
			Object.assign(this.props, nextProps);
		}
	};

	_render() {
		const block = this.render();
		if (block) {
			this._element.innerHTML = '';
			this._element.appendChild(block);
		}
		this._addEvents(this.props);
	}

	render() { }

	_addEvents(props) {
		const { events = {} } = props;

		Object.keys(events).forEach(eventName => {
			this.element.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents(props) {
		const { events = {} } = props;

		Object.keys(events).forEach(eventName => {
			this.element.removeEventListener(eventName, events[eventName]);
		});
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
				target[prop] = value;
				const newProps = { ...target };
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newProps);
				return true;
			},
			deleteProperty: () => {
				throw new Error(this.MESSAGE_ACCESS_ERROR);
			},
		};

		// eslint-disable-next-line no-undef
		return new Proxy(props, handler);
	}
}

export default Block;
