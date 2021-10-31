/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import EventBus from './event-bus';

// TODO:
// + 0. Дописать базовый класс Block. Он должен уметь:
// + 0.1 Принимать events (обработчики)
// + 0.2 Навешивать обработчики
// + 0.3 Удалять обработчики при апдейте
// - 0.4 Возвращать внутренность обёртки
// + 0.4 Создавать плоский элемент

// + 1. Написать функцию compile. Она должна уметь:
// + 1.2 Принимать на вход compileTemplate и props, а возвращать Document Fragment
// + 1.3 Распознавать среди props инстансы и массивы инстансов и внедрять их в DOM-элемент
// + 1.4 Использовать компонент template без класса
// + 1.5 parent.replaceChild

// + 2. Написать класс-компонент Input. Он должен уметь:
// + 2.1 Принимать на себя обработчики
// + 2.2 Принимать на себя правила валидации
// + 2.3 Отдавать статус валидации
// + 2.4 Отдавать значение
// - 2.5 Генерить и эмитить собственные ивенты (input:validate, focus, blur)

// + 3. Написать класс-компонент FormGroup. Он должен уметь:
// + 3.1 Интегрировать внутрь себя класс Input 
// + 3.2 Передавать внутрь себя правила валидации
// + 3.3 Генерить и эмитить собственные ивенты (form-group:validate)
// - 3.4 Эмитить ивенты вложенного класса Input
// + 3.5 Подписываться на ивенты вложенного класса Input
// + 3.5 В зависимости от статуса валидации показывать сообщение валидации

// 4. Написать класс-компонент Form. Он должен уметь:
// 4.1 Генерировать по модели данных множество экземпляров класса FormGroup
// 4.2 Генерить и эмитить собственные ивенты (form-group:submit)
// 4.3 Собирать данные инпутов из экземпляров класса FormGroup

// Разобраться с приватными методами

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

	// Может переопределять пользователь, необязательно трогать
	componentDidMount(oldProps) { }

	_componentDidUpdate(oldProps, newProps) {
		this.componentDidUpdate(oldProps, newProps);
		this._removeEvents(oldProps);
		this._updateResources(newProps);
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps, newProps) {
		return true;
	}

	setProps = nextProps => {
		if (nextProps) {
			Object.assign(this.props, nextProps);
		}
	};

	get element() {
		return this._element;
	}

	_render() {
		const block = this.render();
		if (block) {
			this._element.innerHTML = '';
			this._element.appendChild(block);
		}
		this._addEvents(this.props);
	}

	// Может переопределять пользователь, необязательно трогать
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
