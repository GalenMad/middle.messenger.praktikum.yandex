import Block from '../../modules/block';

class Input extends Block {
	constructor(props = {}) {
		super('input', props);
		if (props.hasOwnProperty('validators')) {
			const { validators } = props;
			this._meta.validators = validators ? validators : {};
		}
	}

	get value() {
		return this.element.value;
	}

	get validators() {
		return this._meta.validators;
	}

	get validity() {
		const validity = {};
		const value = this.value;

		Object.keys(this.validators).map(validatorName => {
			validity[validatorName] = this.validators[validatorName](value);
		});

		return validity;
	}
}

export default Input;
