import Block from '../../modules/block';
import Input from '../input';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_GROUP_CLASS = 'form-group';
const INPUT_CLASS = 'control';
const INPUT_BASE_TYPE = 'text';
const FORM_GROUP_TAG = 'label';
const VALIDATION_SELECTOR = '.validation';

class FormGroup extends Block {

  get value() {
    return this.children.input.value;
  }

  get isValid() {
    return !this.props.validators || !this.props.validators.some(validator => validator(this.value));
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
      container.textContent = '';
    }
  }


  createInputElement() {
    const { id, name, type = INPUT_BASE_TYPE } = this.props;

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
      attributes,
      events
    });

    this.children.input = input
  };

  checkValidity() {
    const validators: Array<Function> | undefined = this.props.validators;
    if (!validators) {
      return;
    }

    const value = this.value;
    const container: HTMLElement | null = this.element.querySelector(VALIDATION_SELECTOR);
    for (let i: number = 0; i < validators.length; i += 1) {
      const message = validators[i](value);
      if (message && container) {
        container.textContent = message;
        break;
      }
    }
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default FormGroup;
