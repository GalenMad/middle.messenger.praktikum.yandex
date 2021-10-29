import EventBus from './event-bus';

// TODO:
// 1. Дописать базовый класс Block. Он должен уметь:
// 1.1 Принимать events (обработчики)
// 1.2 Навешивать обработчики
// 1.3 Удалять обработчики при апдейте
// 1.4 Возвращать внутренность обёртки

// 2. Написать класс-компонент Input. Он должен уметь:
// 2.1 Принимать на себя обработчики
// 2.2 Принимать на себя правила валидации
// 2.3 Отдавать статус валидации
// 2.4 Отдавать значение
// 2.5 Генерить и эмитить собственные ивенты (input:validate, focus, blur)

// 3. Написать класс-компонент FormGroup. Он должен уметь:
// 3.1 Интегрировать внутрь себя класс Input 
// 3.2 Передавать внутрь себя правила валидации
// 3.3 Генерить и эмитить собственные ивенты (form-group:validate)
// 3.4 Эмитить ивенты вложенного класса Input
// 3.5 Подписываться на ивенты вложенного класса Input
// 3.5 В зависимости от статуса валидации показывать сообщение валидации

// 4. Написать класс-компонент Form. Он должен уметь:
// 4.1 Генерировать по модели данных множество экземпляров класса FormGroup
// 4.2 Генерить и эмитить собственные ивенты (form-group:submit)
// 4.3 Собирать данные инпутов из экземпляров класса FormGroup

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

	constructor(props = {}, tagName = 'template') {
		const eventBus = new EventBus();
		this._meta = { tagName, props };
		this.props = this._makePropsProxy(props);
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	get element() {
		return this._element;
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
				if (prop.indexOf('_') === 0) {
					throw new Error(this.MESSAGE_ACCESS_ERROR);
				}
				// console.log('target[prop]', target[prop]);
				// console.log('prop', prop);
				// console.log('value', value);
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, target[prop], value);
				target[prop] = value;
				return true;
			},
			deleteProperty: () => {
				throw new Error(this.MESSAGE_ACCESS_ERROR);
			},
		};

		return new Proxy(props, handler);
	}

	_registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		const { tagName } = this._meta;
		this._element = document.createElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount() {
		return true;
	}

	_componentDidUpdate(oldProps, newProps) {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
		this.componentDidUpdate(oldProps, newProps);
	}

	componentDidUpdate() {
		return true;
	}

	_render() {
		const block = this.render();
		console.log(block);
		this._element.innerHTML = block;
	}

	render() {
		return true;
	}

	setProps = nextProps => {
		if (nextProps) {
			Object.assign(this.props, nextProps);
		}
	};

	getContent() {
		return this.element.content;
	}
}

export default Block;
