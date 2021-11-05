import Block from '../../modules/block';

class Input extends Block {
  constructor(props: { attributes?: Record<string, string>; }) {
    const autocomplete = (props.attributes && props.attributes.name) || '';
    const attributes = { ...props.attributes, autocomplete };
    super('input', { ...props, attributes });
  }

  get value() {
    return this.element.value;
  }
}

export default Input;
