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

	get triggeredValidator() {
		const value = this.value;
		const validators = this.props.validators || {};
		return Object.keys(validators).find(name => !validators[name](value));
	}
}

export default Input;
