import Block from '../../modules/block';
import FormGroup from '../form-group';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_CLASS = 'form';
const FORM_TAG = 'form';

class Form extends Block {
  get isValid() {
    return this.formGroups.every((element: FormGroup) => element.isValid);
  }

  get formGroups(): Block[] {
    return Object.values(this.children);
  }

  get data(): { [key: string]: unknown } {
    const data: { [key: string]: unknown } = {};
    this.formGroups.forEach((element: FormGroup) => { data[element.name] = element.value; });
    return data;
  }

  props: FormProps;

  // TODO: Добавить общую валидацию для формы

  constructor(props: FormProps, selectors = {}) {
    // Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
    const className = (props.attributes && props.attributes.class) || FORM_CLASS;
    const attributes = { ...props.attributes, class: className };
    super(FORM_TAG, { ...props, attributes }, {}, selectors);

    const events = [{
      cb: (evt: Event) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.checkValidity();
        const { submitCallback } = this.props;
        // TODO: Прикрутить возможность сброса значений
        if (this.isValid && typeof submitCallback === 'function') {
          submitCallback(this.data);
        }
      },
      type: 'submit',
    }];

    this.setProps({ events });
  }

  checkValidity() {
    this.formGroups.forEach((element: FormGroup) => element.checkValidity());
  }

  hideValidation() {
    this.formGroups.forEach((element: FormGroup) => element.hideValidationMessage());
  }

  createFormGroups() {
    const formGroups: Record<string, FormGroup> = {};
    const { fields } = this.props;
    if (fields) {
      fields.forEach((field: FormField, index: number) => {
        const prop = `form-group-${index}`;
        formGroups[prop] = new FormGroup(field);
      });
      this.children = formGroups;
    }
  }

  render() {
    this.createFormGroups();
    return compileTemplate(this.props);
  }
}

export default Form;
