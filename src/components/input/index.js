import Block from '../../modules/block';

class Input extends Block {
	constructor(props = {}) {
		const autocomplete = props.attributes.name || '';
		const attributes = { ...props.attributes, autocomplete };
		super('input', { ...props, attributes });
	}

	get value() {
		return this.element.value;
	}

	get validators() {
		return this._meta.props.validators || {};
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
