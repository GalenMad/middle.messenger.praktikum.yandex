import Block from '../../modules/block';

class Input extends Block {
  constructor(props: { attributes?: Record<string, string>, validators?: Record<string, Function>} = {}) {
    const autocomplete = (props.attributes && props.attributes.name) || '';
    const attributes = { ...props.attributes, autocomplete };
    super('input', { ...props, attributes });
  }

  get value() {
    return this.element.value;
  }

  get triggeredValidator() {
    const { value } = this;
    const validators: Record<string, Function> = this.props.validators || {};
    return Object.keys(validators).find((name) => !validators[name](value));
  }
}

export default Input;
