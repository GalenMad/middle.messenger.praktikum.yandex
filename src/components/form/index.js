import Block from '../../modules/block';
import FormGroup from '../form-group';
import EventBus from '../../modules/event-bus';
import compile from '../../utils/compile';
import compileTemplate from './template.pug';
import './styles.scss';
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

	constructor(props = {}) {
		if (props.hasOwnProperty('attributes')) {
			Object.assign(props.attributes, { class: 'form' });
		} else {
			props.attributes = { class: 'form' };
		}

		const eventBus = new EventBus();
		super('form', props);
		this.localEventBus = () => eventBus;
		this._registerLocalEvents(eventBus);
	}

	_registerLocalEvents(eventBus) {
		eventBus.on(Form.EVENTS.SUBMIT, this.formSubmit.bind(this));
	}

	componentDidMount() {

		const handler = (evt) => {
			evt.preventDefault();
			this.localEventBus().emit(Form.EVENTS.SUBMIT);
		};

		if (this.props.hasOwnProperty('events')) {
			Object.assign(this.props.events, { submit: handler });
		} else {
			this.props.events = { submit: handler };
		}

		this.createFormGroups();
	}

	componentDidUpdate() {
		this.createFormGroups();
	}

	createFormGroups() {
		const { fields } = this.props;
		this.formGroups = fields.map((field) => {
			return new FormGroup(field);
		});
	}

	formSubmit() {
		this.formGroups.forEach((element) => {
			element.checkValidity();
		});
		if (this.isValid) {
			console.log(this.formData);
		}
	}

	render() {
		const formGroups = this.formGroups;
		return compile(compileTemplate, Object.assign({}, this.props, { formGroups }));
	}
}

export default Form;
