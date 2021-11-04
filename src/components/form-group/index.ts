import Block from '../../modules/block';
import Input from '../input';
import compileTemplate from './template.pug';
import './styles.scss';

const createInputElement = (props: { name: string; type?: string; id: string; attributes?: { class?: string; }; validators?: any; }) => {
  const {
    id, name, validators, type = 'text',
  } = props;
  return new Input({
    attributes: {
      class: 'control',
      type,
      id,
      name,
    },
    validators,
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

  constructor(props: { name: string, type?: string, id: string, attributes?: Record<string, string>, validators?: Record<string, { argument: number, func: Function, message: string | Function }> }) {
    // Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
    const className = (props.attributes && props.attributes.class) || FORM_GROUP_CLASS;
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
    const container: HTMLElement | null = this.element.querySelector(VALIDATION_SELECTOR);
    if (container) {
      container.style.display = 'none';
    }
  }

  componentDidUpdate(newProps: { name: string; type?: string; id: string; attributes?: { class?: string; }; validators?: any; }) {
    this.children.input = createInputElement(newProps);
  }

  checkValidity() {
    if (!this.props.validators) {
      return;
    }
    const validators: Record<string, any> = this.props.validators;
    const validity = this.children.input.triggeredValidator;
    if (validity) {
      const { message, argument = null } = validators[validity];
      const container: HTMLElement | null = this.element.querySelector(VALIDATION_SELECTOR);
      if (container) {
        container.style.display = 'block';
        container.textContent = typeof message === 'function' ? message(argument) : message;
      }
    }
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default FormGroup;
