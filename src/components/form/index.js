import Block from '../../modules/block';
import FormGroup from '../form-group';
import compile from '../../utils/compile';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_CLASS = 'form';

class Form extends Block {
	static EVENTS = {
		SUBMIT: 'submit'
	}

	get formGroups() {
		return this._meta.formGroups;
	}

	set formGroups(value) {
		this._meta.formGroups = value;
	}

	get isValid() {
		return this.formGroups.map(element => element.isValid).every(status => status);
	}

	get formData() {
		return this.formGroups.map(element => {
			const field = {};
			field[element.name] = element.value;
			return field;
		});
	}

	handler = (evt) => {
		evt.preventDefault();
		this._formSubmit();
	};

	constructor(props = {}) {
		// Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
		const className = props.attributes && props.attributes.class || FORM_CLASS;
		const attributes = { ...props.attributes, class: className };
		super('form', { ...props, attributes });

		// TODO: Нужно сохранять обработчики
		// Если задать новые ивенты через setProps, то этот хэндлер умрёт
		// Если задать этот обработчик в CDM, то уйдёт в рекурсию
		const handler = this.handler;
		this.props.events = { ...this.props.events, submit: handler };
	}

	componentDidMount() {
		this._createFormGroups();
	}

	componentDidUpdate() {
		this._createFormGroups();
	}

	_createFormGroups() {
		const { fields } = this.props;
		this.formGroups = fields.map((field) => {
			return new FormGroup(field);
		});
	}

	_formSubmit() {
		this.formGroups.forEach((element) => {
			element.checkValidity();
		});
		if (this.isValid) {
			console.log(this.formData.reduceRight((prev, curr) => `${Object.entries(curr)[0].join(': ')}\n${prev}`, ''));
		}
	}

	render() {
		const formGroups = this.formGroups;
		const props = this.props;
		return compile(compileTemplate, { ...props, formGroups });
	}
}

export default Form;
