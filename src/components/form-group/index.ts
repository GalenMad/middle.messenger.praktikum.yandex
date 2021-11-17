import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_GROUP_CLASS = 'form-group';
const FORM_GROUP_TAG = 'label';
const VALIDATION_SELECTOR = '.validation';

export default class FormGroup extends Block {

  get value() {
    const input = this.element.querySelector('input');
    return input?.value;
  }

  get isValid() {
    return !this.props.validators || !this.props.validators.some(validator => validator(this.value));
  }

  get name() {
    return this.props.name;
  }

  constructor(props) {
    // Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
    const className = (props.attributes && props.attributes.class) || FORM_GROUP_CLASS;
    const attributes = { ...props.attributes, class: className };
    super(FORM_GROUP_TAG, { ...props, attributes });
  }

  // TODO: Рефактор жизненного цикла компонента
  componentDidMount() {
    const input = this.element.querySelector('input');
    if (this.props.type !== 'file') {
      input?.addEventListener('focus', () => {
        this.hideValidationMessage();
      });
      input?.addEventListener('blur', () => {
        this.checkValidity();
      });
    } else {
      input?.addEventListener('input', () => console.log('Загружено:', input.value))
    }
  }

  hideValidationMessage() {
    const container: HTMLElement | null = this.element.querySelector(VALIDATION_SELECTOR);
    if (container) {
      container.textContent = '';
    }
  }

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

