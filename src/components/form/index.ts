import Block from '../../modules/block';
import FormGroup from '../form-group';
import compileTemplate from './template.pug';
import './styles.scss';

const FORM_CLASS = 'form';
const FORM_TAG = 'form';

class Form extends Block {

  get isValid() {
    return this.formGroups.every((element) => element.isValid);
  }

  get formGroups() {
    return Object.values(this.children);
  }

  get data() {
    const data = {};
    this.formGroups.forEach(({ name, value }) => data[name] = value);
    return data;
  }

  constructor(props: { attributes?: { class?: string }, fields?: []; submitCallback: Function }) {
    // Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
    const className = (props.attributes && props.attributes.class) || FORM_CLASS;
    const attributes = { ...props.attributes, class: className };
    super(FORM_TAG, { ...props, attributes });

    const events = [{
      cb: (evt: Event) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.checkValidity();
        const submitCallback = this.props.submitCallback;
        if (this.isValid && submitCallback) {
          submitCallback(this.data);
          this.element.reset();
        }
      },
      selector: 'form',
      type: 'submit'
    }];

    this.setProps({ events })
  }

  checkValidity() {
    this.formGroups.forEach((element) => element.checkValidity());
  }

  hideValidation() {
    this.formGroups.forEach((element) => element.hideValidationMessage());
  }

  createFormGroups() {
    const formGroups: Record<string, Block> = {};
    const { fields = [] } = this.props;
    if (fields) {
      fields.forEach((field, index: number) => {
        const prop = `form-group-${index}`;
        formGroups[prop] = new FormGroup(field);
      });
      this.children = formGroups;
    }
  };

  render() {
    this.createFormGroups();
    return compileTemplate(this.props);
  }
}

export default Form;
