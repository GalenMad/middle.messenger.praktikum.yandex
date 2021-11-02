import Block from '../../modules/block';
import Input from '../input';
import compileTemplate from './template.pug';
import './styles.scss';

const parseValidatorsFromDefinition = (validators = {}) => {
	const result = {};
	Object.keys(validators).forEach(validatorName => {
		const validator = validators[validatorName];
		const { argument, func } = validator;
		if (validator.argument) {
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

const createInputElement = (props) => {
	const { id, name, validators, type = 'text' } = props;
	return new Input({
		attributes: {
			class: 'control',
			type,
			id,
			name
		},
		validators: parseValidatorsFromDefinition(validators),
	});
};

const FORM_GROUP_CLASS = 'form-group';
const FORM_GROUP_TAG = 'label';
const VALIDATION_SELECTOR = '.validation';

class FormGroup extends Block {
	get value() {
		return this.children.input.value;
	}

	get isValid() {
		return !this.children.input.triggeredValidator;
	}

	get name() {
		return this.props.name;
	}

	constructor(props = {}) {
		// Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
		const className = props.attributes && props.attributes.class || FORM_GROUP_CLASS;
		const attributes = { ...props.attributes, class: className };
		const input = createInputElement(props);
		super(FORM_GROUP_TAG, { ...props, attributes }, { input });
	}

	componentDidMount() {
		const input = this.children.input.getContent();
		input.addEventListener('focus', () => this._hideValidationMessage());
		input.addEventListener('blur', () => this.checkValidity());
	}

	_hideValidationMessage() {
		const container = this.element.querySelector(VALIDATION_SELECTOR);
		container.style.display = 'none';
	}

	componentDidUpdate(newProps) {
		this.children.input = createInputElement(newProps);
	}

	checkValidity() {
		const { validators } = this.props;
		const validity = this.children.input.triggeredValidator;
		if (validity) {
			let { message, argument = null } = validators[validity];
			const container = this.element.querySelector(VALIDATION_SELECTOR);
			container.style.display = 'block';
			container.textContent = typeof message === 'function' ? message(argument) : message;
		}
	}

	render() {
		return compileTemplate(this.props);
	}
}

export default FormGroup;
