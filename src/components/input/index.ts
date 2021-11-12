import Block from '../../modules/block';

interface props {
  attributes?: {
    id: string,
    type: string,
    name: string
  },
  events?: Array<{
    type: string,
    cb: Function
  }>
}

// TODO: явно лишний компонент
class Input extends Block {
  constructor(props) {
    const autocomplete = (props.attributes && props.attributes.name) || '';
    const attributes = { ...props.attributes, autocomplete };
    super('input', { ...props, attributes });
  }

  get value() {
    return this.element.value;
  }
}

export default Input;
