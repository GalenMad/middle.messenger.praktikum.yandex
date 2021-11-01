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

const FORM_GROUP_CLASS = 'form-group';
class FormGroup extends Block {
	static EVENTS = {
		VALIDATION: 'validation',
		VALIDATION_HIDE: 'validation:hide',
	};

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
		const eventBus = new EventBus();
		// Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
		const className = props.attributes && props.attributes.class || FORM_GROUP_CLASS;
		const attributes = { ...props.attributes, class: className };
		super('label', {...props, attributes});
		
		this.localEventBus = () => eventBus;
		this._registerLocalEvents(eventBus);
	}

	componentDidMount() {
		this._createInputElement();
	}

	componentDidUpdate() {
		this._createInputElement();
	}

	_registerLocalEvents(eventBus) {
		eventBus.on(FormGroup.EVENTS.VALIDATION, this.checkValidity.bind(this));
		eventBus.on(FormGroup.EVENTS.VALIDATION_HIDE, this._hideValidationMessage.bind(this));
	}

	_hideValidationMessage() {
		const container = this.element.querySelector('.validation');
		container.style.display = 'none';
	}

	_showValidationMessage(message) {
		const container = this.element.querySelector('.validation');
		container.style.display = 'block';
		container.textContent = message;
	}

	_createInputElement() {
		const { id, name, validators, type = 'text' } = this.props;
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
				this._showValidationMessage(message);
				break;
			}
		}
	}

	render() {
		const input = this.input;
		return compile(compileTemplate, { ...this.props, input });
	}
}

export default FormGroup;
