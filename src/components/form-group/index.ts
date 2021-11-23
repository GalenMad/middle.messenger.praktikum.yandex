import Block from '../../modules/block';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_GROUP_CLASS = 'form-group';
const FORM_GROUP_TAG = 'label';
const VALIDATION_SELECTOR = '.validation';

export default class FormGroup extends Block {
  props: FormField;

  get value(): string | File | null | undefined {
    const input = this.element.querySelector('input');
    return input && input.type === 'file' ? input.files && input.files[0] : input?.value;
  }

  get isValid(): boolean {
    // eslint-disable-next-line max-len
    return Array.isArray(this.props.validators) && !this.props.validators.some((validator) => validator(this.value));
  }

  get name(): string {
    // TODO: Видимо, хреновая архитектура, если приходится такие проверки ставить
    return (typeof this.props.name === 'string' && this.props.name) || 'empty';
  }

  constructor(props: FormField) {
    const attributes = { ...props.attributes, class: FORM_GROUP_CLASS };
    super(FORM_GROUP_TAG, { ...props, attributes });
  }

  // TODO: Добить дизайн и логику работы file инпута
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
      // eslint-disable-next-line no-console
      input?.addEventListener('input', () => console.info('Загружено:', input.value));
    }
  }

  hideValidationMessage() {
    const container: HTMLElement | null = this.element.querySelector(VALIDATION_SELECTOR);
    if (container) {
      container.textContent = '';
    }
  }

  checkValidity() {
    const { validators } = this.props;
    if (validators && Array.isArray(validators)) {
      const { value } = this;
      const container: HTMLElement | null = this.element.querySelector(VALIDATION_SELECTOR);
      for (let i: number = 0; i < validators.length; i += 1) {
        const message = validators[i](value);
        if (typeof message === 'string' && container) {
          container.textContent = message;
          break;
        }
      }
    }
  }

  render() {
    return compileTemplate(this.props);
  }
}
