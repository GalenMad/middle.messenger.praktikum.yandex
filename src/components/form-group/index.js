import Block from '../../modules/block';
import Input from '../input';
import EventBus from '../../modules/event-bus';
import compile from '../../utils/compile';
import compileTemplate from './template.pug';
import './styles.scss';

const parseValidatorsFromDefinition = (validators) => {
	if (!validators) {
		return {};
	}
	const result = {};
	Object.keys(validators).map(validatorName => {
		const validator = validators[validatorName];
		const { argument, func } = validator;
		if (validator.hasOwnProperty('argument')) {
			const expandFunction = func(argument);
			result[validatorName] = expandFunction;
		} else {
			const expandFunction = func();
			result[validatorName] = expandFunction;
		}
		return validator;
	});
	return result;
};

class FormGroup extends Block {
	static EVENTS = {
		VALIDATION: 'validation',
		VALIDATION_HIDE: 'validation:hide',
	};

	// TODO:
	// Почему-то не получается передать значения в местный _input
	// Узнать почему
	get input() {
		return this._meta.input;
	}

	set input(value) {
		this._meta.input = value;
	}

	// TODO: 
	// Есть подозрение, что мне не нужны все эти геттеры
	get value() {
		return this._meta.input.value;
	}

	get name() {
		return this.props.name;
	}

	get validity() {
		return this.input.validity;
	}

	get isValid() {
		return Object.values(this.validity).every(item => item);
	}

	constructor(props = {}) {
		// TODO: Громоздкая конструкция, хочется как-то упростить
		if (props.hasOwnProperty('attributes')) {
			Object.assign(props.attributes, { class: 'form-group' });
		} else {
			props.attributes = { class: 'form-group' };
		}

		const eventBus = new EventBus();
		super('label', props);
		this.localEventBus = () => eventBus;
		this._registerLocalEvents(eventBus);
	}

	_registerLocalEvents(eventBus) {
		eventBus.on(FormGroup.EVENTS.VALIDATION, this.checkValidity.bind(this));
		eventBus.on(FormGroup.EVENTS.VALIDATION_HIDE, this.hideValidationMessage.bind(this));
	}

	componentDidMount() {
		this.createInputElement();
	}

	componentDidUpdate() {
		this.createInputElement();
	}

	hideValidationMessage() {
		const container = this.element.querySelector('.validation');
		container.style.display = 'none';
	}

	showValidationMessage(message) {
		const container = this.element.querySelector('.validation');
		container.style.display = 'block';
		container.textContent = message;
	}

	checkValidity() {
		const { validators } = this.props;
		const validity = Object.entries(this.validity);
		for (let i = 0; i < validity.length; i++) {
			const value = validity[i][1];
			if (!value) {
				const name = validity[i][0];
				let { message } = validators[name];
				if (typeof message === 'function') {
					message = message(validators[name].argument);
				}
				this.showValidationMessage(message);
				break;
			}
		}
	}

	createInputElement() {
		const { id, name, validators } = this.props;
		const type = this.props.hasOwnProperty('type') ? this.props.type : 'text';
		this.input = new Input({
			attributes: {
				class: 'control',
				type,
				id,
				name
			},
			validators: parseValidatorsFromDefinition(validators),
			events: {
				blur: () => this.localEventBus().emit(FormGroup.EVENTS.VALIDATION),
				focus: () => this.localEventBus().emit(FormGroup.EVENTS.VALIDATION_HIDE),
			}
		});
	}

	render() {
		const input = this.input;
		return compile(compileTemplate, Object.assign({}, this.props, { input }));
	}
}

export default FormGroup;



