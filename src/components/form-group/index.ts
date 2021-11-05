import Block from '../../modules/block';
import Input from '../input';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_GROUP_CLASS = 'form-group';
const INPUT_CLASS = 'form-group';
const INPUT_BASE_TYPE = 'text';
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
    super(FORM_GROUP_TAG, { ...props, attributes });
  }

  componentDidMount() {
    this.createInputElement();
  }

  //- TODO: Вынести логику с сообщением в шаблон
  _hideValidationMessage() {
    const container: HTMLElement | null = this.element.querySelector(VALIDATION_SELECTOR);
    if (container) {
      container.style.display = 'none';
    }
  }


  createInputElement() {
    const { id, name, validators, type = INPUT_BASE_TYPE } = this.props;

    const attributes = {
      class: INPUT_CLASS,
      type,
      id,
      name,
    };

    const events = [{
      type: 'focus',
      cb: () => this._hideValidationMessage()
    },
    {
      type: 'blur',
      cb: () => this.checkValidity()
    }];

    const input = new Input({
      validators,
      attributes,
      events
    });

    this.children.input = input
  };

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
